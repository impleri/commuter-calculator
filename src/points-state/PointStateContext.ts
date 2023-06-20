import { createContext } from "react";

import type {
  DestinationInformation,
  PotentialHomeInformation,
} from "../types.ts";
import { Coordinate } from "ol/coordinate";

const defaultHome: PotentialHomeInformation = {
  id: "0x0",
  name: "Home",
  location: [0, 0],
  travelTimes: new Map<string, number>(),
};

export type PointStateContext = {
  currentHome: PotentialHomeInformation;
  destinations: DestinationInformation[];
  potential: PotentialHomeInformation[];
  addDestination: (point: Coordinate) => void;
  updateDestination: (point: DestinationInformation) => void;
  removeDestination: (point: DestinationInformation) => void;
  addPotential: (point: Coordinate) => void;
  updatePotential: (point: PotentialHomeInformation) => void;
  removePotential: (point: PotentialHomeInformation) => void;
};

export const PointStateContext = createContext<PointStateContext>({
  currentHome: defaultHome,
  destinations: [],
  potential: [],
  addDestination: () => undefined,
  updateDestination: () => undefined,
  removeDestination: () => undefined,
  addPotential: () => undefined,
  updatePotential: () => undefined,
  removePotential: () => undefined,
});
