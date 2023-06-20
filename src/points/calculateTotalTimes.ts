import { array, option } from "fp-ts";
import { pipe } from "fp-ts/function";

import { DestinationInformation } from "../types.ts";

export function calculateTotalTimes(
  points: DestinationInformation[],
  times: Map<string, number>,
) {
  return pipe(
    points,
    array.map<DestinationInformation, [string, number]>((point) => [
      point.id,
      point.frequency,
    ]),
    array.map(
      ([id, frequency]) =>
        frequency *
        option.getOrElse(() => 0)(option.fromNullable(times.get(id))),
    ),
    array.reduce(0, (total, time) => total + time),
  );
}
