import InterviewsMarketingEmbedSection from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedSection';
import type { EmbedUIQuestion } from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingForeword from '~/components/interviews/marketing/InterviewsMarketingForeword';
import InterviewsMarketingHeroNew from '~/components/interviews/marketing/InterviewsMarketingHeroNew';
import InterviewsMarketingOffersDontLieSection from '~/components/interviews/marketing/InterviewsMarketingOffersDontLieSection';
import InterviewsMarketingPlansSection from '~/components/interviews/marketing/InterviewsMarketingPlansSection';
import InterviewsMarketingPrepResourcesByBigTechEngineers from '~/components/interviews/marketing/InterviewsMarketingPrepResourcesByBigTechEngineers';
import InterviewsMarketingSimulateRealInterviews from '~/components/interviews/marketing/InterviewsMarketingSimulateRealInterviews';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import Section from '~/components/ui/Heading/HeadingContext';

import InterviewsMarketingHomePageBottomContainer from './InterviewsMarketingHomePageBottomContainer';

type Props = Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
  javaScriptQuestions: ReadonlyArray<QuestionMetadata>;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  uiCodingQuestion: EmbedUIQuestion;
  userInterfaceQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsMarketingHomePageNew({
  uiCodingQuestion,
  javaScriptEmbedExample,
  javaScriptQuestions,
  userInterfaceQuestions,
}: Props) {
  return (
    <main>
      <InterviewsMarketingHeroNew />
      <Section>
        <InterviewsMarketingEmbedSection
          featuredQuestions={[
            ...javaScriptQuestions,
            ...userInterfaceQuestions,
          ]}
          javaScriptEmbedExample={javaScriptEmbedExample}
          uiEmbedExample={uiCodingQuestion}
        />
        <InterviewsMarketingForeword />
        <InterviewsMarketingOffersDontLieSection />
        <InterviewsMarketingPrepResourcesByBigTechEngineers />
        <InterviewsMarketingPlansSection />
        <InterviewsMarketingSimulateRealInterviews />
        <InterviewsMarketingHomePageBottomContainer />
      </Section>
    </main>
  );
}
