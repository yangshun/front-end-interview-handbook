import type { ReactNode } from 'react';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionsCategorizedProgress } from '~/db/QuestionsUtils';

export default function InterviewsStudyListQuestions({
  overallProgress,
  questions,
  showCount_TEMPORARY,
  sideColumnAddOn,
  studyListKey,
}: Readonly<{
  overallProgress: QuestionsCategorizedProgress;
  questions: ReadonlyArray<QuestionMetadata>;
  showCount_TEMPORARY?: boolean;
  sideColumnAddOn?: ReactNode;
  studyListKey: string;
}>) {
  return (
    <div className="flex flex-col gap-y-6">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="All Practice Questions"
          description="Header for all practice questions section in study plans"
          id="zo65Ck"
        />
      </Heading>
      <Section>
        <QuestionsUnifiedListWithFiltersAndProgress
          checkIfCompletedQuestionBefore={(question) =>
            overallProgress[question.format].has(question.slug)
          }
          listMode="study-list"
          listType={{ type: 'study-list', value: studyListKey }}
          questions={questions}
          showCount_TEMPORARY={showCount_TEMPORARY}
          sideColumnAddOn={sideColumnAddOn}
        />
      </Section>
    </div>
  );
}
