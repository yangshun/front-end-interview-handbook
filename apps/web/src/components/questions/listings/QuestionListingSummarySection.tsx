import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionListingDifficultySummary from '~/components/questions/listings/card/QuestionListingDifficultySummary';
import QuestionListingQuestionCount from '~/components/questions/listings/card/QuestionListingQuestionCount';

import type { QuestionDifficulty } from '../common/QuestionsTypes';

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
    <section className="grid grid-cols-2 gap-2">
      {!userProfile?.isPremium && (
        <>
          <QuestionListingQuestionCount count={free} variant="free" />
          <QuestionListingQuestionCount count={premium} variant="premium" />
        </>
      )}
      <div className="col-span-2">
        <QuestionListingDifficultySummary
          easy={easy}
          hard={hard}
          medium={medium}
        />
      </div>
    </section>
  );
}
