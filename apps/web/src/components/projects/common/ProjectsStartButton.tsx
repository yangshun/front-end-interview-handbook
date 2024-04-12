import { RiLock2Line, RiLockUnlockLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsPremiumAccessControlFields } from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import Button from '~/components/ui/Button';

type Props = Readonly<{
  viewerAccess: ProjectsPremiumAccessControlFields;
}>;

export default function ProjectsStartButton({ viewerAccess }: Props) {
  const intl = useIntl();
  const { startProject } = useProjectsChallengeSessionContext();

  if (viewerAccess.viewChallenge === 'ACCESSIBLE_TO_EVERYONE') {
    return (
      <Button
        display="block"
        label={intl.formatMessage({
          defaultMessage: 'Start project',
          description:
            'Label for "Start project" button on Projects project page',
          id: '6/Qdew',
        })}
        size="md"
        variant="primary"
        onClick={startProject}
      />
    );
  }
  if (viewerAccess.viewChallenge === 'UNLOCKED') {
    return (
      <Button
        addonPosition="start"
        display="block"
        icon={RiLockUnlockLine}
        label={intl.formatMessage({
          defaultMessage: 'Start project',
          description:
            'Label for "Start project" button on Projects project page',
          id: '6/Qdew',
        })}
        size="md"
        tooltip={intl.formatMessage({
          defaultMessage: 'You have unlocked this project',
          description:
            'Label for "Start project" button on Projects project page',
          id: 'KtacJv',
        })}
        variant="primary"
        onClick={startProject}
      />
    );
  }

  return (
    <Button
      addonPosition="start"
      display="block"
      icon={RiLock2Line}
      isDisabled={true}
      label={intl.formatMessage({
        defaultMessage: 'Start project',
        description:
          'Label for "Start project" button on Projects project page',
        id: '6/Qdew',
      })}
      size="md"
      variant="secondary"
    />
  );
}
