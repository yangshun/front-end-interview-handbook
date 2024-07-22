'use client';

import clsx from 'clsx';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { FocusArea } from '~/data/focus-areas/FocusAreas';
import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import QuestionsLearningListTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListTitleSection';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  categorizeQuestionListSessionProgress,
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  focusArea: FocusArea;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsFocusAreaPage({
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  focusArea,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const { data: questionListsProgressParam } =
    trpc.questionLists.getSessionProgress.useQuery(
      { listKey: focusArea.type },
      {
        enabled: !!user,
      },
    );

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

  return (
    <div
      className={clsx(
        'flex flex-col gap-y-12',
        'py-4 md:py-6 lg:py-8 xl:py-16',
        'relative',
      )}>
      <Container className="relative flex flex-col gap-y-5">
        <div>
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/focus-areas"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to focus areas',
              description: 'Link text to navigate to focus areas list page',
              id: 'PHhUwD',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <QuestionsLearningListTitleSection
          description={focusArea.description}
          icon={focusAreaTheme.iconOutline}
          progressTrackingAvailableToNonPremiumUsers={true}
          questionCount={questionCount}
          questionListKey={focusArea.type}
          themeBackgroundClass={focusAreaTheme.gradient.className}
          title={focusArea.longName}
        />
      </Container>
      <Section>
        <Container className="pb-12">
          <QuestionsLearningList
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
