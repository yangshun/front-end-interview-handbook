import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import InterviewsDashboardCreateAccountCard from '../dashboard/InterviewsDashboardCreateAccountCard';

import { useUser } from '@supabase/auth-helpers-react';

export default function InterviewsDashboardPageHeader() {
  const user = useUser();
  const isLoggedIn = user != null;

  return (
    <div
      className={clsx(
        'grid grid-cols-1 items-stretch justify-between gap-x-2 gap-y-4 sm:flex sm:flex-row',
      )}>
      {isLoggedIn ? (
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Dashboard"
            description="Label for dashboard title for logged in user"
            id="TW5R5d"
          />
        </Heading>
      ) : (
        <div className="flex flex-col gap-3">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Get started"
              description="Label for dashboard title for guest"
              id="mYn2DH"
            />
          </Heading>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="The one-stop page to prepare fully for your front end interviews."
              description="Description for get started in dashboard"
              id="DgT+f8"
            />
          </Text>
        </div>
      )}
      {!isLoggedIn && <InterviewsDashboardCreateAccountCard />}
    </div>
  );
}
