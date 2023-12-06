import { useIntl } from 'react-intl';

import type { User } from '@supabase/supabase-js';

// TODO(projects): Read from Profile table.
export default function useUserName(user: User | null) {
  const intl = useIntl();

  if (user === null) {
    return intl.formatMessage({
      defaultMessage: 'Anonymous',
      description: 'Fallback user name for a non-logged in user',

      id: 'ZpzyjO',
    });
  }

  return (
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata.user_name as string | undefined) ??
    user.email
  );
}
