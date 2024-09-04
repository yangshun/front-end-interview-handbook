'use client';

import clsx from 'clsx';
import type {
  InterviewsCompanyGuide,
  InterviewsListingBottomContent,
} from 'contentlayer/generated';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { FocusAreas } from '~/data/focus-areas/FocusAreas';
import type { PreparationPlans } from '~/data/plans/PreparationPlans';

import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import MDXContent from '~/components/mdx/MDXContent';
import Anchor from '~/components/ui/Anchor';
import Section from '~/components/ui/Heading/HeadingContext';

import InterviewsDashboardContinueLearningSection from './InterviewsDashboardContinueLearningSection';
import InterviewsDashboardMoreLearningSection from './InterviewsDashboardMoreLearningSection';
import InterviewsDashboardPageHeader from './InterviewsDashboardPageHeader';
import InterviewsDashboardRecommendedPreparationStrategy from './InterviewsDashboardRecommendedPreparationStrategy';
import InterviewsDashboardProgressAtGlanceSection from './progress-glance/InterviewsDashboardProgressAtGlanceSection';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  companyGuides: Array<InterviewsCompanyGuide>;
  focusAreas: FocusAreas;
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
  focusAreas,
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

  const sessions = questionListSessions ?? [];
  const showContinueLearning =
    questionListSessions != null && questionListSessions.length > 0;

  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader />
      {isLoggedIn && (
        <InterviewsDashboardProgressAtGlanceSection
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
        focusAreas={focusAreas}
        preparationPlans={preparationPlans}
        questionListSessions={sessions}
        questions={questions}
        questionsProgress={questionsProgress ?? []}
      />
      {bottomContent && (
        <Section>
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
