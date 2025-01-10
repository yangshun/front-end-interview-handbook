import { RiStarSmileFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { BadgeSize } from '~/components/ui/Badge';
import Badge from '~/components/ui/Badge';
import Chip from '~/components/ui/Chip';

type Props = Readonly<{
  iconOnly?: boolean;
  size?: BadgeSize;
}>;

export default function InterviewsPremiumBadge({
  iconOnly = false,
  size = 'sm',
}: Props) {
  const intl = useIntl();

  const label = intl.formatMessage({
    defaultMessage: 'Premium',
    description: 'Premium user or content',
    id: 'rf0xcZ',
  });

  if (iconOnly) {
    return (
      <Chip
        className="size-[18px]"
        icon={RiStarSmileFill}
        iconClassName="size-[14px]"
        isLabelHidden={true}
        label={label}
        variant="primary"
      />
    );
  }

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
