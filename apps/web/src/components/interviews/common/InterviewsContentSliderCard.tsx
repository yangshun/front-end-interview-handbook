import clsx from 'clsx';
import { RiArrowRightLine, RiGithubFill } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeBorderEmphasizeColor,
  themeGlassyBorder,
  themeIconColor,
  themeTextBrandColor_GroupHover,
} from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
  count?: number;
  description: JSX.Element | string;
  href: string;
  title: string;
  type: 'github-follow' | 'github-star' | 'link';
}>;

export default function InterviewsContentSliderCard({
  title,
  description,
  href,
  count,
  type,
  className,
}: Props) {
  const backgroundColorClass = 'bg-white dark:bg-neutral-900';
  const tagCommonClass = clsx(
    'flex items-center gap-1',
    'px-2 h-7',
    'rounded',
    ['border', themeBorderEmphasizeColor],
    backgroundColorClass,
  );

  const githubStar = (
    <div className="flex gap-1.5">
      <div className={tagCommonClass}>
        <RiGithubFill className="size-4 shrink-0" />
        <Text size="body2" weight="bold">
          {type === 'github-star' && (
            <FormattedMessage
              defaultMessage="Star"
              description="Star a GitHub repository"
              id="3WZA6F"
            />
          )}
          {type === 'github-follow' && (
            <FormattedMessage
              defaultMessage="Follow"
              description="Follow a GitHub repository"
              id="IxURvm"
            />
          )}
        </Text>
      </div>
      {count && (
        <div className={clsx('relative', tagCommonClass)}>
          <Text size="body2" weight="bold">
            {count.toLocaleString()}
          </Text>
          <div
            aria-hidden={true}
            className={clsx(
              'absolute',
              'z-1',
              '-left-1',
              'size-2',
              '-rotate-45',
              ['border-l border-t', themeBorderEmphasizeColor],
              backgroundColorClass,
            )}
          />
        </div>
      )}
    </div>
  );

  return (
    <div
      className={clsx(
        'group relative rounded-lg p-[19px]',
        'flex flex-col items-start gap-y-4',
        'size-full',
        themeBackgroundCardAltColor,
        themeGlassyBorder,
        className,
      )}>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-4">
          <Text size="body2" weight="bold">
            {title}
          </Text>
          {type === 'link' && (
            <RiArrowRightLine
              className={clsx(
                'size-6 shrink-0 transition-colors',
                themeIconColor,
                themeTextBrandColor_GroupHover,
              )}
            />
          )}
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <Text color="secondary" size="body2">
            {description}
          </Text>
        </div>
      </div>
      {type !== 'link' && <div>{githubStar}</div>}
      <Anchor
        aria-label={title}
        className="absolute inset-0"
        href={href}
        variant="flat"
      />
    </div>
  );
}
