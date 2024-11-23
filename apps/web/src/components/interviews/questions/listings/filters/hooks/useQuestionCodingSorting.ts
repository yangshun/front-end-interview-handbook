import { useSessionStorage } from 'usehooks-ts';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionSortField } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/questionHref';
import { questionListFilterNamespace } from '~/components/interviews/questions/common/questionHref';

type Props = Readonly<{
  listType?: QuestionListTypeData;
}>;

export default function useQuestionCodingSorting({ listType }: Props) {
  const { userProfile } = useUserProfile();
  const filterNamespace = questionListFilterNamespace(listType);
  const defaultSortField: QuestionSortField =
    listType?.type === 'study-list' ? 'default' : 'difficulty';

  const [isAscendingOrder, setIsAscendingOrder] = useSessionStorage<boolean>(
    `gfe:${filterNamespace}:sort-order-ascending`,
    true,
  );
  const [sortField, setSortField] = useSessionStorage<QuestionSortField>(
    `gfe:${filterNamespace}:sort-field`,
    defaultSortField,
  );

  const baseSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [
    { field: 'ranking', isAscendingOrder: true },
    { field: sortField, isAscendingOrder },
  ];
  const premiumLastSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [{ field: 'premium', isAscendingOrder: true }];

  const sortFields = userProfile?.isInterviewsPremium
    ? baseSortFields
    : // Show free questions first if user is not a premium user.
      baseSortFields.concat(premiumLastSortFields);

  return {
    defaultSortField,
    filterNamespace,
    isAscendingOrder,
    setIsAscendingOrder,
    setSortField,
    sortField,
    sortFields,
  };
}
