import { RiLock2Line, RiLockUnlockLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';

type Props = Readonly<{
  size?: React.ComponentProps<typeof Badge>['size'];
  unlocked: boolean | null;
}>;

export default function ProjectsPremiumBadge({ unlocked, size }: Props) {
  const intl = useIntl();

  return (
    <Badge
      icon={unlocked ? RiLockUnlockLine : RiLock2Line}
      label={intl.formatMessage({
        defaultMessage: 'Premium',
        description: 'Label for premium',
        id: 'ymmDf7',
      })}
      size={size}
      variant="special"
    />
  );
}
