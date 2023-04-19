'use client';

import { useIntl } from 'react-intl';

import PromoBanner from '~/components/global/banners/PromoBanner';
import { useCodingQuestionListGuideItems } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionFormatTitleSection from '~/components/questions/listings/QuestionFormatTitleSection';
import QuestionsCodingListWithFilters from '~/components/questions/listings/QuestionsCodingListWithFilters';
import QuestionsGuidesGrid from '~/components/questions/listings/QuestionsGuidesGrid';
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
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 py-8 md:py-12" variant="normal">
        <Heading className="sr-only">
          {intl.formatMessage({
            defaultMessage: 'Front End Interview Preparation — Coding',
            description: 'Prepare for front end interview coding questions',
            id: '7H/tqa',
          })}
        </Heading>
        <Section>
          <QuestionFormatTitleSection format="coding" />
          <QuestionsGuidesGrid
            items={codingQuestionListGuideItems}
            title={intl.formatMessage({
              defaultMessage: 'Coding Study Guides',
              description: 'Coding interview study guides',
              id: 'tW2p7C',
            })}
          />
          <div className="grid gap-4">
            <Heading className="text-lg font-semibold text-slate-900">
              {intl.formatMessage({
                defaultMessage: 'Coding Practice Questions',
                description: 'Coding question list title',
                id: 'ihSYR4',
              })}
            </Heading>
            <Section>
              <QuestionsCodingListWithFilters
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
