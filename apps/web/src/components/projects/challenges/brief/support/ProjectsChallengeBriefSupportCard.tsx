import clsx from 'clsx';

import { themeBorderElementColor } from '~/components/ui/theme';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function ProjectsChallengeBriefSupportCard({
  children,
  className,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'h-[200px] w-full overflow-hidden rounded-lg p-5 pb-0 border pointer-events-none select-none',
        themeBorderElementColor,
        themeBorderElementColor,
        className,
      )}>
      <div className="w-[330px]">{children}</div>
    </div>
  );
}
