'use client';

import { useIntl } from 'react-intl';

import PromoBanner from '~/components/global/PromoBanner';
import { useQuizSectionItem } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionFormatTitleSection from '~/components/questions/listings/QuestionFormatTitleSection';
import QuestionsGuidesGrid from '~/components/questions/listings/QuestionsGuidesGrid';
import QuestionsQuizListWithFilters from '~/components/questions/listings/QuestionsQuizListWithFilters';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  questions: ReadonlyArray<QuestionQuizMetadata>;
}>;

export default function PrepareQuizQuestionsPage({ questions }: Props) {
  const intl = useIntl();
  const quizSectionItem = useQuizSectionItem();

  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 py-8 md:py-12" variant="normal">
        <Heading className="sr-only">
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
            <Heading className="text-lg font-semibold text-slate-900">
              {intl.formatMessage({
                defaultMessage: 'Quiz Practice Questions',
                description: 'Quiz question list title',
                id: 'UuC2xb',
              })}
            </Heading>
            <Section>
              <QuestionsQuizListWithFilters questions={questions} />
            </Section>
          </div>
        </Section>
      </Container>
    </>
  );
}
