import { RiArrowDownSLine } from 'react-icons/ri';

import CheckboxInput from '~/components/ui/CheckboxInput';
import Popover from '~/components/ui/Popover';
import Tooltip from '~/components/ui/Tooltip';

import {
  type ProjectsContributionFilter,
  useProjectsContributionFilterState,
} from './ProjectsContributionFilterContext';

type Props = Readonly<{
  filter: ProjectsContributionFilter;
}>;

export default function ProjectsListFilterDropdown({ filter }: Props) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsContributionFilterState(filter.id);

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
    <Tooltip label={filter.tooltip}>
      <Popover
        icon={RiArrowDownSLine}
        label={filter.label}
        size="md"
        width="md">
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
    </Tooltip>
  );
}
