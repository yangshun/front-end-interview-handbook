import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionListingQuestionCount from '~/components/interviews/questions/listings/stats/QuestionListingQuestionCount';

type Props = Readonly<{
  free: number;
  premium: number;
}>;

export default function QuestionListingSummarySection({
  free,
  premium,
}: Props) {
  const { userProfile } = useUserProfile();

  if (!userProfile?.isInterviewsPremium) {
    return null;
  }

  return (
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
  );
}
