'use client';

import clsx from 'clsx';
import type {
  InterviewsLearningList,
  InterviewsListingBottomContent,
} from 'contentlayer/generated';
import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import type { PreparationPlans } from '~/data/plans/PreparationPlans';

import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Anchor from '~/components/ui/Anchor';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import InterviewsDashboardContinueLearningSection from './InterviewsDashboardContinueLearningSection';
import InterviewsDashboardMoreLearningSection from './InterviewsDashboardMoreLearningSection';
import InterviewsDashboardPageHeader from './InterviewsDashboardPageHeader';
import InterviewsDashboardRecommendedPreparationStrategy from './InterviewsDashboardRecommendedPreparationStrategy';
import InterviewsDashboardProgressAtGlanceSection from './progress-glance/InterviewsDashboardProgressAtGlanceSection';
import { getDateRangeFromToday } from './progress-glance/utils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  companyGuides: Array<InterviewsLearningList>;
  preparationPlans: PreparationPlans;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    frameworkQuestions: Record<
      QuestionFramework,
      ReadonlyArray<QuestionMetadata>
    >;
    languageQuestions: Record<
      QuestionLanguage,
      ReadonlyArray<QuestionMetadata>
    >;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
}>;

export default function InterviewsDashboardPage({
  companyGuides,
  preparationPlans,
  questions,
  bottomContent,
}: Props) {
  const user = useUser();
  const isLoggedIn = !!user;
  const { data: questionsProgress } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );

  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const { data: guidesProgress } = trpc.guideProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const { startTime, endTime } = useMemo(() => getDateRangeFromToday(), []);
  const { data: contributions } =
    trpc.questionProgress.getContributionsCount.useQuery(
      {
        endTime,
        startTime,
      },
      {
        enabled: !!user,
      },
    );

  const sessions = questionListSessions ?? [];
  const showContinueLearning =
    questionListSessions != null && questionListSessions.length > 0;

  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader contributions={contributions} />
      {isLoggedIn && (
        <InterviewsDashboardProgressAtGlanceSection
          contributions={contributions}
          questions={questions}
          questionsProgress={questionsProgress ?? []}
        />
      )}
      {showContinueLearning && (
        <InterviewsDashboardContinueLearningSection
          questionListSessions={sessions}
        />
      )}
      <InterviewsDashboardRecommendedPreparationStrategy />
      <InterviewsDashboardMoreLearningSection
        companyGuides={companyGuides}
        guidesProgress={guidesProgress ?? []}
        preparationPlans={preparationPlans}
        questionListSessions={sessions}
        questions={questions}
        questionsProgress={questionsProgress ?? []}
      />
      {bottomContent && (
        <Section>
          <Divider className="my-8" />
          <MDXContent
            components={{
              GuideLists: () => (
                <ul>
                  {companyGuides.map((guide) => (
                    <li key={guide.href}>
                      <Anchor href={guide.href}>
                        <FormattedMessage
                          defaultMessage="{name} front end interview questions"
                          description="Label for company guides"
                          id="pjH0jb"
                          values={{ name: guide.name }}
                        />
                      </Anchor>
                    </li>
                  ))}
                </ul>
              ),
            }}
            mdxCode={bottomContent.body.code}
          />
        </Section>
      )}
    </div>
  );
}
