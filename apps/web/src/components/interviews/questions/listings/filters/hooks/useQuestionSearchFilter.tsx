import { useSessionStorage } from 'usehooks-ts';

type Props = Readonly<{
  namespace: string;
}>;

export default function useQuestionSearchFilter({ namespace }: Props) {
  return useSessionStorage(`gfe:${namespace}:search-filter`, '');
}
