import { Card, CardBody, CardHeader, Text } from "grommet";
import { LineString } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { useMemo, useState } from "react";
import { RFeature, ROverlay } from "rlayers";
import { RStyle, RFill, RStroke } from "rlayers/style";

import { colors, LAYERS } from "../theme";
import { PointInformation } from "../types.ts";
import { useDisplayTime } from "./useDisplayTime.ts";
import { useCalculateChange } from "./useCalculateChange.ts";

export type LineProps = {
  from: PointInformation;
  to: PointInformation;
  duration?: number;
  comparison?: number;
};

export function Line({ from, to, comparison, duration }: LineProps) {
  const [open, setOpen] = useState(false);
  const line = useMemo(
    () => new LineString([fromLonLat(from.location), fromLonLat(to.location)]),
    [from.location, to.location],
  );
  const durationTime = useDisplayTime(duration);
  const color = useCalculateChange(comparison, duration);

  return (
    <>
      {/* @ts-expect-error Bad Typing from RLayers */}
      <RFeature
        geometry={line}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
      >
        {/* @ts-expect-error Bad Typing from RLayers */}
        <RStyle zIndex={LAYERS.lines}>
          {/* @ts-expect-error Bad Typing from RLayers */}
          <RStroke color={color} width={4} />
          {/* @ts-expect-error Bad Typing from RLayers */}
          <RFill color="transparent" />
        </RStyle>
        {/* @ts-expect-error Bad Typing from RLayers */}
        <ROverlay>
          <Card background={open ? colors.brand : colors.accent}>
            {open && (
              <CardHeader>
                <Text weight="bold">
                  {from.name} to {to.name}
                </Text>
              </CardHeader>
            )}
            <CardBody>
              <Text>Travel Time: {durationTime}</Text>
            </CardBody>
          </Card>
        </ROverlay>
      </RFeature>
    </>
  );
}
