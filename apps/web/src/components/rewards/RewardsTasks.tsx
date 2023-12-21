'use client';

import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/RewardsTaskList';

export default function RewardsTasks() {
  return (
    <div className="relative isolate lg:mx-8">
      <RewardsHeader isSignedIn={true} />
      <RewardsTaskList hasEntered={true} />
    </div>
  );
}
