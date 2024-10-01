'use client';

import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';

import { formatBigNumber } from '~/components/common/formatBigNumber';
import { FormattedMessage, useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Size = 'body2' | 'body3';

type Props = Readonly<{
  points: number;
  size?: Size;
}>;

const iconClasses: Record<Size, string> = {
  body2: 'size-5',
  body3: 'size-4',
};
const gap: Record<Size, string> = {
  body2: 'gap-1',
  body3: 'gap-1',
};

export default function ProjectsUserReputation({
  points,
  size = 'body3',
}: Props) {
  const intl = useIntl();

  const showToolTip = points >= 1000; // We only want to show tooltip when number is formatted in compact manner like 12k 1M 25G etc.
  const content = (
    <Text
      className={clsx(showToolTip && 'cursor-pointer')}
      color="inherit"
      size={size}
      weight="medium">
      <FormattedMessage
        defaultMessage="{points} Reputation"
        description="Label showing reputation count in profile header of Projects sidebar"
        id="xyPOJe"
        values={{ points: formatBigNumber(points) }}
      />
    </Text>
  );

  return (
    <div className={clsx('flex', themeTextSecondaryColor, gap[size])}>
      <RiFireLine className={iconClasses[size]} />
      {showToolTip ? (
        <Tooltip
          asChild={true}
          label={intl.formatMessage(
            {
              defaultMessage: '{points} Reputation',
              description: 'Tooltip for User reputation in project',
              id: 'SaptIB',
            },
            {
              points: new Intl.NumberFormat().format(points),
            },
          )}>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </div>
  );
}
