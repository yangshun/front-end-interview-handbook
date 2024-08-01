import clsx from 'clsx';

type Props = Readonly<{
  branchHeightClass: string;
  drawVerticalLine?: boolean;
}>;

export default function CommentRepliesThreadLines({
  branchHeightClass,
  drawVerticalLine = false,
}: Props) {
  return (
    <div
      aria-hidden={true}
      className="relative flex w-[52px] shrink-0 flex-col items-center">
      {drawVerticalLine && (
        <div
          className={clsx(
            'absolute h-full w-px -translate-x-2 border-l',
            'border-neutral-300',
          )}
        />
      )}
      <div
        className={clsx(
          'absolute -top-2 end-0 w-[33.5px] rounded-es-2xl border-b border-s',
          'border-neutral-300',
          branchHeightClass,
        )}
      />
    </div>
  );
}
