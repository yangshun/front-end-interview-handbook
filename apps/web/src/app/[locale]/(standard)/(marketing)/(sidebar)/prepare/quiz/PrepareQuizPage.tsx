'use client';

import { useIntl } from 'react-intl';

import { useQuizSectionItem } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionsFocusAreas from '~/components/questions/listings/auxilliary/QuestionsFocusAreas';
import QuestionsPreparationOnboarding from '~/components/questions/listings/auxilliary/QuestionsPreparationOnboarding';
import QuestionsPreparationTabs from '~/components/questions/listings/filters/QuestionsPreparationTabs';
import QuestionPreparationPageHeader from '~/components/questions/listings/headers/QuestionPreparationPageHeader';
import QuestionsQuizListWithFilters from '~/components/questions/listings/items/QuestionsQuizListWithFilters';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionQuizMetadata>;
}>;

export default function PrepareQuizQuestionsPage({
  questions,
  questionCompletionCount,
}: Props) {
  const intl = useIntl();
  const quizSectionItem = useQuizSectionItem();

  return (
    <Container className="grid gap-y-12 py-8" variant="normal">
      <Heading className="sr-only" level="custom">
        {intl.formatMessage({
          defaultMessage: 'Front End Interview Preparation — Quiz',
          description: 'Prepare for front end interview quiz questions',
          id: 'w5fdO4',
        })}
      </Heading>
      <Section>
        <div className="flex flex-col gap-y-6">
          <QuestionPreparationPageHeader />
          <QuestionsPreparationOnboarding />
        </div>
        <QuestionsFocusAreas />
        <QuestionsPreparationTabs area="quiz" />
        <QuestionsQuizListWithFilters
          questionCompletionCount={questionCompletionCount}
          questions={questions}
        />
      </Section>
    </Container>
  );
}
