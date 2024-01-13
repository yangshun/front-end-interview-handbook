import { useState } from 'react';
import { RiFilterLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import type { ProjectsChallengeSubmissionFilter } from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionFilterContext';
import ProjectsChallengeSubmissionFilterDropdown from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionFilterDropdown';
import ProjectsChallengeSubmissionFilterSlideOut from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionFilterSlideOut';
import DropdownMenu from '~/components/ui/DropdownMenu';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  filters: ReadonlyArray<ProjectsChallengeSubmissionFilter>;
  query: string;
  setQuery: (value: string) => void;
}>;

export default function ProjectsChallengeSubmissionFilters({
  query,
  setQuery,
  filters,
}: Props) {
  const intl = useIntl();
  const [areFiltersShown, setAreFiltersShown] = useState(false);

  const sortAndFilterButton = (
    <>
      <FilterButton
        icon={RiFilterLine}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'All filters',
          description: 'Label for All Filters button for projects list',
          id: 'i9ojv3',
        })}
        purpose="button"
        // Selected={numberOfFilters > 0}
        size="md"
        tooltip={intl.formatMessage({
          defaultMessage: 'View all filters',
          description: 'Tooltip for All Filters button for projects list',
          id: 'vHNURr',
        })}
        onClick={() => {
          setAreFiltersShown(true);
        }}
      />
      <DropdownMenu
        align="end"
        icon={RiSortDesc}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Sort by',
          description: 'Label for sorting button',
          id: 'vegaR1',
        })}
        showChevron={false}>
        <div>Sort</div>
      </DropdownMenu>
    </>
  );

  return (
    <>
      <ProjectsChallengeSubmissionFilterSlideOut
        isShown={areFiltersShown}
        onClose={() => {
          setAreFiltersShown(false);
        }}
      />
      <div className="flex gap-3 flex-wrap lg:flex-row md:flex-col flex-row">
        <div className="flex-1 w-full lg:w-auto">
          <TextInput
            isLabelHidden={true}
            label="Search"
            placeholder="Search by name/project brief"
            startIcon={RiSearchLine}
            type="text"
            value={query}
            onChange={(value) => setQuery(value)}
          />
        </div>
        <div className="gap-3 flex-wrap hidden md:flex">
          {filters
            .filter((filterItem) => filterItem.id !== 'component-track')
            .map((filter) => (
              <ProjectsChallengeSubmissionFilterDropdown
                key={filter.id}
                filter={filter}
              />
            ))}
          {sortAndFilterButton}
        </div>
        <div className="md:hidden flex gap-3">{sortAndFilterButton}</div>
      </div>
    </>
  );
}
