import clsx from 'clsx';

type Props = Readonly<{
  heightClass?: string;
  label: string;
  progressClass?: string;
  total: number;
  value: number;
}>;

export default function ProgressBar({
  progressClass = 'bg-green',
  heightClass = 'h-2',
  value,
  label,
  total,
}: Props) {
  const widthPercentage = Math.min(value / Math.max(total, 1), 1);

  return (
    <div
      aria-label={label}
      aria-valuemax={total}
      aria-valuemin={0}
      aria-valuenow={value}
      className={clsx(
        'w-full rounded-full bg-neutral-200/70 dark:bg-neutral-800',
        'min-w-[120px]',
        heightClass,
      )}
      role="progressbar">
      <div
        className={clsx(
          'h-full rounded-full transition-[width]',
          progressClass,
        )}
        style={{ width: `${widthPercentage * 100}%` }}
      />
    </div>
  );
}
