import { RiStarSmileFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Chip from '~/components/ui/Chip';
import Tooltip from '~/components/ui/Tooltip';

export default function ProjectsProfilePremiumChip() {
  const intl = useIntl();

  return (
    <Tooltip
      className="flex items-center"
      label={intl.formatMessage({
        defaultMessage: 'Premium user',
        description: 'Tooltip for premium icon',
        id: 'dq3W2/',
      })}
      triggerClassName="inline-flex">
      <Chip
        icon={RiStarSmileFill}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Premium',
          description: 'Label for premium',
          id: 'ymmDf7',
        })}
        size="xs"
        variant="special"
      />
    </Tooltip>
  );
}
