import clsx from 'clsx';
import { useState } from 'react';
import {
  RiCodeSSlashLine,
  RiFilterLine,
  RiFolderOpenLine,
  RiSearchLine,
  RiSortDesc,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import usePagination from '~/hooks/usePagination';

import FilterButton from '~/components/common/FilterButton';
import useProjectsChallengesFilters from '~/components/projects/challenges/lists/filters/hooks/useProjectsChallengesFilters';
import useProjectsChallengesSorting from '~/components/projects/challenges/lists/filters/hooks/useProjectsChallengesSorting';
import {
  filterProjectsChallenges,
  sortProjectsChallenges,
} from '~/components/projects/challenges/lists/filters/ProjectsChallengesProcessor';
import ProjectsChallengeGridList from '~/components/projects/challenges/lists/ProjectsChallengeGridList';
import type { ProjectsSortField } from '~/components/projects/types';
import DropdownMenu from '~/components/ui/DropdownMenu';
import EmptyState from '~/components/ui/EmptyState';
import Pagination from '~/components/ui/Pagination';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeTextColor, themeTextSecondaryColor } from '~/components/ui/theme';

import ProjectsChallengeFilterContextProvider, {
  useProjectsChallengeFilterContext,
} from './ProjectsChallengeFilterContext';
import ProjectsChallengeFilterSlideOut from './ProjectsChallengeFilterSlideOut';
import ProjectsListFilterDropdown from './ProjectsListFilterDropdown';
import type { ProjectsChallengeItem } from '../types';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
}>;

const ITEMS_PER_PAGE = 12;

