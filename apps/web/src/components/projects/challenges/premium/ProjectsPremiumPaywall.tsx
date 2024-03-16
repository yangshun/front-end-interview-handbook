import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import ProjectsChallengeUnlockAccessDialog from './ProjectsChallengeUnlockAccessDialog';
import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';

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
  credits: number;
  slug: string;
  subtitle: ReactNode;
  title: string;
  viewerContentAccess: ProjectsPremiumAccessControlType;
}>;

export default function ProjectsPremiumPaywall({
  credits,
  slug,
  subtitle,
  title,
  viewerContentAccess,
}: Props) {
  const intl = useIntl();

  const action = (() => {
    if (viewerContentAccess === 'INSUFFICIENT_CREDITS') {
      // TODO(projects): implement upgrade flow.
      return null;
    }

    if (viewerContentAccess === 'UNLOCK') {
      return <UnlockButton credits={credits} slug={slug} />;
    }

    return (
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
  })();

  return (
    <div className={clsx('mx-auto max-w-xl', 'text-center')}>
      <Heading className="text-pretty" level="heading5">
        {title}
      </Heading>
      <Text className="text-pretty mt-4 block" color="subtitle" size="body1">
        {subtitle}
      </Text>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
