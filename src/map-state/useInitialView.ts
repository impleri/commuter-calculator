import type { Coordinate } from "ol/coordinate";
import { useMemo } from "react";

import {
  INITIAL_LONGITUDE,
  INITIAL_LATITUDE,
  INITIAL_ZOOM,
} from "../config.ts";

type UseInitialView = {
  center: Coordinate;
  zoom: number;
};

export function useInitialView(): UseInitialView {
  return useMemo(() => {
    return {
      center: [INITIAL_LONGITUDE, INITIAL_LATITUDE],
      zoom: INITIAL_ZOOM,
    };
  }, []);
}
