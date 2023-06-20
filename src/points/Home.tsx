import { HomeRounded } from "grommet-icons";
import { useState } from "react";

import { usePointState } from "../points-state";
import { GenericPoint } from "./GenericPoint.tsx";
import { Line } from "./Line.tsx";
import { useCalculateAverage } from "./useCalculateAverage.ts";

export function Home() {
  const [showLines, setShowLines] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { currentHome, destinations } = usePointState();
  const avg = useCalculateAverage(currentHome.travelTimes);

  return (
    <>
      <GenericPoint
        data={currentHome}
        icon={<HomeRounded />}
        onClick={() => setShowDetails((current) => !current)}
        onMouseEnter={() => setShowLines(true)}
        onMouseLeave={() => setShowLines(false)}
        avgTime={avg}
        showDetails={showDetails}
        type="potential"
      />
      {showLines &&
        destinations.map((destination) => (
          <Line
            key={`${currentHome.id}-${destination.id}`}
            from={currentHome}
            to={destination}
            duration={currentHome.travelTimes.get(destination.id)}
          />
        ))}
    </>
  );
}
