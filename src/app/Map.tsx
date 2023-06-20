import { RLayerVector, RMap, ROSMWebGL } from "rlayers";

import { AddPoint, Coordinates } from "../controls";
import { useMapState } from "../map-state";
import { AllDestinations, AllPotentials, Home } from "../points";
import { LAYERS } from "../theme";

export function Map() {
  const { state, setState } = useMapState();

  return (
    <RMap
      initial={state}
      view={[state, setState]}
      minZoom={0}
      maxZoom={20}
      width="100%"
      height="100%"
      noDefaultControls
    >
      {/* @ts-expect-error Bad Typing from RLayers */}
      <ROSMWebGL />
      {/* @ts-expect-error Bad Typing from RLayers */}
      <RLayerVector zIndex={LAYERS.map}>
        <AllDestinations />
        <Home />
        <AllPotentials />
      </RLayerVector>
      <Coordinates />
      <AddPoint />
    </RMap>
  );
}
