import { Coordinate } from "ol/coordinate";

export type MapState = {
  center: Coordinate;
  zoom: number;
};

export const INITIAL_STATE: MapState = {
  center: [0, 0],
  zoom: 6,
};
