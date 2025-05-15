'use client';

import clsx from 'clsx';

import { themeDivideColor } from '~/components/ui/theme';

import type { Props as RewardsTaskProps } from './RewardsTaskItem';
import RewardsTaskItem from './RewardsTaskItem';

type Props = Readonly<{
  isDisabled?: boolean;
  tasks: ReadonlyArray<RewardsTaskProps>;
}>;

export default function RewardsTaskList({ isDisabled, tasks }: Props) {
  return (
    <div className={clsx(['divide-y', themeDivideColor])}>
      {tasks?.map((task) => (
        <RewardsTaskItem
          key={task.actionName}
          {...task}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
}
