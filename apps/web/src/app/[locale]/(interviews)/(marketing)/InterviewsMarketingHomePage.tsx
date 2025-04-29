import type { InterviewsStudyList } from 'contentlayer/generated';

import AuthGoogleOneTap from '~/components/auth/AuthGoogleOneTap';
import InterviewsMarketingEmbedSection from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedSection';
import type { EmbedUIQuestion } from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingForeword from '~/components/interviews/marketing/InterviewsMarketingForeword';
import InterviewsMarketingHero from '~/components/interviews/marketing/InterviewsMarketingHero';
import InterviewsMarketingOffersDontLieSection from '~/components/interviews/marketing/InterviewsMarketingOffersDontLieSection';
import type { QuestionBankDataType } from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import InterviewsMarketingPrepResourcesByBigTechEngineers from '~/components/interviews/marketing/InterviewsMarketingPrepResourcesByBigTechEngineers';
import type { InterviewsQuestionItemJavaScript } from '~/components/interviews/questions/common/QuestionsTypes';
import SocialDiscountToast from '~/components/promotions/social/SocialDiscountToast';
import Section from '~/components/ui/Heading/HeadingContext';

import InterviewsMarketingHomePageBottomContainer from './InterviewsMarketingHomePageBottomContainer';

type Props = Readonly<{
  companyGuides: ReadonlyArray<
    InterviewsStudyList & Readonly<{ questionCount: number }>
  >;
  javaScriptEmbedExample: InterviewsQuestionItemJavaScript;
  questions: QuestionBankDataType;
  uiCodingQuestion: EmbedUIQuestion;
}>;

export default function InterviewsMarketingHomePage({
  uiCodingQuestion,
  javaScriptEmbedExample,
  questions,
  companyGuides,
}: Props) {
  return (
    <main>
      <AuthGoogleOneTap next="/" />
      <InterviewsMarketingHero />
      <Section>
        <InterviewsMarketingEmbedSection
          javaScriptEmbedExample={javaScriptEmbedExample}
          uiEmbedExample={uiCodingQuestion}
        />
        <InterviewsMarketingForeword />
        <InterviewsMarketingOffersDontLieSection />
        <InterviewsMarketingPrepResourcesByBigTechEngineers />
        <InterviewsMarketingHomePageBottomContainer
          companyGuides={companyGuides}
          questions={questions}
        />
      </Section>
      <SocialDiscountToast />
    </main>
  );
}
