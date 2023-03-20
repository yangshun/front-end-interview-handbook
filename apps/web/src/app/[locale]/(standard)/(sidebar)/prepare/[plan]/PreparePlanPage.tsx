'use client';

import usePreparationPlans from '~/data/PreparationPlans';

import TextPairing from '~/components/common/TextPairing';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { PreparationPlanType } from '~/components/questions/common/PreparationPlanTypes';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionsPlansList from '~/components/questions/listings/QuestionsPlansList';
import QuestionsProgressSection from '~/components/questions/listings/QuestionsProgressSection';
import QuestionTryFirstFreeSection from '~/components/questions/listings/QuestionTryFirstFreeSection';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import { useQueryQuestionProgressAll } from '~/db/QuestionsProgressClient';
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
  const { userProfile } = useUserProfile();
  const { data: questionProgressParam } = useQueryQuestionProgressAll();
  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
  const preparationPlans = usePreparationPlans();

  const preparationPlan = preparationPlans[plan];
  const title = `${preparationPlan.title} Preparation Plan`;

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

  const canViewStudyPlans = userProfile?.isPremium;

  return (
    <div className="relative pb-16">
      <div className="absolute z-0 h-96 w-full bg-slate-900" />
      <div className="relative space-y-16 py-16 lg:pb-24 lg:pt-20">
        <Container>
          <TextPairing
            description={preparationPlan.description}
            mode="dark"
            sectionLabel="Study Plans"
            size="lg"
            title={title}
          />
        </Container>
      </div>
      <Section>
        {canViewStudyPlans ? (
          <Container className="-mt-48 translate-y-36 space-y-8 pb-48">
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
                subtitle="Purchase premium to unlock full access to the study plans and all questions with high quality solutions"
                title="Premium Study Plans"
              />
            </div>
          </Container>
        )}
      </Section>
    </div>
  );
}
