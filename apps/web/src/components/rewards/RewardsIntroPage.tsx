'use client';

import { FormattedMessage } from '~/components/intl';
import RewardsFooter from '~/components/rewards/RewardsFooter';
import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/tasks/RewardsTaskList';
import Text from '~/components/ui/Text';

import { useRewardsTasks } from './tasks/useRewardsTasks';

export default function RewardsIntroPage() {
  const tasks = useRewardsTasks();
  const tasksWithStatus = tasks.map((task) => ({
    ...task,
    status: 'none' as const,
  }));

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-y-10">
      <RewardsHeader />
      <div className="flex w-full flex-col gap-y-3">
        <Text className="block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Here are the tasks for this campaign:"
            description="Description for campaign tasks"
            id="oiMKy3"
          />
        </Text>
        <RewardsTaskList tasks={tasksWithStatus} />
      </div>
      <RewardsFooter />
    </div>
  );
}
