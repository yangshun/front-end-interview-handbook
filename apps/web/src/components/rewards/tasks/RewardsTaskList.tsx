'use client';

import clsx from 'clsx';

import { themeDivideColor, themeLineColor } from '~/components/ui/theme';

import type { Props as RewardsTaskProps } from './RewardsTaskItem';
import RewardsTaskItem from './RewardsTaskItem';

type Props = Readonly<{
  tasks: ReadonlyArray<RewardsTaskProps>;
}>;

export default function RewardsTaskList({ tasks }: Props) {
  return (
    <div
      className={clsx(
        ['divide-y', themeDivideColor],
        ['border-b', themeLineColor],
      )}>
      {tasks?.map((task) => (
        <RewardsTaskItem key={task.actionName} {...task} />
      ))}
    </div>
  );
}
