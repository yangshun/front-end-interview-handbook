import { useState } from 'react';

import type { ProjectsChallengeSubmissionSortField } from '~/components/projects/submissions/types';

export default function useProjectsChallengeSubmissionSorting() {
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [sortField, setSortField] =
    useState<ProjectsChallengeSubmissionSortField | null>(null);

  return {
    isAscendingOrder,
    setIsAscendingOrder,
    setSortField,
    sortField,
  };
}
