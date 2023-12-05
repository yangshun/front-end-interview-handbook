import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

import ProjectsSkillChip from '../skills/ProjectsSkillChip';
import type { ProjectSkill } from '../skills/types';

type Props = Readonly<{
  stack: Array<ProjectSkill>;
}>;

export default function ProjectsSubmissionStack({ stack }: Props) {
  return (
    <div className="flex gap-2">
      <Text color="secondary" size="body3">
        <FormattedMessage
          defaultMessage="Stack used"
          description="Label for tech stack used in project"
          id="aiI8c6"
        />
      </Text>
      {stack.map(({ key, label, difficulty }) => (
        <ProjectsSkillChip key={key} difficulty={difficulty} label={label} />
      ))}
    </div>
  );
}
