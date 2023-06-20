import { Grommet } from "grommet";
import type { PropsWithChildren } from "react";

import { theme } from "./theme.ts";

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <Grommet theme={theme} full>
      {children}
    </Grommet>
  );
}
