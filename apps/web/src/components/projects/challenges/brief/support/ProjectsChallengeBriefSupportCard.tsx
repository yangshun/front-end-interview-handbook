import clsx from 'clsx';

import {
  themeBackgroundElementColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

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
        'h-[200px] w-full overflow-hidden rounded-lg pt-5 pr-5 pl-5 border pointer-events-none select-none',
        themeBackgroundElementColor,
        themeBorderElementColor,
        className,
      )}>
      {/* @ts-expect-error React doesn't support inert yet */}
      <div className="w-[330px]" inert="">
        {children}
      </div>
    </div>
  );
}
