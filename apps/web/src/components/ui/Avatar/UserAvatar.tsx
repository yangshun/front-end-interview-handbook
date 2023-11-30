import { useIntl } from 'react-intl';

import Avatar from './Avatar';

import type { User } from '@supabase/supabase-js';

type AvatarProps = React.ComponentProps<typeof Avatar>;
type UserAvatarProps = Readonly<
  Omit<AvatarProps, 'src' | 'userName'> & {
    user?: User;
  }
>;

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  const intl = useIntl();

  return (
    <Avatar
      {...props}
      src={user?.user_metadata?.avatar_url ?? undefined}
      userName={
        user?.user_metadata?.name ??
        user?.email ??
        intl.formatMessage({
          defaultMessage: 'Unknown user',
          description: 'Fallback text for unknown user',
          id: 'qfH1yK',
        })
      }
    />
  );
}
