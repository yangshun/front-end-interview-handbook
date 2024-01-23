import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextBrandColor } from '~/components/ui/theme';

type Size = '2xs' | 'sm';

type Props = Readonly<{
  points: number;
  size?: Size;
}>;

const textClasses: Record<Size, string> = {
  '2xs': 'text-2xs',
  sm: 'text-sm',
};

const iconClasses: Record<Size, string> = {
  '2xs': 'h-3 w-3',
  sm: 'h-5 w-5',
};
const gap: Record<Size, string> = {
  '2xs': 'gap-1',
  sm: 'gap-2',
};

export default function ProjectsUserReputation({ points, size = 'sm' }: Props) {
  return (
    <div className={clsx('flex', themeTextBrandColor, gap[size])}>
      <RiFireLine className={iconClasses[size]} />
      <Text className={textClasses[size]} color="inherit" size="inherit">
        <FormattedMessage
          defaultMessage="{points} Reputation"
          description="Label showing reputation count in profile header of Projects sidebar"
          id="xyPOJe"
          values={{ points }}
        />
      </Text>
    </div>
  );
}
