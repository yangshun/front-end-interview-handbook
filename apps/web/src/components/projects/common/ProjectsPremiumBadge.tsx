import { RiLock2Line, RiLockUnlockLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';

type Props = Readonly<{
  size?: React.ComponentProps<typeof Badge>['size'];
  unlocked: boolean | null;
}>;

export default function ProjectsPremiumBadge({ unlocked, size }: Props) {
  const intl = useIntl();

  if (unlocked == null) {
    return null;
  }

  return (
    <Badge
      icon={unlocked ? RiLockUnlockLine : RiLock2Line}
      label={intl.formatMessage({
        defaultMessage: 'Premium',
        description: 'Label for premium project tag',
        id: 'szBcoh',
      })}
      size={size}
      variant="special"
    />
  );
}
