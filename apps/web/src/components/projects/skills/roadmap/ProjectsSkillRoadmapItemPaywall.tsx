import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';

import ProjectsPremiumPricingTableDialog from '../../challenges/premium/ProjectsPremiumPricingTableDialog';

export default function ProjectsSkillRoadmapItemPaywall() {
  const intl = useIntl();

  const title = intl.formatMessage({
    defaultMessage: 'Premium skill',
    description: 'Premium projects skill roadmap item',
    id: 'MYlNB6',
  });
  const subtitle = intl.formatMessage({
    defaultMessage:
      'Purchase premium to get access to all skill plans as well as exclusive component tracks, official how-to guides and production-ready Figma files.',
    description: 'Subtitle for premium projects skill roadmap',
    id: 'vNvx2g',
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
