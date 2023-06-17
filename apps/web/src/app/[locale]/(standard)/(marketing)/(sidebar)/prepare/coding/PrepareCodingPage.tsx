'use client';

import { useIntl } from 'react-intl';

import { useCodingQuestionListGuideItems } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionsFocusAreas from '~/components/questions/listings/auxilliary/QuestionsFocusAreas';
import QuestionsPreparationOnboarding from '~/components/questions/listings/auxilliary/QuestionsPreparationOnboarding';
import QuestionsPreparationTabs from '~/components/questions/listings/filters/QuestionsPreparationTabs';
import QuestionPreparationPageHeader from '~/components/questions/listings/headers/QuestionPreparationPageHeader';
import QuestionsCodingListWithFilters from '~/components/questions/listings/items/QuestionsCodingListWithFilters';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function PrepareCodingQuestionsPage({
  questions,
  questionCompletionCount,
}: Props) {
  const intl = useIntl();
  const codingQuestionListGuideItems = useCodingQuestionListGuideItems();

  return (
    <Container className="grid gap-y-12 py-8" variant="normal">
      <Heading className="sr-only" level="custom">
        {intl.formatMessage({
          defaultMessage: 'Front End Interview Preparation — Coding',
          description: 'Prepare for front end interview coding questions',
          id: '7H/tqa',
        })}
      </Heading>
      <Section>
        <div className="flex flex-col gap-y-6">
          <QuestionPreparationPageHeader />
          <QuestionsPreparationOnboarding />
        </div>
        <QuestionsFocusAreas />
        <QuestionsPreparationTabs area="coding" />
        <QuestionsCodingListWithFilters
          questionCompletionCount={questionCompletionCount}
          questions={questions}
        />
      </Section>
    </Container>
  );
}
