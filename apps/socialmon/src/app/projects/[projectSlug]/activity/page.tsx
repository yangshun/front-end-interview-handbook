import ActivityLogList from '~/components/activity/ActivityLogList';

import { Title } from '@mantine/core';

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Title order={2}>Activity Log</Title>
      <div className="pb-6">
        <ActivityLogList />
      </div>
    </div>
  );
}
