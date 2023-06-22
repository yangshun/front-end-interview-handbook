'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { PreparationPlan } from '~/data/plans/PreparationPlans';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import { countQuestionsTotalDurationMins } from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
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
  plan: PreparationPlan;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function PreparePlanPage({
  quizQuestions,
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
  const planTheme = getPreparationPlanTheme(plan.type);

  const questionsProgress = filterQuestionsProgressByPlan(
    questionsProgressAll,
    plan,
  );

  const questionCount = Object.values(plan.questions)
    .map((q) => q.length)
    .reduce((prev, curr) => prev + curr, 0);

  const canViewStudyPlans = userProfile?.isPremium;

  const totalDuration = countQuestionsTotalDurationMins([
    ...codingQuestions,
    ...quizQuestions,
    ...systemDesignQuestions,
  ]);

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
          completedCount={
            questionsProgress.javascript.size +
            questionsProgress['user-interface'].size +
            questionsProgress.quiz.size +
            questionsProgress['system-design'].size
          }
          icon={planTheme.iconOutline}
          questionCount={questionCount}
          themeBackgroundClass={planTheme.backgroundClass}
          title={plan.longName}
          totalDurationMins={totalDuration}
        />
        <Text
          className="max-w-3xl"
          color="secondary"
          display="block"
          size="body2">
          {plan.description}
        </Text>
      </Container>
      <Section>
        {canViewStudyPlans ? (
          <Container className="flex flex-col gap-y-8 pb-48">
            <QuestionsProgressSection
              preparationPlan={plan}
              progress={questionsProgress}
              quizQuestions={quizQuestions}
            />
            <QuestionsPlansList
              codingQuestions={codingQuestions}
              preparationPlan={plan}
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
