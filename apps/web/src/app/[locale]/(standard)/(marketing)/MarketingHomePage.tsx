'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import MarketingEmbedSection from '~/components/interviews/marketing/embed/MarketingEmbedSection';
import type { EmbedUIQuestion } from '~/components/interviews/marketing/embed/MarketingEmbedUIQuestion';
import MarketingCompaniesMarquee from '~/components/interviews/marketing/MarketingCompaniesMarquee';
import MarketingFeaturedQuestions from '~/components/interviews/marketing/MarketingFeaturedQuestions';
import MarketingFeaturesBlocks from '~/components/interviews/marketing/MarketingFeaturesBlocks';
import MarketingHero from '~/components/interviews/marketing/MarketingHero';
import MarketingHomepageFeaturesRow from '~/components/interviews/marketing/MarketingHomepageFeaturesRow';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import SocialDiscountToast from '~/components/promotions/SocialDiscountToast';
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
        <MarketingFeaturesBlocks />
        <div ref={loadBottomHalfMarkerRef} />
        <MarketingFeaturedQuestions
          javaScriptQuestions={javaScriptQuestions}
          quizQuestions={quizQuestions}
          systemDesignQuestions={systemDesignQuestions}
          userInterfaceQuestions={userInterfaceQuestions}
        />
        {showBottomHalf && <MarketingHomePageBottom />}
      </Section>
      <SocialDiscountToast />
    </main>
  );
}
