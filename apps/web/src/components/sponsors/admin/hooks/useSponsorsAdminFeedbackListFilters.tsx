import { useQueryState } from 'nuqs';

import type {
  AdminSponsorsFeedbackSortField,
  FEEDBACK_STATUS,
  SponsorsAdminFilter,
} from '../types';

export default function useSponsorsAdminFeedbackListFilters() {
  const [query, setQuery] = useQueryState('query', { defaultValue: '' });
  const [selectedStatus, setSelectedStatus] = useQueryState<
    Array<FEEDBACK_STATUS>
  >('resolved', {
    defaultValue: [],
    parse: (value) =>
      value ? (value.split(',') as Array<FEEDBACK_STATUS>) : [],
    serialize: (value) => value.map((v) => String(v)).join(','),
  });
  const [isAscendingOrder, setIsAscendingOrder] = useQueryState('order', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => String(value),
  });

  const [sortField, setSortField] =
    useQueryState<AdminSponsorsFeedbackSortField>('sortField', {
      defaultValue: 'createdAt',
      parse: (value) =>
        (value as AdminSponsorsFeedbackSortField) || 'createdAt',
      serialize: (value) => value,
    });

  const statusFilterOptions: SponsorsAdminFilter<FEEDBACK_STATUS> = {
    id: 'resolved',
    name: 'Status',
    onChange: (value) => {
      const newStatuses = new Set(selectedStatus);

      selectedStatus.includes(value)
        ? newStatuses.delete(value)
        : newStatuses.add(value);
      setSelectedStatus(Array.from(newStatuses));
    },
    onClear: () => {
      setSelectedStatus([]);
    },
    options: [
      { label: 'Resolved', value: 'RESOLVED' },
      { label: 'Unresolved', value: 'UNRESOLVED' },
    ],
  };

  function onChangeQuery(value: string) {
    setQuery(value);
  }

  return {
    isAscendingOrder,
    onChangeQuery,
    query,
    selectedStatus,
    setIsAscendingOrder,
    setSortField,
    sortField,
    statusFilterOptions,
  };
}
