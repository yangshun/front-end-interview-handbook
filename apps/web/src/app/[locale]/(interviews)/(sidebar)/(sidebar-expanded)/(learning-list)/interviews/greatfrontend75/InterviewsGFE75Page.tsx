'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { trpc } from '~/hooks/trpc';

import type { PreparationPlan } from '~/data/plans/PreparationPlans';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsGFE75TitleSection from '~/components/interviews/questions/listings/learning/QuestionsGFE75TitleSection';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  categorizeQuestionListSessionProgress,
  categorizeQuestionsProgress,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  plan: PreparationPlan;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsGFE75Page({
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  bottomContent,
  plan,
}: Props) {
  const user = useUser();

  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    { enabled: !!user },
  );
  const { data: questionListsProgressParam } =
    trpc.questionLists.getSessionProgress.useQuery(
      { listKey: plan.type },
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
    plan.questions,
  );
  const questionsSessionProgress = filterQuestionsProgressByList(
    questionsListsProgressAll,
    plan.questions,
  );

  const planTheme = getPreparationPlanTheme(plan.type);

  return (
    <div
      className={clsx(
        'flex flex-col gap-y-12',
        'py-4 md:py-6 lg:py-8 xl:py-16',
        'relative',
      )}>
      <Container className="relative flex flex-col gap-y-5">
        <QuestionsGFE75TitleSection
          description={plan.description}
          icon={planTheme.iconOutline}
          themeBackgroundClass={planTheme.gradient.className}
          title={plan.name}
        />
      </Container>
      <Section>
        <Container className="flex flex-col gap-20">
          <QuestionsLearningList
            codingQuestions={codingQuestions}
            listKey={plan.type}
            overallProgress={questionsOverallProgress}
            quizQuestions={quizQuestions}
            sessionProgress={questionsSessionProgress}
            showSummarySection={false}
            systemDesignQuestions={systemDesignQuestions}
          />

          {bottomContent && (
            <Section>
              <MDXContent mdxCode={bottomContent.body.code} />
            </Section>
          )}
        </Container>
      </Section>
    </div>
  );
}
