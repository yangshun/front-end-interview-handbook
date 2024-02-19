import { debounce } from 'lodash-es';
import { useRef, useState } from 'react';
import { RiFilterLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import type { ProjectsChallengeSubmissionFilter } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import ProjectsChallengeSubmissionFilterDropdown from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterDropdown';
import ProjectsChallengeSubmissionFilterSlideOut from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterSlideOut';
import DropdownMenu from '~/components/ui/DropdownMenu';
import TextInput from '~/components/ui/TextInput';

import type { ProjectsChallengeSubmissionSortField } from '../../types';

type Props = Readonly<{
  filterSize: number;
  filters: ReadonlyArray<ProjectsChallengeSubmissionFilter>;
  isAscendingOrder: boolean;
  query: string;
  setIsAscendingOrder: (value: boolean) => void;
  setQuery: (value: string) => void;
  setSortField: (value: ProjectsChallengeSubmissionSortField) => void;
  sortField: ProjectsChallengeSubmissionSortField | null;
}>;

export default function ProjectsChallengeSubmissionFilters({
  query,
  setQuery,
  filters,
  filterSize,
  sortField,
  isAscendingOrder,
  setIsAscendingOrder,
  setSortField,
}: Props) {
  const intl = useIntl();
  const [searchQuery, setSearchQuery] = useState(query);
  const [areFiltersShown, setAreFiltersShown] = useState(false);

  function makeDropdownItemProps(
    label: string,
    itemField: ProjectsChallengeSubmissionSortField,
    isItemAscendingOrder: boolean,
  ) {
    return {
      isSelected:
        sortField === itemField && isAscendingOrder === isItemAscendingOrder,
      label,
      onClick: () => {
        setSortField(itemField), setIsAscendingOrder(isItemAscendingOrder);
      },
    };
  }

  const debouncedSearch = useRef(debounce((q) => setQuery(q), 500)).current;

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
        selected={filterSize > 0}
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
        showChevron={false}
        size="md">
        {[
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Popularity: Most to least upvotes',
              description: 'Sorting option for submissions list - popularity',
              id: '2sBv9j',
            }),
            'votes',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Popularity: Least to most upvotes',
              description: 'Sorting option for submissions list - popularity',
              id: 'T8giXw',
            }),
            'votes',
            true,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Difficulty: Easy to Hard',
              description:
                'Sorting option for submissions list - sort by difficulty from easy to hard',
              id: 'zEnL8r',
            }),
            'difficulty',
            true,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Difficulty: Hard to Easy',
              description:
                'Sorting option for submissions list - sort by difficulty from hard to easy',
              id: 'QxlS4d',
            }),
            'difficulty',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Created: Newest to oldest',
              description: 'Sorting option for projects list - sort by created',
              id: 'ufyNP1',
            }),
            'createdAt',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Created: Oldest to newest',
              description: 'Sorting option for projects list - sort by created',
              id: '5bW/ye',
            }),
            'createdAt',
            true,
          ),
        ].map((props) => (
          <DropdownMenu.Item key={props.label} {...props} />
        ))}
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
      <div className="flex flex-wrap flex-row md:flex-col lg:flex-row gap-3">
        <div className="flex-1 w-full lg:w-auto">
          <TextInput
            isLabelHidden={true}
            label="Search"
            placeholder="Search by name/project brief"
            startIcon={RiSearchLine}
            type="text"
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              debouncedSearch(value);
            }}
          />
        </div>
        <div className="hidden md:flex flex-wrap gap-3">
          {filters
            .filter((filterItem) => filterItem.view === 'both')
            .map((filter) => (
              <ProjectsChallengeSubmissionFilterDropdown
                key={filter.id}
                filter={filter}
              />
            ))}
          {sortAndFilterButton}
        </div>
        <div className="flex gap-3 md:hidden ">{sortAndFilterButton}</div>
      </div>
    </>
  );
}
