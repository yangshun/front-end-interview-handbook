import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextBrandColor } from '~/components/ui/theme';

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
  return (
    <div className={clsx('flex', themeTextBrandColor, gap[size])}>
      <RiFireLine className={iconClasses[size]} />
      <Text color="inherit" size={size}>
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
