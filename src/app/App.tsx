import { PointStateProvider } from "../points-state";
import { ThemeProvider } from "../theme";
import { Layout } from "./Layout.tsx";

export function App() {
  return (
    <ThemeProvider>
      <PointStateProvider>
        <Layout />
      </PointStateProvider>
    </ThemeProvider>
  );
}
