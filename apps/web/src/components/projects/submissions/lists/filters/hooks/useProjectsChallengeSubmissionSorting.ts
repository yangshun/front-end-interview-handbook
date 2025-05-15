import { useState } from 'react';

import { useProjectsChallengeSubmissionFilterContext } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import type { ProjectsChallengeSubmissionSortField } from '~/components/projects/submissions/types';

export default function useProjectsChallengeSubmissionSorting() {
  const { getStringTypeSearchParams, updateSearchParams } =
    useProjectsChallengeSubmissionFilterContext();
  const initialSortField = getStringTypeSearchParams('sortField');
  const [isAscendingOrder, setIsAscendingOrder] = useState(
    getStringTypeSearchParams('sortOrder') === 'DESC' ? false : true,
  );
  const [sortField, setSortField] =
    useState<ProjectsChallengeSubmissionSortField>(
      initialSortField
        ? (initialSortField as ProjectsChallengeSubmissionSortField)
        : 'recommended',
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
