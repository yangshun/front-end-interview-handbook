import type { ProjectsChallengeSession } from '@prisma/client';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { FormattedMessage, useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

import { projectsSkillLabel } from '../../skills/data/ProjectsSkillListData';
import { projectsSkillDetermineParentSkill } from '../../skills/data/ProjectsSkillUtils';
import type { ProjectsSkillKey } from '../../skills/types';

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
  const trpcUtils = trpc.useUtils();
  const updateSessionSkillsMutation =
    trpc.projects.sessions.skillsUpdate.useMutation({
      onSuccess: () => {
        trpcUtils.projects.sessions.latestInProgress.invalidate();
      },
    });
  const parentSkill = projectsSkillDetermineParentSkill(skillToAdd);

  return (
    <ConfirmationDialog
      isDisabled={updateSessionSkillsMutation.isLoading}
      isLoading={updateSessionSkillsMutation.isLoading}
      isShown={isShown}
      title={
        parentSkill == null
          ? intl.formatMessage(
              {
                defaultMessage:
                  'Add "{skillName}" to the skills used for this challenge?',
                description: 'Dialog title for challenge session',
                id: 'aqjjbk',
              },
              {
                skillName: projectsSkillLabel(skillToAdd),
              },
            )
          : intl.formatMessage(
              {
                defaultMessage:
                  'Add "{parentSkill} - {skillName}" to the skills used for this challenge?',
                description: 'Dialog title for challenge session',
                id: 'eOYq41',
              },
              {
                parentSkill: projectsSkillLabel(parentSkill.key),
                skillName: projectsSkillLabel(skillToAdd),
              },
            )
      }
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
      {parentSkill == null ? (
        <FormattedMessage
          defaultMessage={`Are you intending to use <bold>"{childSkill}"</bold> for this challenge? We will add it to the skills used so your progress for its skill plan will be tracked.`}
          description="Message about adding a skill to a challenge session"
          id="aZ648A"
          values={{
            bold: (chunks) => <Text weight="medium">{chunks}</Text>,
            childSkill: projectsSkillLabel(skillToAdd),
          }}
        />
      ) : (
        <FormattedMessage
          defaultMessage={`Are you intending to use <bold>"{parentSkill} - {childSkill}"</bold> for this challenge? We will add it to the skills used so your progress for its skill plan will be tracked.`}
          description="Message about adding a skill to a challenge session"
          id="NX+p0K"
          values={{
            bold: (chunks) => <Text weight="medium">{chunks}</Text>,
            childSkill: projectsSkillLabel(skillToAdd),
            parentSkill: projectsSkillLabel(parentSkill.key),
          }}
        />
      )}
    </ConfirmationDialog>
  );
}
