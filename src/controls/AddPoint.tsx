import type { Coordinate } from "ol/coordinate";
import { useCallback, useMemo, useState } from "react";
import { match } from "ts-pattern";

import { usePointState } from "../points-state";
import { AddPointMenu } from "./AddPointMenu.tsx";
import { AddPointReset } from "./AddPointReset.tsx";
import { Control } from "./Control";
import type { MenuOption } from "./types.ts";
import { useOnClick } from "./useOnClick.ts";

enum PossiblePoints {
  destination = "Destination",
  potential = "Potential House",
}

const options: PossiblePoints[] = [
  PossiblePoints.destination,
  PossiblePoints.potential,
];

function useOnAddPoint(): [
  MenuOption[],
  PossiblePoints | undefined,
  () => void,
] {
  const { addDestination, addPotential } = usePointState();

  const [targetToAdd, setTarget] = useState<PossiblePoints>();

  const clearTarget = useCallback(() => setTarget(undefined), []);

  const items: MenuOption[] = useMemo(
    () =>
      options.map((pointType) => ({
        label: pointType,
        onClick: () => setTarget(pointType),
      })),
    [],
  );

  const mapClickHandler = useCallback(
    (location: Coordinate) => {
      match(targetToAdd)
        .with(PossiblePoints.destination, () => {
          addDestination(location);
        })
        .with(PossiblePoints.potential, () => {
          addPotential(location);
        })
        .otherwise(() => {
          return;
        });

      clearTarget();
    },
    [addDestination, addPotential, targetToAdd, clearTarget],
  );

  useOnClick(mapClickHandler);

  return [items, targetToAdd, clearTarget];
}

export function AddPoint() {
  const [items, target, reset] = useOnAddPoint();

  return (
    <Control top="1rem" right="1rem">
      {target ? (
        <AddPointReset reset={reset} />
      ) : (
        <AddPointMenu items={items} />
      )}
    </Control>
  );
}
