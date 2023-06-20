/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOME_LATITUDE: string;
  readonly VITE_HOME_LONGITUDE: string;
  readonly VITE_STARTING_LATITUDE: string;
  readonly VITE_STARTING_LONGITUDE: string;
  readonly VITE_STARTING_ZOOM: string;
  readonly VITE_OPENROUTE_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
