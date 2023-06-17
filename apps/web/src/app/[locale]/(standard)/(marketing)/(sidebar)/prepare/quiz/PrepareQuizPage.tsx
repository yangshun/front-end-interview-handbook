'use client';

import { useIntl } from 'react-intl';

import PromoBanner from '~/components/global/banners/PromoBanner';
import { useQuizSectionItem } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionFormatTitleSection from '~/components/questions/listings/headers/QuestionFormatTitleSection';
import QuestionsGuidesGrid from '~/components/questions/listings/auxilliary/QuestionsGuidesGrid';
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
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 py-8 md:py-12" variant="normal">
        <Heading className="sr-only" level="custom">
          {intl.formatMessage({
            defaultMessage: 'Front End Interview Preparation — Quiz',
            description: 'Prepare for front end interview quiz questions',
            id: 'w5fdO4',
          })}
        </Heading>
        <Section>
          <QuestionFormatTitleSection format="quiz" />
          <QuestionsGuidesGrid
            columns={3}
            items={[quizSectionItem]}
            title={intl.formatMessage({
              defaultMessage: 'Quiz Study Guides',
              description: 'Quiz interview study guides',
              id: '2m5u4b',
            })}
          />
          <div className="grid gap-4">
            <Heading level="heading6">
              {intl.formatMessage({
                defaultMessage: 'Quiz Practice Questions',
                description: 'Quiz question list title',
                id: 'UuC2xb',
              })}
            </Heading>
            <Section>
              <QuestionsQuizListWithFilters
                questionCompletionCount={questionCompletionCount}
                questions={questions}
              />
            </Section>
          </div>
        </Section>
      </Container>
    </>
  );
}
