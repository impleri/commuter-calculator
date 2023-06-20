import { pipe } from "fp-ts/function";
import type { MapBrowserEvent } from "ol";
import type { Coordinate } from "ol/coordinate";
import { toLonLat } from "ol/proj";
import { useCallback, useEffect } from "react";

import { useRContext } from "./useRContext.ts";

const EVENT_NAME = "click";

export type OnClickHandler = (location: Coordinate) => void;

export function useOnClick(handler: OnClickHandler) {
  const { map } = useRContext();

  const listener = useCallback(
    (event: MapBrowserEvent<UIEvent>) =>
      pipe(event.coordinate, toLonLat, handler),
    [handler],
  );

  useEffect(() => {
    map?.on(EVENT_NAME, listener);

    return () => {
      map?.un(EVENT_NAME, listener);
    };
  }, [listener, map]);
}
