'use client';

import PromoBanner from '~/components/global/banners/PromoBanner';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';
import type { EmbedUIQuestion } from '~/components/marketing/embed/MarketingEmbedUIQuestion';
import MarketingCompaniesMarquee from '~/components/marketing/MarketingCompaniesMarquee';
import MarketingContinuousUpdates from '~/components/marketing/MarketingContinuousUpdates';
import MarketingEmbedSection from '~/components/marketing/MarketingEmbedSection';
import MarketingFAQ from '~/components/marketing/MarketingFAQ';
import MarketingFeatureQuestions from '~/components/marketing/MarketingFeatureQuestions';
import MarketingFeaturesBlocks from '~/components/marketing/MarketingFeaturesBlocks';
import MarketingFeatureSolutions from '~/components/marketing/MarketingFeatureSolutions';
import MarketingFeaturesRow from '~/components/marketing/MarketingFeaturesRow';
import MarketingHero from '~/components/marketing/MarketingHero';
import MarketingPricingSectionLocalizedContainer from '~/components/marketing/MarketingPricingSectionLocalizedContainer';
import MarketingTestimonialsSection from '~/components/marketing/testimonials/MarketingTestimonialsSection';
import type {
  QuestionJavaScript,
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
  javaScriptQuestions: ReadonlyArray<QuestionMetadata>;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
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
  const { userProfile } = useUserProfile();

  return (
    <main>
      <PromoBanner />
      <MarketingHero />
      <Section>
        <MarketingFeaturesRow />
        <MarketingCompaniesMarquee />
        <MarketingEmbedSection
          javaScriptEmbedExample={javaScriptEmbedExample}
          uiEmbedExample={uiCodingQuestion}
        />
        <MarketingFeaturesBlocks />
        <MarketingFeatureQuestions
          javaScriptQuestions={javaScriptQuestions}
          quizQuestions={quizQuestions}
          systemDesignQuestions={systemDesignQuestions}
          userInterfaceQuestions={userInterfaceQuestions}
        />
        <MarketingFeatureSolutions
          solutions={{
            todoListReact: uiCodingQuestion.react.solution,
            todoListVanilla: uiCodingQuestion.vanilla.solution,
          }}
        />
        {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
          <MarketingPricingSectionLocalizedContainer />
        )}
        <MarketingTestimonialsSection />
        <MarketingContinuousUpdates />
        <MarketingFAQ />
        <MarketingContactUs />
      </Section>
    </main>
  );
}
