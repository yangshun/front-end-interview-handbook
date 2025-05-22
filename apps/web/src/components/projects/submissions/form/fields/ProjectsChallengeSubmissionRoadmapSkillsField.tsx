import clsx from 'clsx';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { RiInformationLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import { MAX_SKILLS_FOR_REP_GAINS_IN_SUBMISSION } from '~/components/projects/misc';
import { getProjectsRoadmapSkillsInputAttributes } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import type { ProjectsSkillKey } from '~/components/projects/skills/types';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  challengeDefaultSkills?: ReadonlyArray<ProjectsSkillKey>;
  control: Control<ProjectsChallengeSubmissionFormValues>;
  required?: boolean;
}>;

const fieldName = 'roadmapSkills';

export default function ProjectsChallengeSubmissionRoadmapSkillsField({
  challengeDefaultSkills,
  control,
  required,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsRoadmapSkillsInputAttributes(intl, required);
  const {
    field,
    formState: { dirtyFields, errors, submitCount },
  } = useController({
    control,
    name: fieldName,
    rules: { required: attrs.validation.required },
  });

  return (
    <ProjectsSkillRoadmapSelectionInput
      challengeDefaultSkills={challengeDefaultSkills}
      description={attrs.description}
      errorMessage={
        dirtyFields[fieldName] || submitCount > 0
          ? errors[fieldName]?.message
          : undefined
      }
      footerInfoContent={
        <div className="flex items-center gap-3">
          <Text className="text-neutral-900 dark:text-neutral-200" size="body2">
            <FormattedMessage
              defaultMessage="You will receive rep for the top {skillCount} skills used in the project."
              description="Label for rep gains from top 10 skills"
              id="SBdIR/"
              values={{
                skillCount: MAX_SKILLS_FOR_REP_GAINS_IN_SUBMISSION,
              }}
            />
          </Text>
          <Tooltip
            label={intl.formatMessage({
              defaultMessage:
                'Rep will be awarded for using skills in a project. Realistically, we expect up to 8 skills being used in a large project.',
              description: 'Description for rep gains from top 10 skills',
              id: 'H2F0aE',
            })}>
            <RiInformationLine
              className={clsx('size-4 shrink-0', themeTextSubtleColor)}
            />
          </Tooltip>
        </div>
      }
      label={attrs.label}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      {...field}
    />
  );
}
