import type { Coordinate } from "ol/coordinate";

export type PointInformation = {
  id: string;
  name: string;
  location: Coordinate;
};

export type DestinationInformation = PointInformation & {
  frequency: number;
};

export type PotentialHomeInformation = PointInformation & {
  travelTimes: Map<string, number>;
};
