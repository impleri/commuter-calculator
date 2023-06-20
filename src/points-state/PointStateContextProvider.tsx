import { pipe } from "fp-ts/function";
import { array, option } from "fp-ts";
import { Coordinate } from "ol/coordinate";
import { useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";

import { PointStateContext } from "./PointStateContext.ts";
import {
  DestinationInformation,
  PotentialHomeInformation,
  PointInformation,
} from "../types.ts";
import { useHomeLocation } from "./useHomeLocation";
import { fetchDistances } from "./fetchDistances.ts";

export type PointStateProps = {
  home?: Coordinate;
};

function isDifferentPoint<T extends PointInformation>(a: T): (b: T) => boolean {
  return (b: T) => a.id !== b.id;
}

function addPoint<T extends PointInformation>(point: T, points: T[]): T[] {
  return pipe(points, array.append(point));
}

function removePoint<T extends PointInformation>(point: T, points: T[]): T[] {
  return pipe(points, array.filter(isDifferentPoint(point)));
}

function updatePoint<T extends PointInformation>(point: T, points: T[]): T[] {
  return pipe(
    points,
    array.filter(isDifferentPoint(point)),
    array.append(point),
  );
}

function createDestination(point: Coordinate): DestinationInformation {
  return {
    id: point.join("x"),
    name: "New Destination",
    location: point,
    frequency: 1,
  };
}

function createPotential(
  point: Coordinate,
  destinations: DestinationInformation[],
  name = "New Potential Home",
): PotentialHomeInformation {
  return {
    id: point.join("x"),
    name,
    location: point,
    travelTimes: pipe(
      destinations,
      array.map((destination) => destination.id),
      array.map<string, [string, number]>((destination) => [destination, 0]),
      (entries) => new Map<string, number>(entries),
    ),
  };
}

function updatePoints<T extends PointInformation>(
  point: T,
  callback: (point: T, points: T[]) => T[],
): (current: T[]) => T[] {
  return (current: T[]) => callback(point, current);
}

// TODO: Sync with localStorage
export const PointStateProvider = ({
  children,
}: PropsWithChildren<PointStateProps>) => {
  const home = useHomeLocation();
  const initialHome = useMemo(() => createPotential(home, [], "Home"), [home]);
  const [homes, setHomes] = useState<PotentialHomeInformation[]>(() => [
    initialHome,
  ]);
  const [destinations, setDestinations] = useState<DestinationInformation[]>(
    () => [],
  );

  const state: PointStateContext = useMemo(
    () => ({
      currentHome: option.getOrElse(() => initialHome)(array.head(homes)),
      potential: option.getOrElse((): PotentialHomeInformation[] => [])(
        array.tail(homes),
      ),
      destinations,
      addDestination: (point) =>
        setDestinations(updatePoints(createDestination(point), addPoint)),
      updateDestination: (point) =>
        setDestinations(updatePoints(point, updatePoint)),
      removeDestination: (point) =>
        setDestinations(updatePoints(point, removePoint)),
      addPotential: (point) =>
        setHomes(updatePoints(createPotential(point, destinations), addPoint)),
      updatePotential: (point) => setHomes(updatePoints(point, updatePoint)),
      removePotential: (point) => setHomes(updatePoints(point, removePoint)),
    }),
    [initialHome, homes, destinations],
  );

  useEffect(() => {
    fetchDistances(homes, destinations)
      .then((updates) => (updates ? setHomes(updates) : undefined))
      .catch(console.error);
  }, [homes, destinations]);

  return (
    <PointStateContext.Provider value={state}>
      {children}
    </PointStateContext.Provider>
  );
};
