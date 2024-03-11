import { RiLock2Line, RiLockUnlockLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';

type Props = Readonly<{
  unlocked: boolean;
}>;

export default function ProjectsPremiumBadge({ unlocked }: Props) {
  const intl = useIntl();

  return (
    <Badge
      icon={unlocked ? RiLockUnlockLine : RiLock2Line}
      label={intl.formatMessage({
        defaultMessage: 'Premium',
        description: 'Label for premium project tag',
        id: 'szBcoh',
      })}
      variant="special"
    />
  );
}
