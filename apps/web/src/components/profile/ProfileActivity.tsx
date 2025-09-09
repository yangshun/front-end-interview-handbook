'use client';

import { useState } from 'react';

import { useIntl } from '~/components/intl';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import ProfileActivityBookmarkedQuestions from './activity/ProfileActivityBookmarkedQuestions';
import ProfileActivityCompletedQuestions from './activity/ProfileActivityCompletedQuestions';

export default function ProfileActivity() {
  const intl = useIntl();
  const [selectedTab, setSelectedTab] = useState<'bookmarked' | 'completed'>(
    'bookmarked',
  );

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
        ]}
        value={selectedTab}
        onSelect={setSelectedTab}
      />
      {selectedTab === 'bookmarked' ? (
        <ProfileActivityBookmarkedQuestions />
      ) : (
        <ProfileActivityCompletedQuestions />
      )}
    </div>
  );
}
