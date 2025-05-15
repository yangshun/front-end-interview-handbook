import { debounce } from 'lodash-es';
import { useRef, useState } from 'react';
import { RiSearchLine, RiSortDesc } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { ProjectsChallengeSubmissionFilterOption } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import ProjectsChallengeSubmissionFilterDropdown from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterDropdown';
import ProjectsChallengeSubmissionFilterSlideOut from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterSlideOut';
import DropdownMenu from '~/components/ui/DropdownMenu';
import TextInput from '~/components/ui/TextInput';

import type { ProjectsChallengeSubmissionSortField } from '../../types';

type Props = Readonly<{
  filters: ReadonlyArray<ProjectsChallengeSubmissionFilterOption>;
  filterSize: number;
  isAscendingOrder: boolean;
  isViewerPremium: boolean;
  query: string;
  setIsAscendingOrder: (value: boolean) => void;
  setQuery: (value: string) => void;
  setSortField: (value: ProjectsChallengeSubmissionSortField) => void;
  sortField: ProjectsChallengeSubmissionSortField | null;
}>;

export default function ProjectsChallengeSubmissionFilters({
  filters,
  filterSize,
  isAscendingOrder,
  isViewerPremium,
  query,
  setIsAscendingOrder,
  setQuery,
  setSortField,
  sortField,
}: Props) {
  const intl = useIntl();
  const [searchQuery, setSearchQuery] = useState(query);

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
        setSortField(itemField);
        setIsAscendingOrder(isItemAscendingOrder);
      },
    };
  }

  const debouncedSearch = useRef(debounce((q) => setQuery(q), 500)).current;

  const sortAndFilterButton = (
    <>
      <ProjectsChallengeSubmissionFilterSlideOut
        isViewerPremium={isViewerPremium}
        selected={filterSize > 0}
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
              description: 'Sorting option for submissions list - recommended',
              id: 'tuK8wZ',
            }),
            'recommended',
            true,
          ),
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
            defaultMessage: 'Search by name/project brief',
            description: 'Challenge search placeholder',
            id: '8+eqIW',
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
      <div className="flex gap-3 md:hidden">{sortAndFilterButton}</div>
    </div>
  );
}
