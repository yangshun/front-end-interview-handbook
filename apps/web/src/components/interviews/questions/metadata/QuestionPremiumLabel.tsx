import { RiStarSmileFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';

export default function QuestionPremiumLabel() {
  const intl = useIntl();

  return (
    <Badge
      icon={RiStarSmileFill}
      label={intl.formatMessage({
        defaultMessage: 'Premium',
        description: 'Premium content',
        id: 'gIeLON',
      })}
      size="sm"
      variant="special"
    />
  );
}
