import { useState } from 'react';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

import type { ProjectsSortField } from '~/components/projects/types';

export default function useProjectsChallengesSorting() {
  const { updateSearchParams, getStringTypeSearchParams } =
    useFilterSearchParams();
  const [isAscendingOrder, setIsAscendingOrder] = useState(
    getStringTypeSearchParams('sortOrder') === 'ASC',
  );
  const [sortField, setSortField] = useState<ProjectsSortField>(
    (getStringTypeSearchParams('sortField') as ProjectsSortField | null) ??
      'recommended',
  );

  function onChangeIsAscendingOrder(value: boolean) {
    updateSearchParams('sortOrder', value ? 'ASC' : 'DESC');
    setIsAscendingOrder(value);
  }

  function onChangeSortField(value: ProjectsSortField) {
    updateSearchParams('sortField', value);
    setSortField(value);
  }

  return {
    isAscendingOrder,
    setIsAscendingOrder: onChangeIsAscendingOrder,
    setSortField: onChangeSortField,
    sortField,
  };
}
