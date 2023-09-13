export default function inRange(value, start, end = 0) {
  return Math.min(start, end) <= value && value < Math.max(start, end);
}
