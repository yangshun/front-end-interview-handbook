import clsx from 'clsx';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import { themeBackgroundColor, themeBorderColor } from '~/components/ui/theme';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import QuestionQuizPagination from './QuestionQuizPagination';
import type {
  QuestionMetadata,
  QuestionQuiz,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  question: QuestionQuiz;
  questionList: ReadonlyArray<QuestionMetadata>;
  studyList?: Readonly<{ listKey: string; name: string }>;
}>;

export default function QuestionQuizBottomNav({
  question,
  questionList,
  studyList,
}: Props) {
  const { data: questionProgress, isSuccess } = useQueryQuestionProgress(
    question.metadata,
  );

  return (
    <div className="sticky inset-x-0 bottom-0">
      <div className={clsx('border-t', themeBorderColor, themeBackgroundColor)}>
        <div className="mx-auto px-3 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="hidden w-32 items-center xl:block" />
            <div
              className={clsx(
                'transition-colors xl:order-2',
                isSuccess ? 'opacity-100' : 'opacity-0',
              )}>
              <QuestionProgressAction
                listKey={studyList?.listKey}
                metadata={question.metadata}
                questionProgress={questionProgress}
              />
            </div>
            <QuestionQuizPagination
              question={question}
              questionList={questionList}
              studyList={studyList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
