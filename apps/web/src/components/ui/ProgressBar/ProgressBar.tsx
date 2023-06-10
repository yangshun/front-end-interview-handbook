import clsx from 'clsx';

type ProgressBarSize = 'lg' | 'md';

type Props = Readonly<{
  completed: number;
  showKnob?: boolean;
  size?: ProgressBarSize;
  total: number;
}>;

export default function ProgressBar({
  completed,
  showKnob = false,
  size = 'md',
  total,
}: Props) {
  if (total === 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        'relative w-full',
        size === 'md' && 'h-3',
        size === 'lg' && 'h-4',
      )}>
      {showKnob && (
        <div
          className="absolute -top-2 z-10 flex h-8 w-8 -translate-x-4 items-center justify-center rounded-full bg-neutral-100 drop-shadow-lg"
          style={{ left: `calc(${(completed / total) * 100}%)` }}>
          <div className="bg-success h-4 w-4 rounded-full" />
        </div>
      )}
      <div
        className={clsx(
          'flex-grow-1 relative flex h-full w-full overflow-clip bg-neutral-200',
          size === 'md' && 'rounded-lg',
          size === 'lg' && 'rounded-xl',
        )}>
        <div
          aria-valuemax={total}
          aria-valuemin={0}
          aria-valuenow={completed}
          className={clsx(
            'bg-success h-full w-full origin-left transition-transform duration-500',
            size === 'md' && 'rounded-lg',
            size === 'lg' && 'rounded-xl',
          )}
          role="progressbar"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
