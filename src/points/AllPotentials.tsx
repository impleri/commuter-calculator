import { usePointState } from "../points-state";
import { Potential } from "./Potential.tsx";

export function AllPotentials() {
  const { potential } = usePointState();

  return (
    <>
      {potential.map((potential) => (
        <Potential key={`${potential.id}`} data={potential} />
      ))}
    </>
  );
}
