import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import type {
  QuestionFeatureType,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import InterviewsStudyListSession from './InterviewsStudyListSession';

type Props = React.ComponentProps<typeof InterviewsPageHeader> &
  Readonly<{
    feature?: QuestionFeatureType;
    overallProgress: ReadonlyArray<QuestionProgress>;
    progressTrackingAvailableToNonPremiumUsers?: boolean;
    questions: ReadonlyArray<QuestionMetadata>;
    studyListKey: string | null;
  }>;

export default function InterviewsStudyListPageTitleSection({
  feature,
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
            feature={feature}
            overallProgress={overallProgress}
            pricingDialogSearchParam_MUST_BE_UNIQUE_ON_PAGE="pricing_dialog"
            progressTrackingAvailableToNonPremiumUsers={
              progressTrackingAvailableToNonPremiumUsers
            }
            questionCount={questions.length}
            questions={questions}
            studyListKey={studyListKey}
            studyListTitle={props.title}
          />
        ) : undefined
      }
    />
  );
}
