import { Card, CardBody, Paragraph } from "grommet";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import type { ReactElement } from "react";
import { RFeature, ROverlay } from "rlayers";
import { RStyle } from "rlayers/style";

import { useDisplayTime } from "./useDisplayTime.ts";
import { LAYERS } from "../theme";
import type { DestinationInformation, PointInformation } from "../types.ts";
import { PointName, PointNameProps } from "./PointName.tsx";
import { PointFrequency } from "./PointFrequency.tsx";

export type GenericPointProps<T extends PointInformation> = {
  data: T;
  icon: ReactElement;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  avgTime?: number;
  totalTime?: number;
  editable?: boolean;
  showDetails: boolean;
  type: PointNameProps<T>["type"];
};

export function GenericPoint<T extends PointInformation>({
  avgTime,
  data,
  icon,
  editable = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  showDetails,
  totalTime,
  type,
}: GenericPointProps<T>) {
  const durationTime = useDisplayTime(avgTime, true);
  const totalTravel = useDisplayTime(totalTime, true);
  const hasTime = showDetails && (avgTime ?? 0) > 0;
  const showFrequency = showDetails && type === "destination";

  return (
    <>
      {/* @ts-expect-error Bad Typing from RLayers */}
      <RFeature
        geometry={new Point(fromLonLat(data.location))}
        onPointerEnter={onMouseEnter}
        onPointerLeave={onMouseLeave}
      >
        {/* @ts-expect-error Bad Typing from RLayers */}
        <RStyle zIndex={LAYERS.points} />
        {/* @ts-expect-error Bad Typing from RLayers */}
        <ROverlay autoPosition>
          <Card onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {showDetails && (
              <PointName editable={editable} data={data} type={type} />
            )}
            <CardBody onClick={onClick}>
              {icon}
              {hasTime && (
                <Paragraph>Total Travel Time: {totalTravel}</Paragraph>
              )}
              {hasTime && <Paragraph>Avg: {durationTime}</Paragraph>}
            </CardBody>
            {showFrequency && (
              <PointFrequency
                editable={editable}
                data={data as unknown as DestinationInformation}
                type={type}
              />
            )}
          </Card>
        </ROverlay>
      </RFeature>
    </>
  );
}
