import { array, option } from "fp-ts";
import { pipe } from "fp-ts/function";

export function useDisplayTime(
  rawSeconds?: number,
  abbreviate = false,
): string {
  if (rawSeconds === undefined) {
    return "unknown";
  }

  const seconds = Math.round(rawSeconds % 60);
  const rawMinutes = (rawSeconds - seconds) / 60;

  const minutes = Math.round(rawMinutes % 60);
  const hours = Math.round((rawMinutes - minutes) / 60);

  return pipe(
    [
      hours ? `${hours} ${abbreviate ? "h" : "hours"}` : undefined,
      minutes ? `${minutes} ${abbreviate ? "m" : "minutes"}` : undefined,
      seconds ? `${seconds} ${abbreviate ? "s" : "seconds"}` : undefined,
    ],
    array.map(option.fromNullable),
    array.compact,
    (time) => time.join(", "),
  );
}
