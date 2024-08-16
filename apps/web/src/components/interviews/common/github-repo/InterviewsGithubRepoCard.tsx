import clsx from 'clsx';
import { RiGithubFill } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeBackgroundLayerEmphasized,
  themeBorderEmphasizeColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

type CommonProps = Readonly<{
  description: string;
  href: string;
  title: string;
}>;

type ActionProps = CommonProps &
  Readonly<{
    actionLabel: string;
    type: 'action';
  }>;

type StarProps = CommonProps &
  Readonly<{
    starCount: number;
    type: 'star';
  }>;

type Props = ActionProps | StarProps;

export default function InterviewsGithubRepoCard(props: Props) {
  const { title, description, href, type } = props;
  const { starCount } = props as StarProps;
  const { actionLabel } = props as ActionProps;

  const tagCommonClass = clsx(
    'flex items-center gap-1',
    'px-2 h-7',
    'rounded',
    ['border', themeBorderEmphasizeColor],
    themeBackgroundLayerEmphasized,
  );

  return (
    <div
      className={clsx(
        'relative rounded-lg p-5',
        'flex flex-col items-start gap-y-4',
        'h-full w-[344px]',
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

      {type === 'star' ? (
        <>
          <div className="flex gap-1.5">
            <div className={tagCommonClass}>
              <RiGithubFill className="size-4 shrink-0" />
              <Text size="body2" weight="bold">
                <FormattedMessage
                  defaultMessage="Star"
                  description="Label for github star"
                  id="qrRiOi"
                />
              </Text>
            </div>

            <div className={clsx('relative', tagCommonClass)}>
              <Text size="body2" weight="bold">
                {starCount.toLocaleString()}
              </Text>
              <div
                className={clsx(
                  'absolute',
                  'z-1',
                  '-left-1.5',
                  'size-3',
                  '-rotate-45',
                  ['border-l border-t', themeBorderEmphasizeColor],
                  themeBackgroundLayerEmphasized,
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
        </>
      ) : (
        <Button href={href} label={actionLabel} size="xs" variant="secondary" />
      )}
    </div>
  );
}
