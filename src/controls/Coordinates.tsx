import { option } from "fp-ts";
import { Coordinate } from "ol/coordinate";
import { useEffect, useState } from "react";

import { ENABLE_COORDINATES } from "../config.ts";
import { CoordinatesControl } from "./CoordinatesControl.tsx";
import { useMousePosition } from "./useMousePosition.ts";

function useMouseCoordinates() {
  const [coordinates, setCoordinates] = useState<Coordinate>([0, 0]);
  const location = useMousePosition();

  useEffect(() => {
    const value = option.toUndefined(location);
    if (value) {
      setCoordinates(value);
    }
  }, [location]);

  return coordinates;
}

export function Coordinates() {
  const coordinates = useMouseCoordinates();

  return ENABLE_COORDINATES && <CoordinatesControl location={coordinates} />;
}
