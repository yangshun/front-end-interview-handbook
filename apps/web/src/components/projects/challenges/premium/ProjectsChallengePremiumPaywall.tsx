import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeAccessControlViewContents } from './ProjectsChallengeAccessControl';
import {
  useProjectsChallengePremiumPaywallSubtitle,
  useProjectsChallengePremiumPaywallTitle,
} from './ProjectsChallengePremiumPaywallStrings';
import type { ProjectsViewerProjectsProfile } from '../../types';

function UnlockButton({
  credits,
  slug,
}: Readonly<{
  credits: number;
  slug: string;
}>) {
  const intl = useIntl();
  const unlockAccessMutation =
    trpc.projects.challenges.unlockAccess.useMutation();

  return (
    <Button
      isDisabled={credits === 0 || unlockAccessMutation.isLoading}
      isLoading={unlockAccessMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Unlock project',
        description: 'Unlock premium access for a project',
        id: 'rDGIfe',
      })}
      size="md"
      variant="primary"
      onClick={() => {
        unlockAccessMutation.mutate({
          slug,
        });
      }}
    />
  );
}

type Props = Partial<ProjectsViewerProjectsProfile> &
  Readonly<{
    slug: string;
    viewerContentAccess: ProjectsChallengeAccessControlViewContents;
  }>;

export default function ProjectsChallengePremiumPaywall({
  viewerContentAccess,
  credits = 0,
  plan = null,
  slug,
}: Props) {
  const intl = useIntl();
  const title = useProjectsChallengePremiumPaywallTitle(viewerContentAccess);
  const subtitle = useProjectsChallengePremiumPaywallSubtitle(
    viewerContentAccess,
    credits,
    plan,
  );

  const action =
    viewerContentAccess === 'UNLOCK' ? (
      <UnlockButton credits={credits} slug={slug} />
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
