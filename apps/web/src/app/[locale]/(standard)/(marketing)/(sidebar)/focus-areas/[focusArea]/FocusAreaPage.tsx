'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { FocusArea } from '~/data/focus-areas/FocusAreas';
import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';

import { countQuestionsTotalDurationMins } from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionListTitleSection from '~/components/questions/listings/headers/QuestionListTitleSection';
import QuestionsPlansList from '~/components/questions/listings/items/QuestionsPlansList';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  categorizeQuestionListSessionProgress,
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

type Props = Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  focusArea: FocusArea;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function FocusAreaPage({
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  focusArea,
}: Props) {
  const intl = useIntl();
  const { data: questionProgressParam } =
    trpc.questionProgress.getAll.useQuery();
  const { data: questionListsProgressParam } =
    trpc.questionLists.getSessionProgress.useQuery({ listKey: focusArea.type });

  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
  const questionsListsProgressAll = categorizeQuestionListSessionProgress(
    questionListsProgressParam,
  );

  const questionsOverallProgress = filterQuestionsProgressByList(
    questionsProgressAll,
    focusArea.questions,
  );
  const questionsSessionProgress = filterQuestionsProgressByList(
    questionsListsProgressAll,
    focusArea.questions,
  );

  const focusAreaTheme = getFocusAreaTheme(focusArea.type);
  const questionCount = countNumberOfQuestionsInList(focusArea.questions);

  const totalDuration = countQuestionsTotalDurationMins([
    ...codingQuestions,
    ...quizQuestions,
    ...systemDesignQuestions,
  ]);

  return (
    <div className="relative flex flex-col gap-y-12 py-6">
      <Container className="relative flex flex-col gap-y-5">
        <div>
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/prepare"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to dashboard',
              description: 'Link text to navigate to dashboard page',
              id: 'O8kIBQ',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <QuestionListTitleSection
          description={focusArea.description}
          icon={focusAreaTheme.iconOutline}
          questionCount={questionCount}
          questionListKey={focusArea.type}
          themeBackgroundClass={focusAreaTheme.gradient.className}
          title={focusArea.longName}
          totalDurationMins={totalDuration}
        />
      </Container>
      <Section>
        <Container className="pb-12">
          <QuestionsPlansList
            codingQuestions={codingQuestions}
            listKey={focusArea.type}
            overallProgress={questionsOverallProgress}
            quizQuestions={quizQuestions}
            sessionProgress={questionsSessionProgress}
            systemDesignQuestions={systemDesignQuestions}
          />
        </Container>
      </Section>
    </div>
  );
}
