import { useQueryState } from 'nuqs';

import type {
  AdminSponsorsAdRequestSortField,
  SponsorsAdminFilter,
} from '../types';

import type { SponsorsAdRequestStatus } from '@prisma/client';

export default function useSponsorsAdminAdRequestFilters() {
  const [query, setQuery] = useQueryState('query', { defaultValue: '' });

  const [selectedStatus, setSelectedStatus] = useQueryState<
    Array<SponsorsAdRequestStatus>
  >('status', {
    defaultValue: [],
    parse: (value) =>
      value ? (value.split(',') as Array<SponsorsAdRequestStatus>) : [],
    serialize: (value) => value.join(','),
  });

  const [isAscendingOrder, setIsAscendingOrder] = useQueryState('order', {
    defaultValue: true,
    parse: (value) => value === 'true',
    serialize: (value) => String(value),
  });

  const [sortField, setSortField] =
    useQueryState<AdminSponsorsAdRequestSortField>('sortField', {
      defaultValue: 'createdAt',
      parse: (value) =>
        (value as AdminSponsorsAdRequestSortField) || 'createdAt',
      serialize: (value) => value,
    });

  const statusFilterOptions: SponsorsAdminFilter<SponsorsAdRequestStatus> = {
    id: 'status',
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
      { label: 'Pending', value: 'PENDING' },
      { label: 'Approved', value: 'APPROVED' },
      { label: 'Rejected', value: 'REJECTED' },
      { label: 'Published', value: 'PUBLISHED' },
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
