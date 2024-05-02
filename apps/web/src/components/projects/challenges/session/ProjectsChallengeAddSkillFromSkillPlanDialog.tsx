import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import Text from '~/components/ui/Text';

import { projectsSkillLabel } from '../../skills/data/ProjectsSkillListData';
import type { ProjectsSkillKey } from '../../skills/types';

import type { ProjectsChallengeSession } from '@prisma/client';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  session: ProjectsChallengeSession;
  skillToAdd: ProjectsSkillKey;
}>;

export default function ProjectsChallengeAddSkillFromSkillPlanDialog({
  isShown,
  session,
  skillToAdd,
  onClose,
}: Props) {
  const intl = useIntl();
  const updateSessionSkillsMutation =
    trpc.projects.sessions.skillsUpdate.useMutation();

  return (
    <ConfirmationDialog
      isDisabled={updateSessionSkillsMutation.isLoading}
      isLoading={updateSessionSkillsMutation.isLoading}
      isShown={isShown}
      title={intl.formatMessage(
        {
          defaultMessage:
            'Add "{skillName}" to skills used for this challenge?',
          description: 'Dialog title for challenge session',
          id: 'MVPtTG',
        },
        {
          skillName: projectsSkillLabel(skillToAdd),
        },
      )}
      onCancel={onClose}
      onConfirm={() => {
        updateSessionSkillsMutation.mutate(
          {
            roadmapSkills: [...session.roadmapSkills, skillToAdd],
            sessionId: session.id,
            slug: session.slug,
            techStackSkills: session.techStackSkills,
          },
          {
            onSuccess: onClose,
          },
        );
      }}>
      <FormattedMessage
        defaultMessage={`Do you want to add the <bold>"{skillName}"</bold> skill to this challenge so that completing the challenge will count towards that skill's progress?`}
        description="Message about adding a skill to a challenge session"
        id="t5o9Z7"
        values={{
          bold: (chunks) => <Text weight="medium">{chunks}</Text>,
          skillName: projectsSkillLabel(skillToAdd),
        }}
      />
    </ConfirmationDialog>
  );
}
