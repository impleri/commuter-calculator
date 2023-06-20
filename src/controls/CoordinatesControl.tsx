import { Text } from "grommet";
import type { Coordinate } from "ol/coordinate";

import { Control } from "./Control.tsx";

export type CoordinatesProps = {
  location: Coordinate;
};

function trimCoordinate(value: number) {
  return value.toFixed(4);
}

export function CoordinatesControl({ location }: CoordinatesProps) {
  const [x, y] = location.map(trimCoordinate);

  return (
    <Control bottom="1rem" right="1rem" pad="xsmall">
      <Text>{`${x}, ${y}`}</Text>
    </Control>
  );
}
