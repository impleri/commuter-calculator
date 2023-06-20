import { usePointState } from "../points-state";
import { Destination } from "./Destination.tsx";

export function AllDestinations() {
  const { destinations } = usePointState();

  return (
    <>
      {destinations.map((destination) => (
        <Destination key={destination.id} data={destination} />
      ))}
    </>
  );
}
