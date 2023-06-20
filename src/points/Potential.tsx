import { Help } from "grommet-icons";
import { useState } from "react";

import { usePointState } from "../points-state";
import { PotentialHomeInformation } from "../types.ts";
import { GenericPoint } from "./GenericPoint.tsx";
import { Line } from "./Line.tsx";
import { useCalculateAverage } from "./useCalculateAverage";
import { useCalculateTotalTravel } from "./useCalculateTotalTravel.ts";

export type PotentialProps = {
  data: PotentialHomeInformation;
};

export function Potential({ data }: PotentialProps) {
  const [showLines, setShowLines] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { currentHome, destinations } = usePointState();
  const total = useCalculateTotalTravel(data.travelTimes);
  const avg = useCalculateAverage(data.travelTimes);

  return (
    <>
      <GenericPoint
        data={data}
        icon={<Help />}
        onClick={() => setShowDetails((current) => !current)}
        onMouseEnter={() => setShowLines(true)}
        onMouseLeave={() => setShowLines(false)}
        avgTime={avg}
        totalTime={total}
        showDetails={showDetails}
        editable
        type="potential"
      />
      {showLines &&
        destinations.map((destination) => (
          <Line
            key={`${data.id}-${destination.id}`}
            from={data}
            to={destination}
            duration={data.travelTimes.get(destination.id)}
            comparison={currentHome.travelTimes.get(destination.id)}
          />
        ))}
    </>
  );
}
