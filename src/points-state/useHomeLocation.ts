import type { Coordinate } from "ol/coordinate";
import { useMemo } from "react";

import { HOME_LATITUDE, HOME_LONGITUDE } from "../config.ts";

export function useHomeLocation(): Coordinate {
  return useMemo(() => [HOME_LONGITUDE, HOME_LATITUDE], []);
}
