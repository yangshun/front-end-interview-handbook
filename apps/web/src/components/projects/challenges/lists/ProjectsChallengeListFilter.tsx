import type { ProjectsChallengeFilterDropdown } from '~/components/projects/challenges/lists/ProjectsChallengeFilterContext';
import { type ProjectsChallengeFilter } from '~/components/projects/challenges/lists/ProjectsChallengeFilterContext';

import ProjectsChallengePopoverFilterInput from './filters/ProjectsChallengePopoverFilterInput';
import ProjectsChallengeSkillsFilterInput from './filters/ProjectsChallengeSkillsFilterInput';

type Props = Readonly<{
  filter: ProjectsChallengeFilter;
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
