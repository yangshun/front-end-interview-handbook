import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import type { InterviewsPurchasePremiumFeature } from '~/components/interviews/purchase/InterviewsPurchaseTypes';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import SponsorsAdFormatSpotlightCard from '~/components/sponsors/ads/SponsorsAdFormatSpotlightCard';

import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import InterviewsStudyListSession from './InterviewsStudyListSession';

type Props = Omit<
  React.ComponentProps<typeof InterviewsPageHeader>,
  'sideElement'
> &
  Readonly<{
    overallProgress: ReadonlyArray<QuestionProgress>;
    progressTrackingAvailableToNonPremiumUsers?: boolean;
    purchaseFeature?: InterviewsPurchasePremiumFeature;
    questions: ReadonlyArray<QuestionMetadata>;
    studyListKey: string | null;
  }>;

export default function InterviewsStudyListPageTitleSection({
  purchaseFeature: feature,
  overallProgress,
  progressTrackingAvailableToNonPremiumUsers = false,
  questions,
  studyListKey,
  ...props
}: Props) {
  return (
    <InterviewsPageHeader
      className="flex-col lg:flex-row"
      {...props}
      sideElement={
        studyListKey ? (
          <InterviewsStudyListSession
            overallProgress={overallProgress}
            premiumFeature={feature}
            pricingDialogSearchParam_MUST_BE_UNIQUE_ON_PAGE="pricing_dialog"
            progressTrackingAvailableToNonPremiumUsers={
              progressTrackingAvailableToNonPremiumUsers
            }
            questionCount={questions.length}
            questions={questions}
            studyListKey={studyListKey}
            studyListTitle={props.title}
          />
        ) : (
          <SponsorsAdFormatSpotlightCard />
        )
      }
    />
  );
}
