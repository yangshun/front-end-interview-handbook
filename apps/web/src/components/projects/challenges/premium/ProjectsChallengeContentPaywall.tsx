import clsx from 'clsx';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeAccessControlType } from './ProjectsChallengeAccessControl';
import {
  useProjectsChallengePremiumPaywallSubtitle,
  useProjectsChallengePremiumPaywallTitle,
} from './ProjectsChallengePremiumPaywallStrings';
import ProjectsChallengeUnlockAccessDialog from './ProjectsChallengeUnlockAccessDialog';
import type { ProjectsViewerProjectsProfile } from '../../types';

function UnlockButton({
  credits,
  slug,
}: Readonly<{
  credits: number;
  slug: string;
}>) {
  const intl = useIntl();
  const [unlockDialogShown, setUnlockDialogShown] = useState(false);

  return (
    <div>
      <Button
        label={intl.formatMessage({
          defaultMessage: 'Unlock challenge',
          description: 'Unlock premium access for a project',
          id: 'LlhHTu',
        })}
        size="md"
        variant="primary"
        onClick={() => {
          setUnlockDialogShown(true);
        }}
      />
      <ProjectsChallengeUnlockAccessDialog
        credits={credits}
        isShown={unlockDialogShown}
        slug={slug}
        onClose={() => {
          setUnlockDialogShown(false);
        }}
      />
    </div>
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
  const credits = viewerProjectsProfile?.credits ?? 0;
  const subtitle = useProjectsChallengePremiumPaywallSubtitle(
    viewerContentAccess,
    viewerProjectsProfile?.credits ?? 0,
    viewerProjectsProfile?.plan ?? null,
  );

  const action =
    viewerContentAccess ===
    'INSUFFICIENT_CREDITS' ? null : viewerContentAccess === 'UNLOCK' ? (
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
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
