export default function inRange(
  value: number,
  startParam: number,
  endParam?: number,
): boolean {
  let start = startParam;
  let end = endParam;
  if (end === undefined) {
    end = start;
    start = 0;
  }

  if (start < end) {
    return value >= start && value < end;
  }

  return value >= end && value < start;
}
