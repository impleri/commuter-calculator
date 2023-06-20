import { Button, CardHeader, TextInput } from "grommet";
import { Trash } from "grommet-icons";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useKeyPressEvent } from "react-use";

import { usePointState } from "../points-state";
import { PointInformation } from "../types.ts";

export type PointNameProps<T extends PointInformation> = {
  editable: boolean;
  data: T;
  type: "destination" | "potential";
};
export function PointName<T extends PointInformation>({
  editable,
  data,
  type,
}: PointNameProps<T>) {
  const {
    updatePotential,
    updateDestination,
    removePotential,
    removeDestination,
  } = usePointState();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(() => data.name);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setLabel(event.target.value),
    [],
  );
  const handleRemove = useCallback(() => {
    const callback =
      type === "destination" ? removeDestination : removePotential;
    callback(data as never);
  }, [type, data, removePotential, removeDestination]);
  const handleToggle = useCallback(() => {
    if (!editable) {
      return;
    }

    setEditing((current) => !current);
  }, [editable]);

  useKeyPressEvent("Enter", () => setEditing(false));

  useEffect(() => {
    if (label !== data.name && !editing) {
      const callback =
        type === "destination" ? updateDestination : updatePotential;
      callback({
        ...data,
        name: label,
      } as never);
    }
  }, [editing, label, data, type, updatePotential, updateDestination]);

  return (
    <CardHeader>
      {editing ? (
        <TextInput
          value={label}
          onChange={handleChange}
          focusIndicator
          autoFocus
        />
      ) : (
        <span onClick={handleToggle}>{data.name}</span>
      )}
      <Button icon={<Trash />} hoverIndicator onClick={handleRemove} />
    </CardHeader>
  );
}
