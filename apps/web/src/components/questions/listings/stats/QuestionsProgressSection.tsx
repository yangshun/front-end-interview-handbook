import { FormattedMessage } from 'react-intl';

import type { PreparationPlan } from '~/data/plans/PreparationPlans';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';

import type { QuestionsCategorizedProgress } from '~/db/QuestionsUtils';

import QuestionProgressPanelSection from './QuestionProgressPanelSection';
import type { QuestionQuizMetadata } from '../../common/QuestionsTypes';

export default function QuestionsProgressSection({
  progress,
  preparationPlan,
  quizQuestions,
}: Readonly<{
  preparationPlan: PreparationPlan;
  progress: QuestionsCategorizedProgress;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
}>) {
  const progressSummary = {
    coding: {
      completed: progress.javascript.size + progress['user-interface'].size,
      total:
        preparationPlan.questions.javascript.length +
        preparationPlan.questions['user-interface'].length,
    },
    quiz: {
      completed: progress.quiz.size,
      total: quizQuestions.length,
    },
    'system-design': {
      completed: progress['system-design'].size,
      total: preparationPlan.questions['system-design'].length,
    },
  };
  const completedQuestions = Object.values(progressSummary).reduce(
    (acc, format) => acc + format.completed,
    0,
  );
  const totalQuestions = Object.values(progressSummary).reduce(
    (acc, format) => acc + format.total,
    0,
  );

  return (
    <div>
      <div>
        <Heading className="sr-only" level="custom">
          <FormattedMessage
            defaultMessage="Progress Overview"
            description="Header for progress overview section which tells user the progress they have made on questions practice on the platform"
            id="fnVJCv"
          />
        </Heading>
        <Section>
          <div className="mb-6 space-y-3">
            <Text
              className="tracking-tight"
              color="secondary"
              display="block"
              weight="medium">
              {completedQuestions === 0 ? (
                <FormattedMessage
                  defaultMessage="Start on this preparation plan today!"
                  description="Call-to-Action that asks user to try out a study plan"
                  id="ukvoec"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="You have completed <span>{completionProgressPercentage}%</span> of this plan <span2> ({completedQuestions} of {totalQuestions})</span2>"
                  description="Line describing completion status of the study plan"
                  id="uawqxS"
                  values={{
                    completedQuestions,
                    completionProgressPercentage: (
                      (completedQuestions / totalQuestions) *
                      100
                    ).toFixed(0),
                    span: (chunks) => (
                      <Text color="active" size="body" weight="bold">
                        {chunks}
                      </Text>
                    ),
                    span2: (chunks) => (
                      <Text color="disabled" size="body" weight="custom">
                        {chunks}
                      </Text>
                    ),
                    totalQuestions,
                  }}
                />
              )}
            </Text>
            <ProgressBar
              completed={Math.max(completedQuestions, 1)}
              size="md"
              total={totalQuestions}
            />
          </div>
        </Section>
      </div>
      <Section>
        <QuestionProgressPanelSection
          layout="horizontal"
          progressSummary={progressSummary}
        />
      </Section>
    </div>
  );
}
