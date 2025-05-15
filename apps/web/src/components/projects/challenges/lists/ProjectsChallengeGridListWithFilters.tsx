import clsx from 'clsx';
import { debounce } from 'lodash-es';
import { useRef, useState } from 'react';
import {
  RiCodeSSlashLine,
  RiFolderOpenLine,
  RiSearchLine,
  RiSortDesc,
} from 'react-icons/ri';

import usePagination from '~/hooks/usePagination';

import { FormattedMessage, useIntl } from '~/components/intl';
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

import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';
import type { ProjectsChallengeItem } from '../types';
import ProjectsChallengeFilterContextProvider, {
  useProjectsChallengeFilterContext,
} from './ProjectsChallengeFilterContext';
import ProjectsChallengeFilterSlideOut from './ProjectsChallengeFilterSlideOut';
import ProjectsChallengeListFilter from './ProjectsChallengeListFilter';

const ITEMS_PER_PAGE = 18;

function ProjectsChallengeGridListWithFiltersImpl({
  challenges,
  isViewerPremium,
}: Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  isViewerPremium: boolean;
}>) {
  const intl = useIntl();
  const [searchQuery, setSearchQuery] = useState('');
  const {
    filterItems,
    getStringTypeSearchParams,
    updateSearchParams,
    value: selectedFilters,
  } = useProjectsChallengeFilterContext();
  // Filtering.
  const {
    filters: filtersChallengesOpts,
    onChangeQuery,
    query,
  } = useProjectsChallengesFilters();

  // Sorting.
  const { isAscendingOrder, setIsAscendingOrder, setSortField, sortField } =
    useProjectsChallengesSorting();

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
    currentPage,
    currentPageItems: currentPageChallenges,
    setCurrentPage,
    totalPages,
  } = usePagination({
    deps: [selectedFilters, query, sortField, isAscendingOrder],
    itemsPerPage: ITEMS_PER_PAGE,
    page: Number(getStringTypeSearchParams('page')) || 1,
    totalList: processedChallenges,
    updateSearchParams,
    updateSearchParamsRequired: true,
  });

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
        setSortField(itemField);
        setIsAscendingOrder(isItemAscendingOrder);
      },
    };
  }

  const sortAndFilterButton = (
    <>
      <ProjectsChallengeFilterSlideOut
        isViewerPremium={isViewerPremium}
        selected={numberOfFilters > 0}
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
        size="md"
        tooltip={intl.formatMessage({
          defaultMessage: 'Sort by',
          description: 'Tooltip for sort by button',
          id: '/AeOrt',
        })}>
        {[
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Recommended',
              description: 'Sorting option for projects list - recommended',
              id: 'jp2HuK',
            }),
            'recommended',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Popularity: Most to least completed',
              description: 'Sorting option for projects list - popularity',
              id: 'QTT/Vt',
            }),
            'completedCount',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Popularity: Least to most completed',
              description: 'Sorting option for projects list - popularity',
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

  const debouncedSearch = useRef(
    debounce((q) => onChangeQuery(q), 500),
  ).current;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row flex-wrap gap-3 md:flex-col lg:flex-row">
        <div className="w-full flex-1 lg:w-auto">
          <TextInput
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Search',
              description: 'Search input label',
              id: 'Z30bjj',
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search by challenge name / brief',
              description: 'Search placeholder for challenge listing',
              id: '+gMPfE',
            })}
            startIcon={RiSearchLine}
            type="text"
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              debouncedSearch(value);
            }}
          />
        </div>
        <div className="hidden flex-wrap gap-3 md:flex">
          {filterItems
            .filter((filterItem) =>
              isViewerPremium ? true : !filterItem.premium,
            )
            .map((filterItem) => (
              <ProjectsChallengeListFilter
                key={filterItem.id}
                filter={filterItem}
              />
            ))}
          {sortAndFilterButton}
        </div>
        <div className="flex gap-3 md:hidden">{sortAndFilterButton}</div>
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
                defaultMessage="{totalCount, plural, =0 {No challenges} one {1 challenge} other {# challenges}}"
                description="Total number of challenges"
                id="BWcVlu"
                values={{
                  totalCount: processedChallenges.length,
                }}
              />
            </Text>
          </div>
          <ProjectsChallengeGridList
            challenges={currentPageChallenges}
            isViewerPremium={isViewerPremium}
          />
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="Showing {currentPageCount} out of {totalCount} challenges"
              description="Projects challenge pagination label"
              id="75oHxG"
              values={{
                currentPageCount: currentPageChallenges.length,
                totalCount: processedChallenges.length,
              }}
            />
          </Text>
          <Pagination
            count={totalPages}
            page={currentPage}
            onPageChange={(value) => {
              setCurrentPage(value);
              updateSearchParams('page', value.toString());
            }}
          />
        </div>
      )}
    </div>
  );
}

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  isViewerPremium: boolean;
  tracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsChallengeGridListWithFilters({
  challenges,
  isViewerPremium,
  tracks,
}: Props) {
  return (
    <ProjectsChallengeFilterContextProvider tracks={tracks}>
      <ProjectsChallengeGridListWithFiltersImpl
        challenges={challenges}
        isViewerPremium={isViewerPremium}
      />
    </ProjectsChallengeFilterContextProvider>
  );
}
