import { useContext } from "react";

import { MapStateContext } from "./MapStateContext.ts";

export function useMapState() {
  return useContext(MapStateContext);
}
