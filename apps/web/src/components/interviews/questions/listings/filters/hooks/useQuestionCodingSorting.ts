import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import { questionListFilterNamespace } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionListTypeData,
  QuestionSortField,
} from '~/components/interviews/questions/common/QuestionsTypes';

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

  const [isAscendingOrder, setIsAscendingOrder] = useGreatStorageLocal<boolean>(
    `qns:${filterNamespace}:sort:ascending`,
    true,
    {
      ttl: 24 * 60 * 60,
    },
  );
  const [sortField, setSortField] = useGreatStorageLocal<QuestionSortField>(
    `qns:${filterNamespace}:sort:field`,
    'default',
    {
      ttl: 24 * 60 * 60,
    },
  );

  const baseSortFields: ReadonlyArray<QuestionSortFieldItem> =
    sortField === 'default'
      ? listType?.type === 'study-list'
        ? [
            {
              field: 'default',
              isAscendingOrder,
            },
          ]
        : [
            { field: 'ranking', isAscendingOrder: true },
            {
              field: 'difficulty',
              isAscendingOrder,
            },
          ]
      : [
          { field: 'ranking', isAscendingOrder: true },
          {
            field: sortField,
            isAscendingOrder,
          },
        ];

  // Show free questions first if user is not a premium user
  const sortFields: ReadonlyArray<QuestionSortFieldItem> =
    baseSortFields.concat(
      !userProfile?.isInterviewsPremium
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
