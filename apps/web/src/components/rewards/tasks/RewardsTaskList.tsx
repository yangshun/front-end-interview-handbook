'use client';

import clsx from 'clsx';

import { themeDivideColor } from '~/components/ui/theme';

import RewardsGitHubFollowTask from './RewardsGitHubFollowTask';
import RewardsGitHubStarTask from './RewardsGitHubStarTask';
import RewardsLinkedInFollowTask from './RewardsLinkedInFollowTask';

type Props = Readonly<{
  showActions: boolean;
}>;

export default function RewardsTaskList({ showActions }: Props) {
  // TODO: get tasks completed (pending DB setup) and redirect to completed page
  return (
    <div className={clsx('divide-y', themeDivideColor)}>
      <RewardsGitHubStarTask showActions={showActions} />
      <RewardsGitHubFollowTask showActions={showActions} />
      <RewardsLinkedInFollowTask showActions={showActions} />
    </div>
  );
}
