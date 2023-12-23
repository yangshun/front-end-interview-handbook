'use client';

import { FormattedMessage } from 'react-intl';

import RewardsFooter from '~/components/rewards/RewardsFooter';
import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/tasks/RewardsTaskList';

import Text from '../ui/Text';

type Props = Readonly<{
  isSignedIn: boolean;
}>;

export default function RewardsIntroPage({ isSignedIn }: Props) {
  return (
    <div className="flex flex-col gap-y-12 items-center max-w-lg w-full mx-auto">
      <RewardsHeader isSignedIn={isSignedIn} />
      <div className="flex flex-col gap-y-4 w-full">
        <Text color="secondary" display="block" size="body1">
          <FormattedMessage
            defaultMessage="Here are the tasks for this campaign:"
            description="Description for campaign tasks"
            id="oiMKy3"
          />
        </Text>
        <RewardsTaskList showActions={false} />
      </div>
      <RewardsFooter isSignedIn={isSignedIn} />
    </div>
  );
}
