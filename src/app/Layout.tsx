import { Main, Page } from "grommet";

import { MapStateProvider } from "../map-state";
import { Map } from "./Map.tsx";

export function Layout() {
  return (
    <Page kind="full" fill>
      <Main>
        <MapStateProvider>
          <Map />
        </MapStateProvider>
      </Main>
    </Page>
  );
}
