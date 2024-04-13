export default function clamp(
  value: number,
  lower: number,
  upper: number,
): number {
  return Math.min(upper, Math.max(lower, value));
}
