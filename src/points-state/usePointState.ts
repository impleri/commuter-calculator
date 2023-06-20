import { useContext } from "react";

import { PointStateContext } from "./PointStateContext.ts";

export function usePointState() {
  return useContext(PointStateContext);
}
