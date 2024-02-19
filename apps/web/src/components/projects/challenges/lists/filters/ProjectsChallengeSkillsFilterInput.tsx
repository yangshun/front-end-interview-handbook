import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import ProjectsSkillRoadmapSelectionDialog from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionDialog';
import Button from '~/components/ui/Button';

import {
  type ProjectsChallengeFilter,
  useProjectsChallengeFilterState,
} from '../ProjectsChallengeFilterContext';

type Props = Readonly<{
  filter: ProjectsChallengeFilter;
}>;

export default function ProjectsChallengeSkillsFilterInput({ filter }: Props) {
  const [selectedOptions, setSelectedOptions] = useProjectsChallengeFilterState(
    filter.id,
  );
  const [showSkillsRoadmapDialog, setShowSkillsRoadmapDialog] = useState(false);

  return (
    <>
      <Button
        icon={RiArrowDownSLine}
        label={filter.label}
        size="md"
        variant="secondary"
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
