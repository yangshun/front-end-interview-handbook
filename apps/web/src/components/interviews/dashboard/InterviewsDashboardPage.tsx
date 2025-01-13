'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import { useGuidesData } from '~/data/Guides';

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

import {
  getGuideCompletionCount,
  getLatestDate,
} from '~/db/guides/GuidesUtils';
import { categorizeQuestionsProgress } from '~/db/QuestionsUtils';

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
  companyGuides: ReadonlyArray<
    InterviewsStudyList & Readonly<{ questionCount: number }>
  >;
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
  const { data: questionsProgress, isLoading: isQuestionsProgressLoading } =
    trpc.questionProgress.getAll.useQuery(undefined, {
      enabled: isLoggedIn,
    });

  const { data: questionListSessions } =
    trpc.questionSessions.getActive.useQuery(undefined, {
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
  // TODO(interviews): SSR this part to prevent layout shifts since the progress section is at the top
  const showProgressAtGlance =
    (questionsProgress ?? []).length > 0 ||
    Object.keys(contributions || {}).length > 0;

  const studyListsMap = createStudyListMapFromArray([
    ...studyPlans,
    ...companyGuides,
    ...focusAreas,
  ]);

  const guidesProgressCount = getGuideCompletionCount(guidesProgress);
  const categorizedQuestionsProgress =
    categorizeQuestionsProgress(questionsProgress);

  // Get the latest created system design question createdAt
  // This is for playbook progress to update the updatedAt value in system design playbook progress
  const systemDesignQuestionLatestCreatedAt = questionsProgress?.filter(
    ({ format }) => format === 'system-design',
  )[0]?.createdAt;
  const guidesData = useGuidesData();
  const playbookProgress = [
    ...(guidesProgressCount.behavioralPlaybook.completed > 0 &&
    guidesProgressCount.behavioralPlaybook.completed !==
      guidesProgressCount.behavioralPlaybook.total
      ? [
          {
            articleProgress: {
              completed: guidesProgressCount.behavioralPlaybook.completed,
              total: guidesProgressCount.behavioralPlaybook.total,
            },
            href: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.href,
            title: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.name,
            updatedAt: guidesProgressCount.behavioralPlaybook.updatedAt,
          },
        ]
      : []),
    ...(guidesProgressCount.frontendInterviewPlaybook.completed > 0 &&
    guidesProgressCount.frontendInterviewPlaybook.completed !==
      guidesProgressCount.frontendInterviewPlaybook.total
      ? [
          {
            articleProgress: {
              completed:
                guidesProgressCount.frontendInterviewPlaybook.completed,
              total: guidesProgressCount.frontendInterviewPlaybook.total,
            },
            href: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.href,
            title: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.name,
            updatedAt: guidesProgressCount.frontendInterviewPlaybook.updatedAt,
          },
        ]
      : []),
    ...(categorizedQuestionsProgress['system-design'].size +
      guidesProgressCount.systemDesignPlaybook.completed &&
    categorizedQuestionsProgress['system-design'].size +
      guidesProgressCount.systemDesignPlaybook.completed !==
      guidesProgressCount.systemDesignPlaybook.total +
        questions.systemDesignQuestions.length
      ? [
          {
            articleProgress: {
              completed: guidesProgressCount.systemDesignPlaybook.completed,
              total: guidesProgressCount.systemDesignPlaybook.total,
            },
            href: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.href,
            questionProgress: {
              completed: categorizedQuestionsProgress['system-design'].size,
              total: questions.systemDesignQuestions.length,
            },
            title: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.name,
            // Get the latest date from either article progress or question progress
            updatedAt: getLatestDate(
              guidesProgressCount.frontendInterviewPlaybook.updatedAt,
              systemDesignQuestionLatestCreatedAt,
            ),
          },
        ]
      : []),
  ];

  const showContinueLearning =
    (questionListSessions != null && questionListSessions.length > 0) ||
    playbookProgress.length > 0;

  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader
        contributions={contributions}
        isContributionsLoading={isContributionsLoading}
        isLoggedIn={isLoggedIn}
        studyListsMap={studyListsMap}
      />
      <Section>
        {isLoggedIn && showProgressAtGlance && (
          <InterviewsDashboardProgressSection
            contributions={contributions}
            isContributionsLoading={isContributionsLoading}
            isQuestionsProgressLoading={isQuestionsProgressLoading}
            questions={questions}
            questionsProgress={questionsProgress ?? []}
          />
        )}
        {showContinueLearning && (
          <>
            <InterviewsDashboardContinueLearningSection
              playbookProgress={playbookProgress}
              questionListSessions={sessions}
              studyListsMap={studyListsMap}
            />
            <Divider />
          </>
        )}
        <InterviewsDashboardRecommendedPreparationStrategy
          categorizedQuestionsProgress={categorizedQuestionsProgress}
          guidesProgressCount={guidesProgressCount}
          questionListSessions={sessions}
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
