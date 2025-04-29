import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { useQuestionFormatsData } from '~/data/QuestionCategories';

import type { InterviewsQuestionItemMinimal } from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsTotalDurationMins } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/items/useQuestionsWithCompletionStatus';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '~/components/interviews/questions/metadata/QuestionTotalTimeLabel';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

type Props = Readonly<{
  questions: {
    codingQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
    quizQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
    systemDesignQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  };
}>;

const MAX_TO_SHOW = 10;

export default function InterviewsDashboardPracticeQuestionsPreviewQuestionsList({
  questions,
}: Props) {
  const intl = useIntl();
  const formats = useQuestionFormatsData();
  const [selectedCategory, setSelectedCategory] = useState<
    'coding' | 'quiz' | 'system-design'
  >('coding');

  const categoryQuestions =
    selectedCategory === 'coding'
      ? questions.codingQuestions
      : selectedCategory === 'quiz'
        ? questions.quizQuestions
        : questions.systemDesignQuestions;

  const previewQuestions = categoryQuestions.slice(0, MAX_TO_SHOW);
  const questionsWithCompletionStatus =
    useQuestionsWithCompletionStatus(previewQuestions);

  const totalDurationMins = countQuestionsTotalDurationMins(categoryQuestions);
  const listMetadata = (
    <div className="flex gap-x-4 sm:gap-x-10">
      <QuestionCountLabel count={categoryQuestions.length} showIcon={true} />
      {totalDurationMins > 0 && (
        <QuestionTotalTimeLabel mins={totalDurationMins} showIcon={true} />
      )}
    </div>
  );

  const categoryTabs = (
    <TabsUnderline
      size="sm"
      tabs={[
        {
          label: intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          }),
          value: 'coding',
        },
        {
          label: formats['system-design'].label,
          value: formats['system-design'].value,
        },
        {
          label: formats.quiz.label,
          value: formats.quiz.value,
        },
      ]}
      value={selectedCategory}
      onSelect={setSelectedCategory}
    />
  );

  return (
    <div className="flex flex-col gap-6">
      {categoryTabs}
      <div className="flex flex-col gap-4">
        {listMetadata}
        <div className="relative">
          <QuestionsList
            checkIfCompletedQuestion={(question) => question.isCompleted}
            questions={questionsWithCompletionStatus}
            showOverlayAtLastItem={true}
          />
          <div className={clsx('absolute bottom-10 left-1/2 -translate-x-1/2')}>
            <Button
              href={
                selectedCategory === 'coding'
                  ? '/questions'
                  : selectedCategory === 'quiz'
                    ? `/questions/${formats.quiz.value}`
                    : `/questions/${formats['system-design'].value}`
              }
              icon={RiArrowRightLine}
              label={intl.formatMessage(
                {
                  defaultMessage: 'See all {questionCount} practice questions',
                  description: 'Label for see all practice questions button',
                  id: 'enDTfj',
                },
                {
                  questionCount: categoryQuestions.length,
                },
              )}
              prefetch={null}
              size="md"
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
