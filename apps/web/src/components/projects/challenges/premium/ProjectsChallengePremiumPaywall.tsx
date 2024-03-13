import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import {
  useProjectsChallengePremiumPaywallSubtitle,
  useProjectsChallengePremiumPaywallTitle,
} from './ProjectsChallengePremiumPaywallStrings';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Partial<ProjectsViewerProjectsProfile>;

export default function ProjectsChallengePremiumPaywall({
  premium = false,
  plan = null,
  credits = 0,
}: Props) {
  const intl = useIntl();
  const title = useProjectsChallengePremiumPaywallTitle({
    credits,
    plan,
    premium,
  });
  const subtitle = useProjectsChallengePremiumPaywallSubtitle({
    credits,
    plan,
    premium,
  });

  const action = premium ? (
    <Button
      isDisabled={credits === 0}
      label={intl.formatMessage({
        defaultMessage: 'Unlock project',
        description: 'Unlock premium access for a project',
        id: 'rDGIfe',
      })}
      size="md"
      variant="primary"
    />
  ) : (
    <Button
      href="/projects/pricing"
      label={intl.formatMessage({
        defaultMessage: 'View subscription plans',
        description:
          'Label for View subscription plans button on Projects project page',
        id: '9POdEK',
      })}
      size="md"
      variant="primary"
    />
  );

  return (
    <div className={clsx('mx-auto max-w-xl', 'text-center')}>
      <Heading level="heading5">{title}</Heading>
      <Text className="text-pretty mt-4 block" color="subtitle" size="body1">
        {subtitle}
      </Text>
      <div className="mt-7">{action}</div>
    </div>
  );
}
