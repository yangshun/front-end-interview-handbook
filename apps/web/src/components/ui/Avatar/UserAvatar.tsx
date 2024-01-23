import Avatar from './Avatar';

type AvatarProps = React.ComponentProps<typeof Avatar>;
type UserAvatarProps = Readonly<
  Omit<AvatarProps, 'alt' | 'src'> & {
    profile?: Readonly<{
      avatarUrl: string | null;
      name: string | null;
      username: string;
    }> | null;
  }
>;

export default function UserAvatar({ profile, ...props }: UserAvatarProps) {
  return (
    <Avatar
      {...props}
      alt={profile?.name ?? profile?.username ?? ''}
      src={profile?.avatarUrl ?? ''}
    />
  );
}
