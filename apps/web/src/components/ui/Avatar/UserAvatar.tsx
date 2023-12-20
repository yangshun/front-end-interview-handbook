import { useIntl } from 'react-intl';

import Avatar from './Avatar';

import type { Profile } from '@prisma/client';

type AvatarProps = React.ComponentProps<typeof Avatar>;
type UserAvatarProps = Readonly<
  Omit<AvatarProps, 'alt' | 'src'> & {
    profile?: Profile | null;
  }
>;

export default function UserAvatar({ profile, ...props }: UserAvatarProps) {
  const intl = useIntl();

  return (
    <Avatar
      {...props}
      alt={
        profile?.name ??
        intl.formatMessage({
          defaultMessage: 'Unknown user',
          description: 'Fallback text for unknown user',
          id: 'qfH1yK',
        })
      }
      src={profile?.avatarUrl ?? ''}
    />
  );
}
