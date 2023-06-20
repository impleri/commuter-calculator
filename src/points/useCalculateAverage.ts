import { usePointState } from "../points-state";
import { calculateTotalTimes } from "./calculateTotalTimes.ts";
import { calculateTotalTrips } from "./calculateTotalTrips.ts";

export function useCalculateAverage(times: Map<string, number>) {
  const { destinations } = usePointState();

  const numerator = calculateTotalTimes(destinations, times);
  const denominator = calculateTotalTrips(destinations);

  return numerator / denominator;
}
