'use client';

import clsx from 'clsx';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { PreparationPlan } from '~/data/plans/PreparationPlans';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionDifficulty,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsTotalDurationMins } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import QuestionsLearningListTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListTitleSection';
import Alert from '~/components/ui/Alert';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import {
  categorizeQuestionListSessionProgress,
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

type Props = Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  difficultySummary: Record<QuestionDifficulty, number>;
  plan: PreparationPlan;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function StudyPlanPage({
  difficultySummary,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  plan,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const canViewStudyPlans = userProfile?.isPremium;

  const { data: questionProgressParam } =
    trpc.questionProgress.getAll.useQuery();
  const { data: questionListsProgressParam } =
    trpc.questionLists.getSessionProgress.useQuery({ listKey: plan.type });

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
  const questionCount = countNumberOfQuestionsInList(plan.questions);

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
        </div>
        <QuestionsLearningListTitleSection
          description={plan.description}
          difficultySummary={difficultySummary}
          icon={planTheme.iconOutline}
          questionCount={questionCount}
          questionListKey={plan.type}
          schedule={plan.schedule}
          themeBackgroundClass={planTheme.gradient.className}
          title={plan.longName}
          totalDurationMins={totalDuration}
        />
      </Container>
      <Section>
        <Container className="pb-12">
          {canViewStudyPlans ? (
            <div className="flex flex-col gap-y-8">
              {(questionsOverallProgress.javascript.size > 0 ||
                questionsOverallProgress['user-interface'].size > 0) && (
                <div className="max-w-3xl">
                  <Alert
                    title={intl.formatMessage({
                      defaultMessage:
                        'Changes to how study plan progress is calculated',
                      description: 'Message about changes to study plans',
                      id: 'kmShy2',
                    })}
                    variant="info">
                    <Text color="secondary" display="block" size="body2">
                      Study plan progress no longer reads from your overall
                      question completion, so you might see changes in your
                      study progress. This allows you to have study
                      plan-specific progress by starting a question from this
                      page. Your overall completion progress remains unchanged,
                      and you can click on the left icon within each past solved
                      question to mark them as completed for this study plan.
                    </Text>
                  </Alert>
                </div>
              )}
              <QuestionsLearningList
                codingQuestions={codingQuestions}
                listKey={plan.type}
                overallProgress={questionsOverallProgress}
                quizQuestions={quizQuestions}
                sessionProgress={questionsSessionProgress}
                systemDesignQuestions={systemDesignQuestions}
              />
            </div>
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
        </Container>
      </Section>
    </div>
  );
}
