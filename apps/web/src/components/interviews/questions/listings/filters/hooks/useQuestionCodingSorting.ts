import { useSessionStorage } from 'usehooks-ts';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionListTypeData } from '~/components/interviews/questions/common/questionHref';
import { questionListFilterNamespace } from '~/components/interviews/questions/common/questionHref';
import type { QuestionSortField } from '~/components/interviews/questions/common/QuestionsTypes';

type Props = Readonly<{
  listType?: QuestionListTypeData;
}>;

type QuestionSortFieldItem = Readonly<{
  field: QuestionSortField;
  isAscendingOrder: boolean;
}>;

export default function useQuestionCodingSorting({ listType }: Props) {
  const { userProfile } = useUserProfile();
  const filterNamespace = questionListFilterNamespace(listType);

  const [isAscendingOrder, setIsAscendingOrder] = useSessionStorage<boolean>(
    `gfe:${filterNamespace}:sort-order-ascending`,
    true,
  );
  const [sortField, setSortField] = useSessionStorage<QuestionSortField>(
    `gfe:${filterNamespace}:sort-field`,
    'default',
  );

  const baseSortFields: ReadonlyArray<QuestionSortFieldItem> = [
    { field: 'ranking', isAscendingOrder: true },
    {
      // If not study list, sort by difficulty
      field:
        sortField === 'default'
          ? listType?.value === 'study-list'
            ? 'default'
            : 'difficulty'
          : sortField,
      isAscendingOrder,
    },
  ];

  // Show free questions first if user is not a premium user
  const sortFields: ReadonlyArray<QuestionSortFieldItem> =
    baseSortFields.concat(
      userProfile?.isInterviewsPremium
        ? { field: 'premium', isAscendingOrder: true }
        : [],
    );

  return {
    filterNamespace,
    isAscendingOrder,
    setIsAscendingOrder,
    setSortField,
    sortField,
    sortFields,
  };
}
