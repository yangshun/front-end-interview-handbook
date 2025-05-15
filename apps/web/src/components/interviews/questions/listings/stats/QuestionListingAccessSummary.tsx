import clsx from 'clsx';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionListingAccessCount from '~/components/interviews/questions/listings/stats/QuestionListingAccessCount';

type Props = Readonly<{
  free: number;
  premium: number;
  standard: number;
}>;

export default function QuestionListingAccessSummary({
  free,
  premium,
  standard,
}: Props) {
  const { userProfile } = useUserProfile();

  if (userProfile?.isInterviewsPremium) {
    return null;
  }

  return (
    <div className={clsx('flex gap-2')}>
      {free > 0 && (
        <div className="flex-1">
          <QuestionListingAccessCount
            count={free + standard}
            totalCount={free + standard + premium}
            variant="free"
          />
        </div>
      )}
      {premium > 0 && (
        <div className="flex-1">
          <QuestionListingAccessCount count={premium} variant="premium" />
        </div>
      )}
    </div>
  );
}
