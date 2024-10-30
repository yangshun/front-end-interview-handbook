import { RiStarSmileFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { BadgeSize } from '~/components/ui/Badge';
import Badge from '~/components/ui/Badge';

type Props = Readonly<{
  size?: BadgeSize;
}>;

export default function InterviewsPremiumBadge({ size = 'sm' }: Props) {
  const intl = useIntl();

  return (
    <Badge
      icon={RiStarSmileFill}
      label={intl.formatMessage({
        defaultMessage: 'Premium',
        description: 'Premium user or content',
        id: 'rf0xcZ',
      })}
      labelClassName="font-semibold"
      size={size}
      variant="primary"
    />
  );
}
