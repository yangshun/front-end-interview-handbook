import { useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

type Props = Readonly<{
  namespace?: string;
}>;

export default function useQuestionSearchFilter({
  namespace,
}: Props): [string, (value: string) => void] {
  const [querySessionStorage, setQuerySessionStorage] = useSessionStorage(
    `gfe:${namespace}:search-filter`,
    '',
  );
  const [queryState, setQueryState] = useState('');

  // Conditionally select which hook's state to use
  const query = namespace ? querySessionStorage : queryState;
  const setQuery = namespace ? setQuerySessionStorage : setQueryState;

  return [query, setQuery];
}
