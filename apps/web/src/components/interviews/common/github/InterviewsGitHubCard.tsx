import clsx from 'clsx';
import { RiGithubFill } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeBorderEmphasizeColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

type Props = Readonly<{
  count?: number;
  description: string;
  href: string;
  title: string;
  type: 'follow' | 'star';
}>;

export default function InterviewsGitHubCard({
  title,
  description,
  href,
  count,
  type,
}: Props) {
  const backgroundColorClass = 'bg-white dark:bg-neutral-900';
  const tagCommonClass = clsx(
    'flex items-center gap-1',
    'px-2 h-7',
    'rounded',
    ['border', themeBorderEmphasizeColor],
    backgroundColorClass,
  );

  return (
    <div
      className={clsx(
        'relative rounded-lg p-5',
        'flex flex-col items-start gap-y-4',
        'h-full',
        themeBackgroundCardAltColor,
        themeGlassyBorder,
      )}>
      <div className="flex flex-col gap-2">
        <Text size="body2" weight="bold">
          {title}
        </Text>
        <Text color="secondary" size="body2">
          {description}
        </Text>
      </div>
      <div className="flex gap-2">
        <div className={tagCommonClass}>
          <RiGithubFill className="size-4 shrink-0" />
          <Text size="body2" weight="bold">
            {type === 'star' && (
              <FormattedMessage
                defaultMessage="Star"
                description="Label for github star button"
                id="/KVfm1"
              />
            )}
            {type === 'follow' && (
              <FormattedMessage
                defaultMessage="Follow"
                description="Label for github follow button"
                id="MMflpy"
              />
            )}
          </Text>
        </div>
        <div className={clsx('relative', tagCommonClass)}>
          {count && (
            <Text size="body2" weight="bold">
              {count.toLocaleString()}
            </Text>
          )}
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
      </div>
      <Anchor
        aria-label={title}
        className="absolute inset-0"
        href={href}
        variant="flat"
      />
    </div>
  );
}
