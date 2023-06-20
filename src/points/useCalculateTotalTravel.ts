import { usePointState } from "../points-state";
import { calculateTotalTimes } from "./calculateTotalTimes.ts";

export function useCalculateTotalTravel(times: Map<string, number>) {
  const { destinations } = usePointState();

  return calculateTotalTimes(destinations, times);
}
