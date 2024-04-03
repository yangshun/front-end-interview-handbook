import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderSubtleColor,
  themeTextBrandColor,
} from '~/components/ui/theme';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type TagVariant = 'filled' | 'flat' | 'underline';

type Props = Readonly<{
  className?: string;
  labelVariant?: 'default' | 'gained-skill' | 'to-be-gained' | 'total';
  points: number;
  tooltip?: string;
  variant?: TagVariant;
}>;

export default function ProjectsChallengeReputationTag({
  points,
  className,
  labelVariant = 'default',
  variant = 'flat',
  tooltip,
}: Props) {
  const contents = (
    <div
      className={clsx(
        'flex items-center gap-1',
        themeTextSubtleColor,
        variant === 'filled' && [
          'rounded-full px-3 py-1',
          themeBackgroundLayerEmphasized,
        ],
        className,
      )}>
      <RiFireLine
        className={clsx('size-4', variant === 'filled' && themeTextBrandColor)}
      />
      <Text
        className={clsx(
          variant === 'underline' && [
            'py-1',
            '-mb-0.5',
            'border-b border-dashed',
            themeBorderSubtleColor,
          ],
        )}
        color={variant === 'filled' ? 'default' : 'inherit'}
        size="body3"
        weight={variant === 'filled' ? 'medium' : 'normal'}>
        {labelVariant === 'default' && (
          <FormattedMessage
            defaultMessage="{points} rep"
            description="Reputation points to be gained"
            id="md057S"
            values={{
              points,
            }}
          />
        )}
        {labelVariant === 'gained-skill' && (
          <FormattedMessage
            defaultMessage="{points} rep gained for this skill"
            description="Reputation points to be gained"
            id="4G2EHJ"
            values={{
              points,
            }}
          />
        )}
        {labelVariant === 'to-be-gained' && (
          <FormattedMessage
            defaultMessage="{points} rep to be gained"
            description="Reputation points to be gained"
            id="IB1RF5"
            values={{
              points,
            }}
          />
        )}
        {labelVariant === 'total' && (
          <FormattedMessage
            defaultMessage="{points} rep (in total)"
            description="Reputation points to be gained"
            id="OrjlW6"
            values={{
              points,
            }}
          />
        )}
      </Text>
    </div>
  );

  return tooltip ? <Tooltip label={tooltip}>{contents}</Tooltip> : contents;
}
