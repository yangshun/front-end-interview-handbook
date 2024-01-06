import clsx from 'clsx';
import { RiArrowRightSLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeCardBackgroundColor,
  themeChipBackgroundColor,
  themeTextBrandGroupHoverColor,
} from '~/components/ui/theme';

type RankNavigationItemProps = Readonly<{
  href: string;
  rank: number;
  title: string;
}>;

export default function RankNavigationItem({
  href,
  title,
  rank,
}: RankNavigationItemProps) {
  return (
    <div
      className={clsx(
        'group relative flex items-center justify-between px-4 py-3 gap-3',
        'border border-neutral-200 dark:border-transparent',
        'rounded-lg',
        'transition-colors',
        themeCardBackgroundColor,
        themeBackgroundEmphasizedHover,
      )}>
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className={clsx(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
            'font-bold text-neutral-500 dark:text-neutral-400',
            themeChipBackgroundColor,
          )}
          color="inherit">
          {rank}
        </div>
        <Anchor href={href} variant="unstyled">
          <span aria-hidden={true} className="absolute inset-0" />
          <Text color="subtitle" display="block" size="body2" weight="medium">
            {title}
          </Text>
        </Anchor>
      </div>
      <RiArrowRightSLine
        className={clsx(
          'h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400',
          themeTextBrandGroupHoverColor,
        )}
      />
    </div>
  );
}
