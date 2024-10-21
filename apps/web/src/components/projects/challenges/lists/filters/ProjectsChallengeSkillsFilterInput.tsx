import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import ProjectsSkillRoadmapSelectionDialog from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionDialog';
import FilterButton from '~/components/ui/FilterButton/FilterButton';

import {
  type ProjectsChallengeFilterOption,
  useProjectsChallengeFilterState,
} from '../ProjectsChallengeFilterContext';

type Props = Readonly<{
  filter: ProjectsChallengeFilterOption;
}>;

export default function ProjectsChallengeSkillsFilterInput({ filter }: Props) {
  const [selectedOptions, setSelectedOptions] = useProjectsChallengeFilterState(
    filter.id,
  );
  const [showSkillsRoadmapDialog, setShowSkillsRoadmapDialog] = useState(false);

  return (
    <>
      <FilterButton
        addonPosition="end"
        icon={RiArrowDownSLine}
        label={filter.label}
        selected={selectedOptions.length > 0}
        size="md"
        onClick={() => setShowSkillsRoadmapDialog(true)}
      />
      {showSkillsRoadmapDialog && (
        <ProjectsSkillRoadmapSelectionDialog
          defaultSkills={selectedOptions}
          isShown={showSkillsRoadmapDialog}
          onClose={() => setShowSkillsRoadmapDialog(false)}
          onComplete={(newSkills) => {
            setSelectedOptions(newSkills as Array<string>);
            setShowSkillsRoadmapDialog(false);
          }}
        />
      )}
    </>
  );
}
