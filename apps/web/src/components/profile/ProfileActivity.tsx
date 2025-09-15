'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import useInterviewsNotificationUnreadCount from '~/components/interviews/notifications/hooks/useInterviewsNotificationUnreadCount';
import { useIntl } from '~/components/intl';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import ProfileActivityBookmarkedQuestions from './activity/ProfileActivityBookmarkedQuestions';
import ProfileActivityCompletedQuestions from './activity/ProfileActivityCompletedQuestions';
import ProfileActivityNotifications from './activity/ProfileActivityNotifications';

export default function ProfileActivity() {
  const intl = useIntl();
  const params = useSearchParams();
  const tabParam = params?.get('tab');
  const unreadCount = useInterviewsNotificationUnreadCount();

  const [selectedTab, setSelectedTab] = useState<
    'bookmarked' | 'completed' | 'notifications'
  >(tabParam === 'notifications' ? 'notifications' : 'bookmarked');

  function renderTabContent() {
    // Switch case
    switch (selectedTab) {
      case 'bookmarked':
        return <ProfileActivityBookmarkedQuestions />;
      case 'completed':
        return <ProfileActivityCompletedQuestions />;
      case 'notifications':
        return <ProfileActivityNotifications />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col gap-y-6">
      <TabsUnderline
        size="xs"
        tabs={[
          {
            label: intl.formatMessage({
              defaultMessage: 'Bookmarked questions',
              description: 'Tab label for bookmarked questions',
              id: 'd9t0vu',
            }),
            value: 'bookmarked',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Completed questions',
              description: 'Tab label for completed questions',
              id: 'DkM28k',
            }),
            value: 'completed',
          },
          {
            label:
              unreadCount > 0
                ? intl.formatMessage(
                    {
                      defaultMessage: 'Notifications ({unreadCount})',
                      description:
                        'Tab label for notifications with unread count',
                      id: 'gHWMf6',
                    },
                    { unreadCount },
                  )
                : intl.formatMessage({
                    defaultMessage: 'Notifications',
                    description: 'Tab label for notifications',
                    id: 'N9knOD',
                  }),
            value: 'notifications',
          },
        ]}
        value={selectedTab}
        onSelect={setSelectedTab}
      />
      {renderTabContent()}
    </div>
  );
}
