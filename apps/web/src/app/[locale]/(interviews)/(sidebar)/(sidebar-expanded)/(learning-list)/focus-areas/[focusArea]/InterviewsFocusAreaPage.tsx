'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import {
  RiArrowLeftLine,
  RiQuestionnaireLine,
  RiTimerLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';
import type { FocusArea } from '~/data/focus-areas/FocusAreas';
import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import QuestionsLearningListPageTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListPageTitleSection';
import QuestionsLearningListTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListTitleSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
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
  bottomContent,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );

  const questionsOverallProgress = filterQuestionsProgressByList(
    questionsProgressAll,
    focusArea.questions,
  );
  const focusAreaTheme = getFocusAreaTheme(focusArea.type);
  const questionCount = countNumberOfQuestionsInList(focusArea.questions);

  const features = [
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} solved practice questions',
          description: 'Features for focus areas question listing',
          id: 'DthPOl',
        },
        { questionCount },
      ),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Curated by ex-interviewers',
        description: 'Features for focus areas question listing',
        id: '0/Rv7O',
      }),
    },

    {
      icon: RiTimerLine,
      label: intl.formatMessage({
        defaultMessage: 'Time efficient',
        description: 'Features for focus areas question listing',
        id: 'nyYJ7j',
      }),
    },
  ];

  return (
    <Container className={clsx('flex flex-col gap-y-12', 'py-12', 'relative')}>
      <div className="relative flex flex-col gap-y-8">
        <div className="flex items-center justify-between gap-2">
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
        {INTERVIEWS_REVAMP_2024 ? (
          <>
            <QuestionsLearningListPageTitleSection
              description={focusArea.description}
              features={features}
              icon={focusAreaTheme.iconOutline}
              overallProgress={questionProgressParam ?? []}
              questions={[
                ...quizQuestions,
                ...codingQuestions,
                ...systemDesignQuestions,
              ]}
              questionsSessionKey={focusArea.type}
              themeBackgroundClass={focusAreaTheme.gradient.className}
              title={focusArea.longName}
            />
            <Divider />
          </>
        ) : (
          <QuestionsLearningListTitleSection
            description={focusArea.description}
            icon={focusAreaTheme.iconOutline}
            overallProgress={questionProgressParam ?? []}
            progressTrackingAvailableToNonPremiumUsers={true}
            questionCount={questionCount}
            questionListKey={focusArea.type}
            questions={[
              ...codingQuestions,
              ...quizQuestions,
              ...systemDesignQuestions,
            ]}
            themeBackgroundClass={focusAreaTheme.gradient.className}
            title={focusArea.longName}
          />
        )}
      </div>
      <Section>
        <QuestionsLearningList
          codingQuestions={codingQuestions}
          listKey={focusArea.type}
          overallProgress={questionsOverallProgress}
          quizQuestions={quizQuestions}
          systemDesignQuestions={systemDesignQuestions}
        />
      </Section>

      {bottomContent && (
        <>
          <Divider className="my-8" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </Container>
  );
}
