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
    questionsSessionKey?: string;
  }>;

export default function InterviewsStudyListPageTitleSection({
  feature,
  overallProgress,
  progressTrackingAvailableToNonPremiumUsers = false,
  questions,
  questionsSessionKey,
  ...props
}: Props) {
  return (
    <InterviewsPageHeader
      className="flex-col lg:flex-row"
      {...props}
      sideElement={
        questionsSessionKey ? (
          <InterviewsStudyListSession
            feature={feature}
            overallProgress={overallProgress}
            progressTrackingAvailableToNonPremiumUsers={
              progressTrackingAvailableToNonPremiumUsers
            }
            questionCount={questions.length}
            questionListKey={questionsSessionKey}
            questions={questions}
          />
        ) : undefined
      }
    />
  );
}
