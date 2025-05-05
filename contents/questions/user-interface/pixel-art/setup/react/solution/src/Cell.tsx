import { COLORS, Color } from './colors';

type Props = Readonly<{
  color: Color | null;
  isDragging: boolean;
  onMark: () => void;
}>;

export default function Cell({
  color,
  isDragging,
  onMark,
}: Props) {
  return (
    <button
      onClick={onMark}
      onMouseDown={onMark}
      onMouseEnter={isDragging ? onMark : undefined}
      style={{
        backgroundColor:
          color != null ? COLORS[color] : undefined,
      }}
      className="grid__cell"
    />
  );
}
