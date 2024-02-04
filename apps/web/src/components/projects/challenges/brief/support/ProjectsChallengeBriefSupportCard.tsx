import clsx from 'clsx';

import {
  themeBackgroundCardColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsChallengeBriefSupportCard({ children }: Props) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'h-[200px] w-full overflow-hidden pt-5 px-5',
        'rounded-lg',
        'pointer-events-none select-none',
        themeGlassyBorder,
        themeBackgroundCardColor,
      )}
      inert="">
      {children}
    </div>
  );
}
