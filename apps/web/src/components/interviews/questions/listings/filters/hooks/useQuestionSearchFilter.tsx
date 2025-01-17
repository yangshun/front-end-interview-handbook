import { useState } from 'react';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

type Props = Readonly<{
  namespace?: string;
}>;

export default function useQuestionSearchFilter({
  namespace,
}: Props): [string, (value: string) => void] {
  const [querySessionStorage, setQuerySessionStorage] = useGreatStorageLocal(
    `qns:${namespace}:filter:search`,
    '',
    {
      ttl: 24 * 60 * 60,
    },
  );
  const [queryState, setQueryState] = useState('');

  // Conditionally select which hook's state to use
  const query = namespace ? querySessionStorage : queryState;
  const setQuery = namespace ? setQuerySessionStorage : setQueryState;

  return [query, setQuery];
}
