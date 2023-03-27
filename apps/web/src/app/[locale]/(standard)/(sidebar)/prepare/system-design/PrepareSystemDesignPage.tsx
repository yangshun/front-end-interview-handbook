'use client';

import PromoBanner from '~/components/global/PromoBanner';
import { useSystemDesignLearningContent } from '~/components/questions/content/system-design/SystemDesignNavigation';
import QuestionFormatTitleSection from '~/components/questions/listings/QuestionFormatTitleSection';
import QuestionsGuidesGrid from '~/components/questions/listings/QuestionsGuidesGrid';
import QuestionsSystemDesignListWithFilters from '~/components/questions/listings/QuestionsSystemDesignListWithFilters';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function PrepareSystemDesignQuestionsPage() {
  const systemDesignLearningContent = useSystemDesignLearningContent();

  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 py-8 md:py-12" variant="normal">
        <Heading className="sr-only">
          Front End Interview Preparation — System Design
        </Heading>
        <Section>
          <QuestionFormatTitleSection format="system-design" />
          <QuestionsGuidesGrid
            columns={6}
            items={systemDesignLearningContent}
            title="System Design Study Guides"
          />
          <div className="grid gap-4">
            <Heading className="text-lg font-semibold text-slate-900">
              System Design Practice Questions
            </Heading>
            <Section>
              <QuestionsSystemDesignListWithFilters />
            </Section>
          </div>
        </Section>
      </Container>
    </>
  );
}
