import { useState } from 'react';

import type { ProjectsSortField } from '~/components/projects/types';

export default function useProjectsChallengesSorting() {
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [sortField, setSortField] = useState<ProjectsSortField>('recommended');

  return {
    isAscendingOrder,
    setIsAscendingOrder,
    setSortField,
    sortField,
  };
}
