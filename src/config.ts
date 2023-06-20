import { option } from "fp-ts";
import { flow } from "fp-ts/function";

function isValidNumber(value: number) {
  return !Number.isNaN(value);
}

const parseCoordinate = flow(
  option.fromNullable<string | undefined>,
  option.map(parseFloat),
  option.flatMap(option.fromPredicate(isValidNumber)),
  option.getOrElse(() => 0),
);

export const INITIAL_LONGITUDE = parseCoordinate(
  import.meta.env.VITE_STARTING_LONGITUDE,
);
export const INITIAL_LATITUDE = parseCoordinate(
  import.meta.env.VITE_STARTING_LATITUDE,
);
export const INITIAL_ZOOM = parseCoordinate(import.meta.env.VITE_STARTING_ZOOM);

export const HOME_LONGITUDE = parseCoordinate(
  import.meta.env.VITE_HOME_LONGITUDE,
);
export const HOME_LATITUDE = parseCoordinate(
  import.meta.env.VITE_HOME_LATITUDE,
);

export const ORS_API_TOKEN = import.meta.env.VITE_OPENROUTE_TOKEN;

export const ENABLE_COORDINATES =
  import.meta.env.VITE_ENABLE_COORDINATES === "true";

export const ENABLE_WDYR_DEBUG =
  import.meta.env.DEV &&
  import.meta.env.VITE_ENABLE_WHY_DID_YOU_RENDER === "true";
