'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import {
  RiArrowLeftLine,
  RiQuestionnaireLine,
  RiTimerLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';
import type { PreparationPlan } from '~/data/plans/PreparationPlans';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsPageHeaderActions from '~/components/interviews/common/InterviewsPageHeaderActions';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionDifficulty,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import QuestionsLearningListPageTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListPageTitleSection';
import QuestionsLearningListTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListTitleSection';
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
  difficultySummary: Record<QuestionDifficulty, number>;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
  plan: PreparationPlan;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsStudyPlanPage({
  difficultySummary,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  plan,
  bottomContent,
  metadata,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const user = useUser();
  const canViewStudyPlans = userProfile?.isInterviewsPremium;

  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    { enabled: !!user },
  );

  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );

  const questionsOverallProgress = filterQuestionsProgressByList(
    questionsProgressAll,
    plan.questions,
  );

  const planTheme = getPreparationPlanTheme(plan.type);
  const questionCount = countNumberOfQuestionsInList(plan.questions);

  const features = [
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Curated by ex-interviewers',
        description: 'Features for study plans question listing',
        id: 'rJK/mv',
      }),
    },
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} solved practice questions',
          description: 'Features for study plans question listing',
          id: 'wVk78R',
        },
        { questionCount },
      ),
    },
    {
      icon: RiTimerLine,
      label: intl.formatMessage({
        defaultMessage: 'Time efficient',
        description: 'Features for study plans question listing',
        id: 'a3MONw',
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
            href="/study-plans"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to study plans',
              description: 'Link text to navigate to study plans page',
              id: 'fv+TLc',
            })}
            size="md"
            variant="tertiary"
          />
          {INTERVIEWS_REVAMP_2024 && (
            <InterviewsPageHeaderActions metadata={metadata} />
          )}
        </div>
        {INTERVIEWS_REVAMP_2024 ? (
          <>
            <QuestionsLearningListPageTitleSection
              description={plan.description}
              features={features}
              icon={planTheme.iconOutline}
              overallProgress={questionProgressParam ?? []}
              questions={[
                ...quizQuestions,
                ...codingQuestions,
                ...systemDesignQuestions,
              ]}
              questionsSessionKey={plan.type}
              themeBackgroundClass={planTheme.gradient.className}
              title={plan.longName}
            />
            <Divider />
          </>
        ) : (
          <QuestionsLearningListTitleSection
            description={plan.description}
            difficultySummary={difficultySummary}
            icon={planTheme.iconOutline}
            overallProgress={questionProgressParam ?? []}
            questionCount={questionCount}
            questionListKey={plan.type}
            questions={[
              ...quizQuestions,
              ...codingQuestions,
              ...systemDesignQuestions,
            ]}
            schedule={plan.schedule}
            themeBackgroundClass={planTheme.gradient.className}
            title={plan.longName}
          />
        )}
      </div>
      <Section>
        <div>
          {canViewStudyPlans ? (
            <QuestionsLearningList
              codingQuestions={codingQuestions}
              listKey={plan.type}
              overallProgress={questionsOverallProgress}
              quizQuestions={quizQuestions}
              showSummarySection={false}
              systemDesignQuestions={systemDesignQuestions}
            />
          ) : (
            <div className="relative">
              <div
                className="border-lg pointer-events-none touch-none select-none"
                // So that focus cannot go into the card, which is not meant to be used.
                {...{ inert: '' }}>
                <QuestionsList
                  checkIfCompletedQuestion={() => false}
                  questions={codingQuestions.slice(0, 5)}
                />
              </div>
              <div className={clsx('absolute bottom-0 top-0 w-full')}>
                <div
                  className={clsx(
                    'absolute bottom-0 top-0 w-full',
                    'bg-gradient-to-t from-white via-white dark:from-neutral-950 dark:via-neutral-950',
                  )}
                />
                <div className={clsx('absolute bottom-0 w-full px-8')}>
                  <QuestionPaywall
                    background={false}
                    subtitle={intl.formatMessage({
                      defaultMessage:
                        'Purchase premium to unlock full access to the study plans and all questions with high quality solutions',
                      description: 'Study plans paywall description',
                      id: 'KsoiBa',
                    })}
                    title={intl.formatMessage({
                      defaultMessage: 'Premium Study Plans',
                      description: 'Study plans paywall title',
                      id: 'tfonOP',
                    })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
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
