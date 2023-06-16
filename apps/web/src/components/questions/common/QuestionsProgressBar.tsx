import clsx from 'clsx';

type Props = Readonly<{
  className: string;
  completed: number;
  total: number;
}>;

export default function QuestionsProgressBar({
  completed,
  total,
  className,
}: Props) {
  const progress = (completed / total) * 100;

  return (
    <div className="h-2 w-full rounded-full bg-neutral-200/70 dark:bg-neutral-800">
      <div
        className={clsx('h-full rounded-full', className)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
