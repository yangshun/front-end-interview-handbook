'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import RewardsFooter from '~/components/rewards/RewardsFooter';
import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/tasks/RewardsTaskList';
import Text from '~/components/ui/Text';

import RewardsCompletePromoCode from './complete/RewardsCompletePromoCode';
import { useRewardsTasks } from './tasks/useRewardsTasks';

export default function RewardsIntroPage() {
  const user = useUser();
  const { data, isLoading } = trpc.promotions.getSocialTasksPromoCode.useQuery(
    undefined,
    {
      enabled: user != null,
    },
  );
  const tasks = useRewardsTasks();
  const tasksWithStatus = tasks.map((task) => ({
    ...task,
    status: 'none' as const,
  }));

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-y-10',
        'mx-auto w-full max-w-lg',
      )}>
      <RewardsHeader />
      {isLoading ||
      data == null ||
      (data?.activePromoCode == null && data?.canStillGenerate) ? (
        <>
          <div className={clsx('flex flex-col gap-y-3', 'w-full')}>
            <Text className="block" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="Here are the tasks for this campaign:"
                description="Description for campaign tasks"
                id="oiMKy3"
              />
            </Text>
            <RewardsTaskList isDisabled={isLoading} tasks={tasksWithStatus} />
          </div>
          <RewardsFooter isDisabled={user != null && isLoading} />
        </>
      ) : (
        <RewardsCompletePromoCode
          canStillGenerate={data.canStillGenerate}
          promoCode={data.activePromoCode}
        />
      )}
    </div>
  );
}
