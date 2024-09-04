'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import { useState } from 'react';
import { RiFlaskLine, RiVerifiedBadgeLine, RiWindowLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import PreparationGFE75Logo from '~/data/plans/logo/PreparationGFE75Logo';
import type { PreparationPlan } from '~/data/plans/PreparationPlans';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import InterviewsRecommendedPrepStrategyPageTitleSection from '~/components/interviews/recommended/InterviewsRecommendedPrepStrategyPageTitleSection';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import { themeOutlineElementBrandColor_FocusVisible } from '~/components/ui/theme';

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

export default function InterviewsGFE75Page({
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  bottomContent,
  plan,
  metadata,
}: Props) {
  const intl = useIntl();
  const user = useUser();

  const { setShowFeedbackWidget } = useUserPreferences();
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);

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
        description: 'Features for interviews questions',
        id: 'qZTabX',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions',
        description: 'Features for interviews questions',
        id: 'l+NV6Y',
      }),
    },
    {
      icon: RiFlaskLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for interviews questions',
        id: 'CZJo2K',
      }),
    },
  ];

  return (
    <div
      className={clsx(
        'flex flex-col gap-y-12',
        'py-4 md:py-6 lg:py-8 xl:py-16',
        'relative',
      )}>
      <Container className="relative flex flex-col gap-y-5">
        <InterviewsRecommendedPrepStrategyPageTitleSection
          description={plan.description}
          features={features}
          logo={<PreparationGFE75Logo />}
          longDescription={
            <div className="flex flex-col gap-4">
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="The smallest list of practice questions that gets you the most mileage in your preparation. Covers the most commonly asked front end interview topics."
                  description="Description for GFE75 page"
                  id="5jNSb2"
                />
              </Text>
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="Created with the expertise of senior to staff front end interviewers from some of the top companies in the world. <button>Have a suggestion?</button>"
                  description="Description for GFE75 page"
                  id="L2J7Pv"
                  values={{
                    button: (chunks) => (
                      <button
                        className={clsx(
                          textVariants({ color: 'active', size: 'body1' }),
                          themeOutlineElementBrandColor_FocusVisible,
                        )}
                        type="button"
                        onClick={() => setIsOpenFeedback(true)}>
                        {chunks}
                      </button>
                    ),
                  }}
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
          questionsSessionKey="greatfrontend75"
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

      <FeedbackDialog
        isShown={isOpenFeedback}
        onClose={() => setIsOpenFeedback(false)}
        onHideWidgetForSession={() => {
          setShowFeedbackWidget(false);
        }}
      />
    </div>
  );
}
