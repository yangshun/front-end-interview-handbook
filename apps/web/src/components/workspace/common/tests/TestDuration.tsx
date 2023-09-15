type Props = Readonly<{
  duration?: number;
}>;

export default function TestDuration({ duration }: Props) {
  if (!duration) {
    return null;
  }

  return (
    <span className="text-xs text-neutral-400 whitespace-nowrap">
      {duration} ms
    </span>
  );
}