function ProjectsChallengeGridListWithFiltersImpl({ challenges }: Props) {
  const intl = useIntl();
  const { filters, value: selectedFilters } =
    useProjectsChallengeFilterContext();
  // Filtering.
  const {
    query,
    onChangeQuery,
    filters: filtersChallengesOpts,
  } = useProjectsChallengesFilters();

  // Sorting.
  const { isAscendingOrder, setIsAscendingOrder, sortField, setSortField } =
    useProjectsChallengesSorting();

  const [areFiltersShown, setAreFiltersShown] = useState(false);

  // Processing.
  const sortedChallenges = sortProjectsChallenges(
    challenges,
    sortField,
    isAscendingOrder,
  );

  const processedChallenges = filterProjectsChallenges(
    sortedChallenges,
    filtersChallengesOpts.map(([_, filterFn]) => filterFn),
  );

  // Pagination
  const {
    currentPageItems: currentPageChallenges,
    totalPages,
    setCurrentPage,
    currentPage,
  } = usePagination(processedChallenges, ITEMS_PER_PAGE, [
    selectedFilters,
    query,
  ]);

  const numberOfFilters = filtersChallengesOpts.filter(
    ([size]) => size > 0,
  ).length;

  function makeDropdownItemProps(
    label: string,
    itemField: ProjectsSortField,
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

  return (
    <>
      <ProjectsChallengeFilterSlideOut
        isShown={areFiltersShown}
        onClose={() => {
          setAreFiltersShown(false);
        }}
      />
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 flex-wrap lg:flex-row flex-col">
          <div className="flex-1 w-full lg:w-auto">
            <TextInput
              isLabelHidden={true}
              label="Search"
              placeholder="Search by name/project brief"
              startIcon={RiSearchLine}
              type="text"
              value={query}
              onChange={onChangeQuery}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            {filters.map((filter) => (
              <ProjectsListFilterDropdown key={filter.id} filter={filter} />
            ))}
            <FilterButton
              icon={RiFilterLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'All filters',
                description: 'Label for All Filters button for projects list',
                id: 'i9ojv3',
              })}
              purpose="button"
              selected={numberOfFilters > 0}
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
              label={intl.formatMessage({
                defaultMessage: 'Sort by',
                description: 'Label for sorting button',
                id: 'vegaR1',
              })}>
              {[
                makeDropdownItemProps(
                  intl.formatMessage({
                    defaultMessage: 'Recommended',
                    description:
                      'Sorting option for projects list - recommended',
                    id: 'jp2HuK',
                  }),
                  'recommended',
                  true,
                ),
                makeDropdownItemProps(
                  intl.formatMessage({
                    defaultMessage: 'Popularity: Most to least completed',
                    description:
                      'Sorting option for projects list - popularity',
                    id: 'QTT/Vt',
                  }),
                  'completedCount',
                  false,
                ),
                makeDropdownItemProps(
                  intl.formatMessage({
                    defaultMessage: 'Popularity: Least to most completed',
                    description:
                      'Sorting option for projects list - popularity',
                    id: 'zMpEuy',
                  }),
                  'completedCount',
                  true,
                ),
                makeDropdownItemProps(
                  intl.formatMessage({
                    defaultMessage: 'Difficulty: Easy to Hard',
                    description:
                      'Sorting option for projects list - sort by difficulty from easy to hard',
                    id: 'DAQ8QM',
                  }),
                  'difficulty',
                  true,
                ),
                makeDropdownItemProps(
                  intl.formatMessage({
                    defaultMessage: 'Difficulty: Hard to Easy',
                    description:
                      'Sorting option for projects list - sort by difficulty from hard to easy',
                    id: 'tZPTnS',
                  }),
                  'difficulty',
                  false,
                ),
                makeDropdownItemProps(
                  intl.formatMessage({
                    defaultMessage: 'Created: Newest to oldest',
                    description:
                      'Sorting option for projects list - sort by created',
                    id: 'ufyNP1',
                  }),
                  'createdAt',
                  false,
                ),
                makeDropdownItemProps(
                  intl.formatMessage({
                    defaultMessage: 'Created: Oldest to newest',
                    description:
                      'Sorting option for projects list - sort by created',
                    id: '5bW/ye',
                  }),
                  'createdAt',
                  true,
                ),
              ].map((props) => (
                <DropdownMenu.Item key={props.label} {...props} />
              ))}
            </DropdownMenu>
          </div>
        </div>
        {currentPageChallenges.length === 0 ? (
          <div className="p-24">
            <EmptyState
              icon={RiFolderOpenLine}
              iconClassName={themeTextColor}
              subtitle={intl.formatMessage({
                defaultMessage:
                  "Adjust your filters a bit, and let's see what we can find!",
                description:
                  'Subtitle for empty state when no projects are returned from application of filters on projects list',
                id: '0ttv+M',
              })}
              title={intl.formatMessage({
                defaultMessage: 'Nothing found just yet',
                description:
                  'Title for empty state when application of filters return no results',
                id: 'SdYw31',
              })}
              variant="empty"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-y-4">
            <div className={clsx('flex items-center gap-2')}>
              <RiCodeSSlashLine
                className={clsx('size-4', themeTextSecondaryColor)}
              />
              <Text color="secondary" size="body3">
                <FormattedMessage
                  defaultMessage="{totalCount, plural, =0 {No projects} one {1 project} other {# projects}}"
                  description="Total number of projects"
                  id="jFG/qC"
                  values={{
                    totalCount: processedChallenges.length,
                  }}
                />
              </Text>
            </div>
            <ProjectsChallengeGridList challenges={currentPageChallenges} />
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-between items-center">
            <Text color="secondary" size="body3">
              <FormattedMessage
                defaultMessage="Showing {currentPageCount} out of {totalCount} projects"
                description="Projects listing label"
                id="qBygAh"
                values={{
                  currentPageCount: currentPageChallenges.length,
                  totalCount: processedChallenges.length,
                }}
              />
            </Text>
            <Pagination
              count={totalPages}
              page={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default function ProjectsChallengeGridListWithFilters({
  challenges,
}: Props) {
  return (
    <ProjectsChallengeFilterContextProvider>
      <ProjectsChallengeGridListWithFiltersImpl challenges={challenges} />
    </ProjectsChallengeFilterContextProvider>
  );
}
