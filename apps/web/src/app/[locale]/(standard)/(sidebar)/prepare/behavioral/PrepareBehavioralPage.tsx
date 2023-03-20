'use client';

import PromoBanner from '~/components/global/PromoBanner';
import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import QuestionFormatTitleSection from '~/components/questions/listings/QuestionFormatTitleSection';
import QuestionsGuidesGrid from '~/components/questions/listings/QuestionsGuidesGrid';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function PrepareBehavioralInterviewPage() {
  const behavioralInterviewGuidebookNavigation =
    useBehavioralInterviewGuidebookNavigation();

  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 py-8 md:py-12" variant="normal">
        <Heading className="sr-only">
          Front End Interview Preparation — Behavioral Interviews
        </Heading>
        <Section>
          <QuestionFormatTitleSection format="behavioral" />
          <QuestionsGuidesGrid
            items={behavioralInterviewGuidebookNavigation.items
              .map((item) => item.links)
              .flat()}
            title="Behavioral Interview Study Guides"
          />
        </Section>
      </Container>
    </>
  );
}
