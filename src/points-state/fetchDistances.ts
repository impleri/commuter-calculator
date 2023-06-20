import { array, either, map, option, string, taskEither } from "fp-ts";
import { Either } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { Coordinate } from "ol/coordinate";
// @ts-expect-error Missing types
import ORS from "openrouteservice-js";

import { ORS_API_TOKEN } from "../config.ts";
import {
  DestinationInformation,
  PointInformation,
  PotentialHomeInformation,
} from "../types.ts";
import { Option } from "fp-ts/Option";

const distanceMatrix = new ORS.Matrix({
  api_key: ORS_API_TOKEN,
});

type MatrixPoint = {
  location: Coordinate;
  snapped_distance: number;
};

type MatrixMetadata = {
  attribution: string;
  service: string;
  timestamp: number;
  query: unknown;
  engine: {
    build_date: string;
    graph_date: string;
    version: string;
  };
};

type MatrixRequest = {
  locations: Coordinate[];
  profile: string;
  sources: number[] | ["all"];
  destinations: number[] | ["all"];
};

interface MatrixError extends Error {
  status: Response["status"];
  response: Response;
}

type MatrixResponse = {
  destinations: MatrixPoint[];
  durations: number[][];
  metadata: MatrixMetadata;
  source: MatrixPoint[];
};

/**
 * Determines if the passed array size of destinations is more than 0.
 */
function hasDestinations(size: number): Either<string, number> {
  return size < 1 ? either.left("No destinations") : either.right(size);
}

/**
 * Determine if the first home in the array has at least as many travel times as there are destinations.
 */
function doesHomeHaveAllTimes(
  destSize: number,
): (homes: PotentialHomeInformation[]) => Option<number> {
  return (homes: PotentialHomeInformation[]) =>
    pipe(
      homes,
      array.head,
      option.map((home) => home.travelTimes),
      option.map(map.keys(string.Ord)),
      option.map(array.size),
      option.flatMap((size: number) => {
        return size >= destSize ? option.none : option.some(size);
      }),
    );
}

/**
 * Determine if the existing array of homes has fewer destinations than the
 * current size by checking the first and the last home.
 */
function areDurationsMisaligned(
  homes: PotentialHomeInformation[],
): (destSize: number) => Either<string, PotentialHomeInformation[]> {
  return (destSize: number) =>
    pipe(
      homes,
      doesHomeHaveAllTimes(destSize),
      option.map(() => homes),
      option.map(array.reverse),
      option.flatMap(doesHomeHaveAllTimes(destSize)),
      option.map(() => homes),
      either.fromOption(() => "Durations match"),
    );
}

/**
 * Create request body for the matrix duration API
 */
function createMatrixRequest(
  destinations: DestinationInformation[],
): (homes: PotentialHomeInformation[]) => MatrixRequest {
  return (homes: PotentialHomeInformation[]) => ({
    locations: pipe(
      homes,
      array.concat<PointInformation>(destinations),
      array.map((p) => p.location),
    ),
    profile: "driving-car",
    sources: [...Array(homes.length).keys()],
    destinations: [...Array(destinations.length).keys()].map(
      (idx) => idx + homes.length,
    ),
  });
}

/**
 * Async function to perform API call
 */
function fetchMatrixDuration(request: MatrixRequest) {
  return taskEither.tryCatch(
    () => distanceMatrix.calculate(request) as Promise<MatrixResponse>,
    (error) => logMatrixError(error as MatrixError),
  );
}

function logMatrixError(error: MatrixError): string {
  return `An error occurred: ${error.status}. ${error.message}`;
}

function mergeMaps<K, V>(second: Map<K, V>): (first: Map<K, V>) => Map<K, V> {
  return (first: Map<K, V>) => new Map([...first, ...second]);
}

function syncDestinationTravelTimes(destinations: DestinationInformation[]) {
  const destinationIds = destinations.map((d) => d.id);

  return (
    existing: Map<string, number>,
    newTimes: Map<string, number> = new Map(),
  ) =>
    pipe(
      existing,
      map.filterWithIndex((k) => destinationIds.includes(k)),
      mergeMaps(newTimes),
    );
}

function syncWithStateChanges(
  homes: PotentialHomeInformation[],
  destinations: DestinationInformation[],
): (error: string) => PotentialHomeInformation[] | undefined {
  const updateTravelTimes = syncDestinationTravelTimes(destinations);

  return () => {
    return pipe(
      array.head(homes),
      option.map((current) => current.travelTimes.size),
      option.flatMap((size) =>
        size === destinations.length ? option.none : option.some(homes),
      ),
      option.map(
        array.map((h) => ({
          ...h,
          travelTimes: updateTravelTimes(h.travelTimes),
        })),
      ),
      option.toUndefined,
    );
  };
}

function syncResponseDuration(
  destinations: DestinationInformation[],
): ([home, durations]: [
  PotentialHomeInformation,
  number[],
]) => PotentialHomeInformation {
  return ([home, durations]) => ({
    ...home,
    travelTimes: pipe(
      durations,
      array.zip(destinations),
      array.map<[number, DestinationInformation], [string, number]>(
        ([t, d]) => [d.id, t],
      ),
      (value: [string, number][] | undefined) => new Map<string, number>(value),
      (newTimes) =>
        syncDestinationTravelTimes(destinations)(home.travelTimes, newTimes),
    ),
  });
}

function syncWithResponse(
  homes: PotentialHomeInformation[],
  destinations: DestinationInformation[],
): (response: MatrixResponse) => PotentialHomeInformation[] {
  return (response: MatrixResponse) => {
    return pipe(
      homes,
      array.zip(response.durations),
      array.map(syncResponseDuration(destinations)),
    );
  };
}

export function fetchDistances(
  homes: PotentialHomeInformation[],
  destinations: DestinationInformation[],
) {
  return pipe(
    // If we have a change in destinations
    hasDestinations(destinations.length),
    either.flatMap(areDurationsMisaligned(homes)),
    either.map(createMatrixRequest(destinations)),
    taskEither.fromEither,
    taskEither.flatMap(fetchMatrixDuration),
    taskEither.match(
      syncWithStateChanges(homes, destinations),
      syncWithResponse(homes, destinations),
    ),
  )();
}
