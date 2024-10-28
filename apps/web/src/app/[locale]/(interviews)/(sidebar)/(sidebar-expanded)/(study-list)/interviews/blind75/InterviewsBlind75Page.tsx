'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import { RiFlaskLine, RiVerifiedBadgeLine, RiWindowLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { PreparationPlan } from '~/data/plans/PreparationPlans';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsStudyList';
import InterviewsRecommendedPrepStrategyPageTitleSection from '~/components/interviews/recommended/InterviewsRecommendedPrepStrategyPageTitleSection';
import { FormattedMessage, useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import {
  categorizeQuestionsProgress,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
  plan: PreparationPlan;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsBlind75Page({
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  bottomContent,
  plan,
  metadata,
}: Props) {
  const intl = useIntl();
  const user = useUser();

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

  const features = [
    {
      icon: RiWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for blind75',
        id: 'e/MXjM',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions in JS/TS',
        description: 'Features for blind75',
        id: 'RW0xSE',
      }),
    },
    {
      icon: RiFlaskLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for blind75',
        id: 'KE8wmG',
      }),
    },
  ];

  return (
    <div className={clsx('flex flex-col gap-y-12', 'py-12', 'relative')}>
      <Container className="relative flex flex-col gap-y-5">
        <InterviewsRecommendedPrepStrategyPageTitleSection
          description={plan.description}
          features={features}
          icon={planTheme.iconOutline}
          longDescription={
            <div className="flex flex-col gap-4">
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="Front end interviews are mostly practical in nature – till you're met with the traditional data structure and algorithms questions that are expected of traditional software engineering interviews."
                  description="Description for Blind75 page"
                  id="Eq+Sdc"
                />
              </Text>
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="Our recommended approach is to work on the Blind75, which is the smallest list of data structures and algorithms (DSA) questions that prepares you well for such interviews. Many candidates use the Blind 75 list as a study guide, working through each problem and understanding the underlying concepts, patterns, and techniques."
                  description="Description for Blind75 page"
                  id="1Dvsx4"
                />
              </Text>
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="We've solved all of these questions in JavaScript / TypeScript, which would be friendly for the front end engineering community."
                  description="Description for Blind75 page"
                  id="Wc2sX9"
                />
              </Text>
            </div>
          }
          metadata={metadata}
          overallProgress={questionProgressParam ?? []}
          questions={[
            ...quizQuestions,
            ...codingQuestions,
            ...systemDesignQuestions,
          ]}
          questionsSessionKey="blind75"
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
            showSummarySection={false}
            systemDesignQuestions={systemDesignQuestions}
          />
          {bottomContent && (
            <Section>
              <Divider />
              <MDXContent mdxCode={bottomContent.body.code} />
            </Section>
          )}
        </Container>
      </Section>
    </div>
  );
}
