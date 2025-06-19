import clsx from 'clsx';
import { RiArrowRightSLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundChipColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeTextBrandColor_GroupHover,
} from '~/components/ui/theme';

type RankNavigationItemProps = Readonly<{
  href: string;
  rank: number;
  title: string;
}>;

export default function RankNavigationItem({
  href,
  rank,
  title,
}: RankNavigationItemProps) {
  return (
    <div
      className={clsx(
        'group relative flex items-center justify-between gap-3 px-4 py-3',
        'border border-neutral-200 dark:border-transparent',
        'rounded-lg',
        'transition-colors',
        themeBackgroundCardColor,
        themeBackgroundElementEmphasizedStateColor_Hover,
      )}>
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className={clsx(
            'size-5 flex shrink-0 items-center justify-center rounded-full',
            'font-bold text-neutral-500 dark:text-neutral-400',
            themeBackgroundChipColor,
          )}
          color="inherit">
          {rank}
        </div>
        <Anchor href={href} variant="unstyled">
          <span aria-hidden={true} className="absolute inset-0" />
          <Text className="block" color="subtitle" size="body2" weight="medium">
            {title}
          </Text>
        </Anchor>
      </div>
      <RiArrowRightSLine
        className={clsx(
          'size-5 shrink-0 text-neutral-500 dark:text-neutral-400',
          themeTextBrandColor_GroupHover,
        )}
      />
    </div>
  );
}
