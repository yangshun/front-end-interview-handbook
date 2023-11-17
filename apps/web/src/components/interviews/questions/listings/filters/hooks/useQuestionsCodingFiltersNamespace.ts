import { useEffect } from 'react';
import { useSessionStorage } from 'usehooks-ts';

export const QuestionsCodingFiltersNamespaceKey =
  'gfe:interview:coding:filters-namespace';

export default function useQuestionsCodingFiltersNamespace(namespace: string) {
  const [, setNamespace] = useSessionStorage(
    QuestionsCodingFiltersNamespaceKey,
    namespace,
  );

  useEffect(() => {
    setNamespace(namespace);
  }, [namespace, setNamespace]);
}
