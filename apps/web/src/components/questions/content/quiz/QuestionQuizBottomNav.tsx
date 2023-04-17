import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import QuestionProgressAction from '~/components/questions/common/QuestionProgressAction';

import QuestionQuizPagination from './QuestionQuizPagination';
import type {
  QuestionQuiz,
  QuestionQuizMetadata,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  question: QuestionQuiz;
  questionList: ReadonlyArray<QuestionQuizMetadata>;
}>;

export default function QuestionQuizBottomNav({
  question,
  questionList,
}: Props) {
  const { data: questionProgress, isSuccess } =
    trpc.questionProgress.get.useQuery({ question: question.metadata });

  return (
    <div className="sticky inset-x-0 bottom-0">
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto py-2 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* HACK: code to centralize the items */}
            <div className="hidden w-32 items-center xl:block">
              <p className="font-medium text-slate-600">
                <span className="hidden">
                  <FormattedMessage
                    defaultMessage="Flashcard format"
                    description="Button label for flashcard display format of quiz questions"
                    id="ekSPPz"
                  />
                </span>
              </p>
            </div>
            <div
              className={clsx(
                'transition-colors xl:order-2',
                isSuccess ? 'opacity-100' : 'opacity-0',
              )}>
              <QuestionProgressAction
                question={question}
                questionProgress={questionProgress}
              />
            </div>
            <QuestionQuizPagination
              question={question}
              questionList={questionList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
