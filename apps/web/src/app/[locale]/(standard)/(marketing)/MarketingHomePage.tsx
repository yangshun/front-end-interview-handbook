'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import type { EmbedUIQuestion } from '~/components/marketing/embed/MarketingEmbedUIQuestion';
import MarketingCompaniesMarquee from '~/components/marketing/MarketingCompaniesMarquee';
import MarketingEmbedSection from '~/components/marketing/MarketingEmbedSection';
import MarketingFeaturedQuestions from '~/components/marketing/MarketingFeaturedQuestions';
import MarketingFeaturesBlocks from '~/components/marketing/MarketingFeaturesBlocks';
import MarketingHero from '~/components/marketing/MarketingHero';
import MarketingHomepageFeaturesRow from '~/components/marketing/MarketingHomepageFeaturesRow';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import Section from '~/components/ui/Heading/HeadingContext';

const MarketingHomePageBottom = dynamic(
  () => import('./MarketingHomePageBottom'),
  { ssr: false },
);

type Props = Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
  javaScriptQuestions: ReadonlyArray<QuestionMetadata>;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  uiCodingQuestion: EmbedUIQuestion;
  userInterfaceQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function MarketingHomePage({
  uiCodingQuestion,
  javaScriptEmbedExample,
  javaScriptQuestions,
  userInterfaceQuestions,
  systemDesignQuestions,
  quizQuestions,
}: Props) {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <main className="bg-[#070708] pb-24" data-mode="dark">
      <MarketingHero />
      <Section>
        <MarketingHomepageFeaturesRow />
        <MarketingCompaniesMarquee />
        <MarketingEmbedSection
          featuredQuestions={[
            ...javaScriptQuestions,
            ...userInterfaceQuestions,
          ]}
          javaScriptEmbedExample={javaScriptEmbedExample}
          uiEmbedExample={uiCodingQuestion}
        />
        <MarketingFeaturesBlocks
          solutions={{
            todoListReact: uiCodingQuestion.frameworks.react.solutionBundle,
            todoListVanilla: uiCodingQuestion.frameworks.vanilla.solutionBundle,
          }}
        />
        <div ref={loadBottomHalfMarkerRef} />
        <MarketingFeaturedQuestions
          javaScriptQuestions={javaScriptQuestions}
          quizQuestions={quizQuestions}
          systemDesignQuestions={systemDesignQuestions}
          userInterfaceQuestions={userInterfaceQuestions}
        />
        {showBottomHalf && <MarketingHomePageBottom />}
      </Section>
    </main>
  );
}
