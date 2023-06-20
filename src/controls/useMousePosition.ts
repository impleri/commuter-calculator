import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import type { Option } from "fp-ts/Option";
import type { MapBrowserEvent } from "ol";
import type { Coordinate } from "ol/coordinate";
import { toLonLat } from "ol/proj";
import { useCallback, useEffect, useState } from "react";

import { useRContext } from "./useRContext.ts";

const EVENT_NAME = "pointermove";

export function useMousePosition(): Option<Coordinate> {
  const { map } = useRContext();
  const [location, setLocation] = useState<Option<Coordinate>>(option.none);

  const listener = useCallback(
    (event: MapBrowserEvent<UIEvent>) =>
      pipe(event.coordinate, toLonLat, option.fromNullable, setLocation),
    [],
  );

  useEffect(() => {
    map?.on(EVENT_NAME, listener);

    return () => {
      map?.un(EVENT_NAME, listener);
    };
  }, [listener, map]);

  return location;
}
