import clsx from 'clsx';

import {
  themeBackgroundElementColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function ProjectsChallengeHowItWorksCard({
  children,
  className,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'pointer-events-none h-[160px] w-full select-none overflow-hidden rounded-lg border pl-4 pt-4',
        themeBackgroundElementColor,
        themeGlassyBorder,
        className,
      )}>
      <div className="w-[305px]" inert="">
        {children}
      </div>
    </div>
  );
}
