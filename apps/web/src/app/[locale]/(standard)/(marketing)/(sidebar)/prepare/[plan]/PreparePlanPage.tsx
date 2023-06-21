'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import usePreparationPlans from '~/data/PreparationPlans';
import { usePreparationPlansUI } from '~/data/PreparationPlansUI';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { PreparationPlanType } from '~/components/questions/common/PreparationPlanTypes';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionTryFirstFreeSection from '~/components/questions/listings/auxilliary/QuestionTryFirstFreeSection';
import QuestionListTitleSection from '~/components/questions/listings/headers/QuestionListTitleSection';
import QuestionsPlansList from '~/components/questions/listings/items/QuestionsPlansList';
import QuestionsProgressSection from '~/components/questions/listings/stats/QuestionsProgressSection';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import {
  categorizeQuestionsProgress,
  filterQuestionsProgressByPlan,
} from '~/db/QuestionsUtils';

type Props = Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  plan: PreparationPlanType;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function PreparationPlanPage({
  quizQuestions: quizQuestionsParam,
  codingQuestions,
  systemDesignQuestions,
  plan,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const { data: questionProgressParam } =
    trpc.questionProgress.getAll.useQuery();
  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
  const preparationPlans = usePreparationPlans();
  const preparationPlansExtra = usePreparationPlansUI();

  const preparationPlan = preparationPlans[plan];
  const preparationPlanExtra = preparationPlansExtra[plan];

  // Quiz questions are dynamically populated based on the following.
  const quizQuestions = quizQuestionsParam.filter(({ importance }) => {
    switch (preparationPlan.type) {
      case 'one-week':
        return importance === 'high';
      case 'one-month':
        return importance === 'high' || importance === 'mid';
      case 'three-months':
        return true;
    }
  });

  preparationPlan.questions.quiz = quizQuestions.map(
    (metadata) => metadata.slug,
  );

  const questionsProgress = filterQuestionsProgressByPlan(
    questionsProgressAll,
    preparationPlan,
  );

  const questionCount = Object.values(preparationPlanExtra.questions)
    .map((q) => q.length)
    .reduce((prev, curr) => prev + curr, 0);

  const canViewStudyPlans = userProfile?.isPremium;

  return (
    <div className="relative flex flex-col gap-y-12 py-6">
      <Container className="relative flex flex-col gap-y-5">
        <div>
          <Button
            addonPosition="start"
            className="-ml-5 -mb-2"
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
        </div>
        <QuestionListTitleSection
          icon={preparationPlanExtra.iconOutline}
          questionCount={questionCount}
          themeBackgroundClass={preparationPlanExtra.backgroundClass}
          title={preparationPlanExtra.longName}
          totalDurationMins={360}
        />
        <Text
          className="max-w-3xl"
          color="secondary"
          display="block"
          size="body2">
          {preparationPlanExtra.description}
        </Text>
      </Container>
      <Section>
        {canViewStudyPlans ? (
          <Container className="space-y-8 pb-48">
            <QuestionsProgressSection
              preparationPlan={preparationPlan}
              progress={questionsProgress}
              quizQuestions={quizQuestions}
            />
            {questionsProgress.javascript.size === 0 &&
              questionsProgress['user-interface'].size === 0 && (
                <QuestionTryFirstFreeSection
                  codingQuestions={codingQuestions}
                />
              )}
            <QuestionsPlansList
              codingQuestions={codingQuestions}
              preparationPlan={preparationPlan}
              progress={questionsProgress}
              quizQuestions={quizQuestions}
              systemDesignQuestions={systemDesignQuestions}
            />
          </Container>
        ) : (
          <Container>
            <div className="relative">
              <QuestionPaywall
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
          </Container>
        )}
      </Section>
    </div>
  );
}
