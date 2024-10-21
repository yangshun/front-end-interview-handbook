import type { InterviewsCompanyGuide } from 'contentlayer/generated';

import InterviewsMarketingEmbedSection from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedSection';
import type { EmbedUIQuestion } from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingForeword from '~/components/interviews/marketing/InterviewsMarketingForeword';
import InterviewsMarketingHeroNew from '~/components/interviews/marketing/InterviewsMarketingHeroNew';
import InterviewsMarketingOffersDontLieSection from '~/components/interviews/marketing/InterviewsMarketingOffersDontLieSection';
import InterviewsMarketingPlansSection from '~/components/interviews/marketing/InterviewsMarketingPlansSection';
import InterviewsMarketingPrepResourcesByBigTechEngineers from '~/components/interviews/marketing/InterviewsMarketingPrepResourcesByBigTechEngineers';
import InterviewsMarketingSimulateRealInterviews from '~/components/interviews/marketing/InterviewsMarketingSimulateRealInterviews';
import type { InterviewsMarketingTestimonial } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialCard';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import SocialDiscountToast from '~/components/promotions/social/SocialDiscountToast';
import Section from '~/components/ui/Heading/HeadingContext';

import InterviewsMarketingHomePageBottomContainer from './InterviewsMarketingHomePageBottomContainer';

type Props = Readonly<{
  companyGuides: ReadonlyArray<InterviewsCompanyGuide>;
  javaScriptEmbedExample: QuestionJavaScript;
  javaScriptQuestions: ReadonlyArray<QuestionMetadata>;
  questions: {
    algo: ReadonlyArray<QuestionMetadata>;
    js: ReadonlyArray<QuestionMetadata>;
    quiz: ReadonlyArray<QuestionMetadata>;
    'system-design': ReadonlyArray<QuestionMetadata>;
    ui: ReadonlyArray<QuestionMetadata>;
  };
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  testimonials: ReadonlyArray<InterviewsMarketingTestimonial>;
  uiCodingQuestion: EmbedUIQuestion;
}>;

export default function InterviewsMarketingHomePageNew({
  uiCodingQuestion,
  javaScriptEmbedExample,
  questions,
  companyGuides,
  testimonials,
}: Props) {
  return (
    <main>
      <InterviewsMarketingHeroNew testimonials={testimonials} />
      <Section>
        <InterviewsMarketingEmbedSection
          javaScriptEmbedExample={javaScriptEmbedExample}
          uiEmbedExample={uiCodingQuestion}
        />
        <InterviewsMarketingForeword />
        <InterviewsMarketingOffersDontLieSection />
        <InterviewsMarketingPrepResourcesByBigTechEngineers />
        <InterviewsMarketingPlansSection />
        <InterviewsMarketingSimulateRealInterviews />
        <InterviewsMarketingHomePageBottomContainer
          companyGuides={companyGuides}
          questions={questions}
        />
      </Section>
      <SocialDiscountToast />
    </main>
  );
}
