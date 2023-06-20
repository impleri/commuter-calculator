import { match } from "ts-pattern";

import { colors } from "../theme";

const MINUTE = 60;
const MINIMUM_TIME = 5 * MINUTE;

export function useCalculateChange(base = 0, newTime = 0): string {
  const denominator = Math.max(base, MINIMUM_TIME);

  return match(newTime / denominator)
    .when(
      (value) => value === 0,
      () => colors.brand,
    )
    .when(
      (value) => value === 1.0,
      () => colors.accent,
    )
    .when(
      (value) => value < 1.2,
      () => "green",
    )
    .when(
      (value) => value < 2,
      () => "yellow",
    )
    .otherwise(() => "red");
}
