import InterviewsMarketingEmbedSection from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedSection';
import type { EmbedUIQuestion } from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingHeroNew from '~/components/interviews/marketing/InterviewsMarketingHeroNew';
import InterviewsMarketingOffersDontLieSection from '~/components/interviews/marketing/InterviewsMarketingOffersDontLieSection';
import InterviewsMarketingPrepResourcesByBigTechEngineers from '~/components/interviews/marketing/InterviewsMarketingPrepResourcesByBigTechEngineers';
import InterviewsMarketingSimulateRealInterviews from '~/components/interviews/marketing/InterviewsMarketingSimulateRealInterviews';
import InterviewsMarketingYangshunForeword from '~/components/interviews/marketing/InterviewsMarketingYangshunForeword';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

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
      <InterviewsMarketingEmbedSection
        featuredQuestions={[...javaScriptQuestions, ...userInterfaceQuestions]}
        javaScriptEmbedExample={javaScriptEmbedExample}
        uiEmbedExample={uiCodingQuestion}
      />
      <InterviewsMarketingYangshunForeword />
      <InterviewsMarketingOffersDontLieSection />
      <InterviewsMarketingPrepResourcesByBigTechEngineers />
      <InterviewsMarketingSimulateRealInterviews />
    </main>
  );
}
