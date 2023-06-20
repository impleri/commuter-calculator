import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

import { INITIAL_STATE } from "./MapState.ts";
import type { MapState } from "./MapState.ts";

export type MapStateContext = {
  state: MapState;
  setState: Dispatch<SetStateAction<MapState>>;
};

export const MapStateContext = createContext<MapStateContext>({
  state: INITIAL_STATE,
  setState: () => undefined,
});
