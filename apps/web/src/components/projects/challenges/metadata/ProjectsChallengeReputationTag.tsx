'use client';

import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBorderSubtleColor } from '~/components/ui/theme';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { getFormattedNumber } from '../../misc';

type TagVariant = 'flat' | 'underline';

type Props = Readonly<{
  className?: string;
  labelVariant?: 'default' | 'gained-skill' | 'total';
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
  const intl = useIntl();
  const showToolReputationFullNumberTooltip = points >= 1000;
  let reputationTooltip = tooltip;

  if (!tooltip && showToolReputationFullNumberTooltip) {
    reputationTooltip = intl.formatMessage(
      {
        defaultMessage: '{points} Reputation',
        description: 'Tooltip for User reputation in project',
        id: 'SaptIB',
      },
      {
        points: new Intl.NumberFormat().format(points),
      },
    );
  }

  const contents = (
    <div
      className={clsx(
        'flex items-center gap-1',
        themeTextSubtleColor,
        className,
      )}>
      <RiFireLine className={clsx('size-4')} />
      <Text
        className={clsx(
          variant === 'underline' && [
            'py-1',
            '-mb-0.5',
            'border-b border-dashed',
            themeBorderSubtleColor,
          ],
        )}
        color="inherit"
        size="body3">
        {labelVariant === 'default' && (
          <FormattedMessage
            defaultMessage="+{points} rep"
            description="Reputation points to be gained"
            id="XHzBpN"
            values={{
              points: getFormattedNumber(points),
            }}
          />
        )}
        {labelVariant === 'gained-skill' && (
          <FormattedMessage
            defaultMessage="{points} rep gained for this skill"
            description="Reputation points to be gained"
            id="4G2EHJ"
            values={{
              points: getFormattedNumber(points),
            }}
          />
        )}
        {labelVariant === 'total' && (
          <FormattedMessage
            defaultMessage="{points} rep (in total)"
            description="Reputation points to be gained"
            id="OrjlW6"
            values={{
              points: getFormattedNumber(points),
            }}
          />
        )}
      </Text>
    </div>
  );

  return reputationTooltip ? (
    <Tooltip label={reputationTooltip}>{contents}</Tooltip>
  ) : (
    contents
  );
}
