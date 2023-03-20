'use client';

import PromoBanner from '~/components/global/PromoBanner';
import { useCodingQuestionListGuideItems } from '~/components/guides/FrontEndInterviewGuidebookNavigation';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionFormatTitleSection from '~/components/questions/listings/QuestionFormatTitleSection';
import QuestionsCodingListWithFilters from '~/components/questions/listings/QuestionsCodingListWithFilters';
import QuestionsGuidesGrid from '~/components/questions/listings/QuestionsGuidesGrid';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function PrepareCodingQuestionsPage({ questions }: Props) {
  const codingQuestionListGuideItems = useCodingQuestionListGuideItems();

  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 py-8 md:py-12" variant="normal">
        <Heading className="sr-only">
          Front End Interview Preparation — Coding
        </Heading>
        <Section>
          <QuestionFormatTitleSection format="coding" />
          <QuestionsGuidesGrid
            items={codingQuestionListGuideItems}
            title="Coding Study Guides"
          />
          <div className="grid gap-4">
            <Heading className="text-lg font-semibold text-slate-900">
              Coding Practice Questions
            </Heading>
            <Section>
              <QuestionsCodingListWithFilters questions={questions} />
            </Section>
          </div>
        </Section>
      </Container>
    </>
  );
}
