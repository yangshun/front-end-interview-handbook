'use client';

import clsx from 'clsx';

import { themeDivideColor } from '~/components/ui/theme';

import type { Props as RewardsTaskProps } from './RewardsTaskItem';
import RewardsTaskItem from './RewardsTaskItem';

type Props = Readonly<{
  tasks: ReadonlyArray<RewardsTaskProps>;
}>;

export default function RewardsTaskList({ tasks }: Props) {
  return (
    <div className={clsx(['divide-y', themeDivideColor])}>
      {tasks?.map((task) => (
        <RewardsTaskItem key={task.actionName} {...task} />
      ))}
    </div>
  );
}
