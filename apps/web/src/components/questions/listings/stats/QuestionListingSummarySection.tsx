import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionListingDifficultySummary from '~/components/questions/listings/stats/QuestionListingDifficultySummary';
import QuestionListingQuestionCount from '~/components/questions/listings/stats/QuestionListingQuestionCount';

import type { QuestionDifficulty } from '../../common/QuestionsTypes';

type Props = Readonly<{
  free: number;
  premium: number;
}> &
  Record<QuestionDifficulty, number>;

export default function QuestionListingSummarySection({
  free,
  premium,
  easy,
  medium,
  hard,
}: Props) {
  const { userProfile } = useUserProfile();

  return (
    <section className="flex flex-col gap-2">
      {!userProfile?.isPremium && (
        <div className="flex gap-2">
          {free > 0 && (
            <div className="flex-1">
              <QuestionListingQuestionCount count={free} variant="free" />
            </div>
          )}
          {premium > 0 && (
            <div className="flex-1">
              <QuestionListingQuestionCount count={premium} variant="premium" />
            </div>
          )}
        </div>
      )}
      <QuestionListingDifficultySummary
        easy={easy}
        hard={hard}
        medium={medium}
      />
    </section>
  );
}
