import { fromLonLat } from "ol/proj";
import { useMemo, useState } from "react";
import type { PropsWithChildren } from "react";

import { useInitialView } from "./useInitialView.ts";
import type { MapState } from "./MapState.ts";
import { MapStateContext } from "./MapStateContext.ts";

export const MapStateProvider = ({ children }: PropsWithChildren) => {
  const initialView = useInitialView();

  const [view, setView] = useState<MapState>(() => ({
    center: fromLonLat(initialView.center),
    zoom: initialView.zoom,
  }));

  const { center, zoom } = view;
  const [lat, lon] = center;

  const state: MapStateContext = useMemo(
    () => ({
      state: {
        center: [lat, lon],
        zoom,
      },
      setState: setView,
    }),
    [lat, lon, zoom],
  );

  return (
    <MapStateContext.Provider value={state}>
      {children}
    </MapStateContext.Provider>
  );
};
