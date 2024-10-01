import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';

import ProjectsPremiumPricingTableDialog from '../challenges/premium/ProjectsPremiumPricingTableDialog';

export default function ProjectsTrackPaywall() {
  const intl = useIntl();

  const title = intl.formatMessage({
    defaultMessage: 'Premium component track',
    description: 'Premium projects component track',
    id: 'qnBYb6',
  });
  const subtitle = intl.formatMessage({
    defaultMessage:
      'Purchase premium to get access to all component tracks as well as exclusive skills, official how-to guides and production-ready Figma files.',
    description: 'Subtitle for premium projects component track',
    id: 'sfJ1Oa',
  });

  return (
    <EmptyState
      action={
        <ProjectsPremiumPricingTableDialog
          subtitle={subtitle}
          title={title}
          trigger={
            <Button
              label={intl.formatMessage({
                defaultMessage: 'View subscription plans',
                description: 'Button label to view subscription plans',
                id: 'W/I1wt',
              })}
              size="md"
              variant="primary"
            />
          }
        />
      }
      subtitle={subtitle}
      title={title}
      variant="not_subscribed"
    />
  );
}
