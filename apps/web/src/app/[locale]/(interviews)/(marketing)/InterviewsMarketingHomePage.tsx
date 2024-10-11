'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import InterviewsMarketingEmbedSection from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedSection';
import type { EmbedUIQuestion } from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingCompaniesMarquee from '~/components/interviews/marketing/InterviewsMarketingCompaniesMarquee';
import InterviewsMarketingFeaturedQuestions from '~/components/interviews/marketing/InterviewsMarketingFeaturedQuestions';
import InterviewsMarketingFeaturesBlocks from '~/components/interviews/marketing/InterviewsMarketingFeaturesBlocks';
import InterviewsMarketingHero from '~/components/interviews/marketing/InterviewsMarketingHero';
import InterviewsMarketingHomepageFeaturesRow from '~/components/interviews/marketing/InterviewsMarketingHomepageFeaturesRow';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import SocialDiscountToast from '~/components/promotions/social/SocialDiscountToast';
import Section from '~/components/ui/Heading/HeadingContext';

const InterviewsMarketingHomePageBottom = dynamic(
  () => import('./InterviewsMarketingHomePageBottom'),
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

export default function InterviewsMarketingHomePage({
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
    <main className="bg-[#070708] pb-24" data-color-scheme="dark">
      <InterviewsMarketingHero />
      <Section>
        <InterviewsMarketingHomepageFeaturesRow />
        <InterviewsMarketingCompaniesMarquee />
        <InterviewsMarketingEmbedSection
          javaScriptEmbedExample={javaScriptEmbedExample}
          uiEmbedExample={uiCodingQuestion}
        />
        <InterviewsMarketingFeaturesBlocks />
        <div ref={loadBottomHalfMarkerRef} />
        <InterviewsMarketingFeaturedQuestions
          javaScriptQuestions={javaScriptQuestions}
          quizQuestions={quizQuestions}
          systemDesignQuestions={systemDesignQuestions}
          userInterfaceQuestions={userInterfaceQuestions}
        />
        {showBottomHalf && <InterviewsMarketingHomePageBottom />}
      </Section>
      <SocialDiscountToast />
    </main>
  );
}
