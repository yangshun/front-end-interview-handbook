import { RiArrowDownSLine } from 'react-icons/ri';

import type { ProjectsChallengeSubmissionFilterOption } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import { useProjectsChallengeSubmissionFilterState } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import CheckboxInput from '~/components/ui/CheckboxInput';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Popover from '~/components/ui/Popover';

type Props = Readonly<{
  filter: ProjectsChallengeSubmissionFilterOption;
}>;

export default function ProjectsChallengeSubmissionFilterDropdown({
  filter,
}: Props) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsChallengeSubmissionFilterState(filter.id);

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
    <Popover
      trigger={
        <FilterButton
          addonPosition="end"
          icon={RiArrowDownSLine}
          label={filter.label}
          selected={selectedOptions.length > 0}
          size="md"
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
  );
}
