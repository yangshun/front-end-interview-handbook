import clsx from 'clsx';

import { themeBorderElementColor } from '../../ui/theme';

type Props = Readonly<{
  branchHeightClass: string;
  drawVerticalLine?: boolean;
}>;

export default function ProjectsDiscussionsCommentRepliesThreadLines({
  branchHeightClass,
  drawVerticalLine = false,
}: Props) {
  return (
    <div
      aria-hidden={true}
      className="relative flex w-[72px] shrink-0 flex-col items-center">
      {drawVerticalLine && (
        <div
          className={clsx(
            'absolute h-full w-px -translate-x-2 border-l',
            themeBorderElementColor,
          )}
        />
      )}
      <div
        className={clsx(
          'absolute end-0 top-0 w-[44.5px] rounded-es-2xl border-b border-s',
          themeBorderElementColor,
          branchHeightClass,
        )}
      />
    </div>
  );
}
