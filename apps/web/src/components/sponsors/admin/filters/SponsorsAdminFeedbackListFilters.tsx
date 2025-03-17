import { debounce } from 'lodash-es';
import { useRef, useState } from 'react';
import { RiArrowDownSLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';

import CheckboxInput from '~/components/ui/CheckboxInput';
import DropdownMenu from '~/components/ui/DropdownMenu';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Popover from '~/components/ui/Popover';
import TextInput from '~/components/ui/TextInput';

import type {
  AdminSponsorsFeedbackSortField,
  FEEDBACK_STATUS,
  SponsorsAdminFilter,
} from '../types';

type Props = Readonly<{
  isAscendingOrder: boolean;
  query: string;
  selectedStatus: Array<FEEDBACK_STATUS>;
  setIsAscendingOrder: (value: boolean) => void;
  setQuery: (value: string) => void;
  setSortField: (value: AdminSponsorsFeedbackSortField) => void;
  sortField: AdminSponsorsFeedbackSortField;
  statusFilterOptions: SponsorsAdminFilter<FEEDBACK_STATUS>;
}>;

export default function SponsorsAdminFeedbacksListFilters({
  query,
  setQuery,
  statusFilterOptions,
  selectedStatus,
  sortField,
  setSortField,
  isAscendingOrder,
  setIsAscendingOrder,
}: Props) {
  const [searchQuery, setSearchQuery] = useState(query);
  const debouncedSearch = useRef(debounce((q) => setQuery(q), 500)).current;

  function makeDropdownItemProps(
    label: string,
    itemField: AdminSponsorsFeedbackSortField,
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
    <div className="flex flex-row flex-wrap gap-3 md:flex-col lg:flex-row">
      <div className="w-full flex-1 lg:w-auto">
        <TextInput
          isLabelHidden={true}
          label="Search"
          placeholder="Search by email"
          startIcon={RiSearchLine}
          type="text"
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            debouncedSearch(value);
          }}
        />
      </div>
      <Popover
        trigger={
          <FilterButton
            addonPosition="end"
            icon={RiArrowDownSLine}
            label="Status"
            selected={selectedStatus.length > 0}
            size="md"
          />
        }
        width="sm">
        <div className="flex flex-col gap-y-3">
          {statusFilterOptions.options.map((option) => (
            <div key={option.value} className="flex items-center">
              <CheckboxInput
                label={option.label}
                size="md"
                value={selectedStatus.includes(option.value)}
                onChange={() => statusFilterOptions.onChange(option.value)}
              />
            </div>
          ))}
        </div>
      </Popover>
      <DropdownMenu
        align="end"
        icon={RiSortDesc}
        showChevron={true}
        size="sm"
        trigger={
          <FilterButton
            icon={RiSortDesc}
            isLabelHidden={true}
            label="Sort by"
            selected={!(sortField === 'createdAt' && !isAscendingOrder)}
            size="sm"
            tooltip="Sort by"
          />
        }>
        {[
          makeDropdownItemProps('Email: A to Z', 'email', true),
          makeDropdownItemProps('Email: Z to A', 'email', false),
          makeDropdownItemProps(
            'Created at: Newest to Oldest',
            'createdAt',
            false,
          ),
          makeDropdownItemProps(
            'Created at: Oldest to Newest',
            'createdAt',
            true,
          ),
        ]
          .flatMap((item) => (item ? [item] : []))
          .map((props) => (
            <DropdownMenu.Item key={props.label} {...props} />
          ))}
      </DropdownMenu>
    </div>
  );
}
