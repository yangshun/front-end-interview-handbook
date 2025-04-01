'use client';

import clsx from 'clsx';

import useUserProfile from '~/hooks/user/useUserProfile';

import SupabaseAuthUpdatePassword from '~/components/auth/SupabaseAuthUpdatePassword';
import Timestamp from '~/components/common/datetime/Timestamp';
import { FormattedMessage, useIntl } from '~/components/intl';
import ProfileAccountEmail from '~/components/profile/fields/ProfileAccountEmail';
import Heading from '~/components/ui/Heading';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import { useUser } from '@supabase/auth-helpers-react';

export default function ProjectsSettingsGeneralPage() {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const user = useUser();

  if (userProfile == null) {
    return (
      <div className="py-10">
        <Spinner display="block" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <Heading level="heading5">
            {intl.formatMessage({
              defaultMessage: 'Account settings',
              description: 'Account settings label',
              id: 's1ib7q',
            })}
          </Heading>
          <Text color="secondary" size="body2">
            {intl.formatMessage({
              defaultMessage: 'Joined on',
              description: 'Joined on label',
              id: '4W9OGS',
            })}
            <Timestamp date={userProfile.createdAt} />
          </Text>
        </div>
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="General account settings. Shared across all GreatFrontEnd products."
            description="Description for general account settings"
            id="zAl/H8"
          />
        </Text>
      </div>
      <div className="flex flex-col gap-6 md:max-w-md">
        {user && <ProfileAccountEmail user={user} />}
        <div className="flex flex-col gap-6 md:max-w-md">
          <div className={clsx('rounded-lg p-4', ['border', themeBorderColor])}>
            <SupabaseAuthUpdatePassword showTitle={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
