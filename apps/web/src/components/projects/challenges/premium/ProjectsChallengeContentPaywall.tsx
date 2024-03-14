import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeAccessControlType } from './ProjectsChallengeAccessControl';
import {
  useProjectsChallengePremiumPaywallSubtitle,
  useProjectsChallengePremiumPaywallTitle,
} from './ProjectsChallengePremiumPaywallStrings';
import type { ProjectsViewerProjectsProfile } from '../../types';

function UnlockButton({
  slug,
}: Readonly<{
  slug: string;
}>) {
  const intl = useIntl();
  const unlockAccessMutation =
    trpc.projects.challenges.unlockAccess.useMutation();

  return (
    <Button
      isDisabled={unlockAccessMutation.isLoading}
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

type Props = Readonly<{
  slug: string;
  viewerContentAccess: ProjectsChallengeAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeContentPaywall({
  viewerContentAccess,
  viewerProjectsProfile,
  slug,
}: Props) {
  const intl = useIntl();
  const title = useProjectsChallengePremiumPaywallTitle(viewerContentAccess);
  const subtitle = useProjectsChallengePremiumPaywallSubtitle(
    viewerContentAccess,
    viewerProjectsProfile?.credits ?? 0,
    viewerProjectsProfile?.plan ?? null,
  );

  const action =
    viewerContentAccess ===
    'INSUFFICIENT_CREDITS' ? null : viewerContentAccess === 'UNLOCK' ? (
      <UnlockButton slug={slug} />
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
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
