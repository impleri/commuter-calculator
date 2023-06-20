import { array } from "fp-ts";
import { pipe } from "fp-ts/function";

import { DestinationInformation } from "../types.ts";

export function calculateTotalTrips(points: DestinationInformation[]) {
  return pipe(
    points,
    array.map((point) => point.frequency),
    array.reduce(0, (total, count) => total + count),
  );
}
