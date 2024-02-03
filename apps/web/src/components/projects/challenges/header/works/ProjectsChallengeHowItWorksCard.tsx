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
        'h-[160px] overflow-hidden rounded-lg p-4 pb-0 pr-0 border w-full pointer-events-none select-none',
        themeBackgroundElementColor,
        themeGlassyBorder,
        className,
      )}>
      <div className="w-[305px]">{children}</div>
    </div>
  );
}
