import { CardFooter, RangeInput, Text } from "grommet";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { usePointState } from "../points-state";
import { DestinationInformation } from "../types.ts";

export type PointFrequencyProps = {
  editable: boolean;
  data: DestinationInformation;
  type: "destination" | "potential";
};

export function PointFrequency({ editable, data, type }: PointFrequencyProps) {
  const { updateDestination } = usePointState();
  const [editing, setEditing] = useState(false);
  const [frequency, setFrequency] = useState(() => data.frequency);
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setFrequency(Number.parseInt(event.target.value, 10)),
    [],
  );
  const handleToggle = useCallback(() => {
    if (!editable) {
      return;
    }

    setEditing((current) => !current);
  }, [editable]);

  useEffect(() => {
    if (frequency !== data.frequency && !editing) {
      const callback =
        type === "destination" ? updateDestination : () => undefined;
      callback({
        ...data,
        frequency,
      });
    }
  }, [editing, frequency, data, type, updateDestination]);

  return (
    <CardFooter onClick={handleToggle}>
      {editing ? (
        <>
          <Text margin="small">{frequency ?? 0}</Text>
          <RangeInput
            value={frequency ?? 0}
            onChange={handleChange}
            min={0}
            max={7}
            step={1}
          />
        </>
      ) : (
        `${frequency ?? 0} days/week`
      )}
    </CardFooter>
  );
}
