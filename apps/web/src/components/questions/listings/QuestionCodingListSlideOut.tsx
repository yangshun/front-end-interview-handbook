import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import EmptyState from '~/components/ui/EmptyState';
import SlideOut from '~/components/ui/SlideOut';
import Spinner from '~/components/ui/Spinner';

import { useQueryQuestionListCoding } from '~/db/QuestionsListQuery';
import { hasCompletedQuestion, hashQuestion } from '~/db/QuestionsUtils';

import QuestionsCodingListBrief from './QuestionsCodingListBrief';
import { sortQuestionsMultiple } from '../common/QuestionsProcessor';
import type { QuestionSortField } from '../common/QuestionsTypes';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
}>;

function Contents() {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const {
    isLoading,
    data: codingQuestions,
    isSuccess,
  } = useQueryQuestionListCoding();
  const { data: questionProgress } = trpc.questionProgress.getAll.useQuery();
  const completedQuestions = new Set(
    (questionProgress ?? []).map(({ format, slug }) =>
      hashQuestion(format, slug),
    ),
  );
  const defaultSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [
    { field: 'ranking', isAscendingOrder: true },
    { field: 'difficulty', isAscendingOrder: true },
  ];
  const premiumSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [{ field: 'premium', isAscendingOrder: true }];

  return (
    <div className="p-4">
      {(() => {
        if (isLoading) {
          return (
            <div className="py-8">
              <Spinner display="block" size="md" />
            </div>
          );
        }

        if (!isSuccess) {
          return (
            <EmptyState
              title={intl.formatMessage({
                defaultMessage: 'Failed to load coding questions',
                description: 'Error message when the questions failed to load',
                id: 'HHJYxM',
              })}
              variant="error"
            />
          );
        }

        const sortedQuestions = sortQuestionsMultiple(
          codingQuestions,
          userProfile?.isPremium
            ? defaultSortFields
            : // Show free questions first if user is not a premium user.
              defaultSortFields.concat(premiumSortFields),
        );

        return (
          <QuestionsCodingListBrief
            checkIfCompletedQuestion={(question) =>
              hasCompletedQuestion(completedQuestions, question)
            }
            questions={sortedQuestions}
          />
        );
      })()}
    </div>
  );
}

export default function QuestionCodingListSlideOut({
  isShown,
  onClose,
}: Props) {
  const intl = useIntl();

  return (
    <SlideOut
      enterFrom="start"
      isShown={isShown}
      size="xl"
      title={intl.formatMessage({
        defaultMessage: 'Coding Questions',
        description:
          'Label for button that opens slideout of question list on coding workspace',
        id: 'oXHJcG',
      })}
      onClose={onClose}>
      {isShown && <Contents />}
    </SlideOut>
  );
}
