import type { ProjectsChallengeFilterDropdown } from '~/components/projects/challenges/lists/ProjectsChallengeFilterContext';
import { type ProjectsChallengeFilterOption } from '~/components/projects/challenges/lists/ProjectsChallengeFilterContext';

import ProjectsChallengePopoverFilterInput from './filters/ProjectsChallengePopoverFilterInput';
import ProjectsChallengeSkillsFilterInput from './filters/ProjectsChallengeSkillsFilterInput';

type Props = Readonly<{
  filter: ProjectsChallengeFilterOption;
}>;

export default function ProjectsChallengeListFilter({ filter }: Props) {
  return filter.type === 'skill-selection' ? (
    <ProjectsChallengeSkillsFilterInput filter={filter} />
  ) : (
    <ProjectsChallengePopoverFilterInput
      filter={filter as ProjectsChallengeFilterDropdown}
    />
  );
}
