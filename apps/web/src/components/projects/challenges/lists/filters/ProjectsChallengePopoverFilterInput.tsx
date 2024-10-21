import { RiArrowDownSLine } from 'react-icons/ri';

import CheckboxInput from '~/components/ui/CheckboxInput';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Popover from '~/components/ui/Popover';

import type { ProjectsChallengeFilterDropdown } from '../ProjectsChallengeFilterContext';
import { useProjectsChallengeFilterState } from '../ProjectsChallengeFilterContext';

type Props = Readonly<{
  filter: ProjectsChallengeFilterDropdown;
}>;

export default function ProjectsChallengePopoverFilterInput({ filter }: Props) {
  const [selectedOptions, setSelectedOptions] = useProjectsChallengeFilterState(
    filter.id,
  );
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
      width={filter.width ?? 'sm'}>
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
