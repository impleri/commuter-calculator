import { Button } from "grommet";
import { Clear } from "grommet-icons";

type AddPointResetProps = {
  reset: () => void;
};

export function AddPointReset({ reset }: AddPointResetProps) {
  return <Button icon={<Clear />} onClick={reset} label="Cancel" reverse />;
}
