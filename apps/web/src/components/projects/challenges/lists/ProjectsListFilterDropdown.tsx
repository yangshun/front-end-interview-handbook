import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import {
  type ProjectsChallengeFilter,
  useProjectsChallengeFilterState,
} from '~/components/projects/challenges/lists/ProjectsChallengeFilterContext';
import ProjectsSkillRoadmapSelectionDialog from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionDialog';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Popover from '~/components/ui/Popover';

type Props = Readonly<{
  filter: ProjectsChallengeFilter;
}>;

export default function ProjectsListFilterDropdown({ filter }: Props) {
  const [selectedOptions, setSelectedOptions] = useProjectsChallengeFilterState(
    filter.id,
  );
  const [showSkillsRoadmapDialog, setShowSkillsRoadmapDialog] = useState(false);

  const onChange = (value: string) => {
    const newFilters = new Set(selectedOptions);

    if (newFilters.has(value)) {
      newFilters.delete(value);
    } else {
      newFilters.add(value);
    }

    setSelectedOptions(Array.from(newFilters));
  };

  return (
    <>
      {filter.id === 'skills' ? (
        <Button
          icon={RiArrowDownSLine}
          label={filter.label}
          size="md"
          variant="secondary"
          onClick={() => setShowSkillsRoadmapDialog(true)}
        />
      ) : (
        <Popover
          trigger={
            <Button
              icon={RiArrowDownSLine}
              label={filter.label}
              size="md"
              variant="secondary"
            />
          }
          width={filter.id === 'component-track' ? 'md' : 'sm'}>
          <div className="flex flex-col gap-y-3">
            {filter.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <CheckboxInput
                  label={option.label}
                  size="sm"
                  value={selectedOptions.includes(option.value)}
                  onChange={() => onChange(option.value)}
                />
              </div>
            ))}
          </div>
        </Popover>
      )}
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
