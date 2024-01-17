import { useState } from 'react';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

import type { ProjectsChallengeSubmissionSortField } from '~/components/projects/submissions/types';

export default function useProjectsChallengeSubmissionSorting() {
  const { updateSearchParams, getStringTypeSearchParams } =
    useFilterSearchParams();
  const initialSortFiled = getStringTypeSearchParams('sortField');
  const [isAscendingOrder, setIsAscendingOrder] = useState(
    getStringTypeSearchParams('sortOrder') === 'DESC' ? false : true,
  );
  const [sortField, setSortField] =
    useState<ProjectsChallengeSubmissionSortField | null>(
      initialSortFiled
        ? (initialSortFiled as ProjectsChallengeSubmissionSortField)
        : null,
    );
  const onChangeIsAscendingOrder = (value: boolean) => {
    updateSearchParams('sortOrder', value ? 'ASC' : 'DESC');
    setIsAscendingOrder(value);
  };
  const onChangeSortField = (value: ProjectsChallengeSubmissionSortField) => {
    updateSearchParams('sortField', value);
    setSortField(value);
  };

  return {
    isAscendingOrder,
    setIsAscendingOrder: onChangeIsAscendingOrder,
    setSortField: onChangeSortField,
    sortField,
  };
}
