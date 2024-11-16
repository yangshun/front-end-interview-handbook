'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

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
import InterviewsDashboardProgressSection from './progress/InterviewsDashboardProgressSection';
import { getDateRangeFromToday } from './progress/utils';
import { createStudyListMapFromArray } from '../questions/content/study-list/StudyListUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  companyGuides: Array<InterviewsStudyList>;
  defaultLoggedIn: boolean;
  focusAreas: ReadonlyArray<InterviewsStudyList>;
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
  studyPlans: ReadonlyArray<InterviewsStudyList>;
}>;

export default function InterviewsDashboardPage({
  companyGuides,
  defaultLoggedIn,
  studyPlans,
  questions,
  bottomContent,
  focusAreas,
}: Props) {
  const user = useUser();
  const isLoggedIn = defaultLoggedIn || !!user;
  const { data: questionsProgress } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: isLoggedIn,
    },
  );

  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: isLoggedIn,
    });

  const { data: guidesProgress } = trpc.guideProgress.getAll.useQuery(
    undefined,
    {
      enabled: isLoggedIn,
    },
  );
  const { startTime, endTime } = useMemo(() => getDateRangeFromToday(), []);
  const { data: contributions, isLoading: isContributionsLoading } =
    trpc.questionProgress.getContributionsCount.useQuery(
      {
        endTime,
        startTime,
      },
      {
        enabled: isLoggedIn,
      },
    );

  const sessions = questionListSessions ?? [];
  const showContinueLearning =
    questionListSessions != null && questionListSessions.length > 0;

  const studyListsMap = createStudyListMapFromArray([
    ...studyPlans,
    ...companyGuides,
    ...focusAreas,
  ]);

  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader
        contributions={contributions}
        isContributionsLoading={isContributionsLoading}
        isLoggedIn={isLoggedIn}
      />
      <Section>
        {isLoggedIn && (
          <InterviewsDashboardProgressSection
            contributions={contributions}
            questions={questions}
            questionsProgress={questionsProgress ?? []}
          />
        )}
        {showContinueLearning && (
          <>
            <InterviewsDashboardContinueLearningSection
              questionListSessions={sessions}
              studyListsMap={studyListsMap}
            />
            <Divider />
          </>
        )}
        <InterviewsDashboardRecommendedPreparationStrategy
          questionListSessions={sessions}
          questionsProgress={questionsProgress ?? []}
          recommendedPrepData={{
            blind75: {
              listKey: studyListsMap.blind75.slug,
              questionCount: studyListsMap.blind75?.questionHashes.length,
            },
            gfe75: {
              listKey: studyListsMap.gfe75?.slug ?? '',
              questionCount: studyListsMap.gfe75?.questionHashes.length,
            },
            systemDesignQuestionCount: questions.systemDesignQuestions.length,
          }}
        />
        <Divider />
        <InterviewsDashboardMoreLearningSection
          companyGuides={companyGuides}
          focusAreas={focusAreas}
          guidesProgress={guidesProgress ?? []}
          questionListSessions={sessions}
          questions={questions}
          questionsProgress={questionsProgress ?? []}
          studyPlans={studyPlans}
        />
        {bottomContent && (
          <>
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
          </>
        )}
      </Section>
    </div>
  );
}
