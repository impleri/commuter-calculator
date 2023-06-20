import { Location } from "grommet-icons";
import { useState } from "react";

import { DestinationInformation } from "../types.ts";
import { GenericPoint } from "./GenericPoint.tsx";

export type DestinationProps = {
  data: DestinationInformation;
};

export function Destination({ data }: DestinationProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <GenericPoint
      type="destination"
      editable
      data={data}
      icon={<Location />}
      showDetails={showDetails}
      onClick={() => setShowDetails((current) => !current)}
    />
  );
}
