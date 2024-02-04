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
        'h-[160px] overflow-hidden rounded-lg pt-4 pl-4 border w-full pointer-events-none select-none',
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
