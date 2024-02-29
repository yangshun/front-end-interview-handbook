import Avatar from './Avatar';

type AvatarProps = React.ComponentProps<typeof Avatar>;
type UserAvatarProps = Readonly<
  Omit<AvatarProps, 'alt' | 'src'> & {
    userProfile?: Readonly<{
      avatarUrl: string | null;
      name: string | null;
      username: string;
    }> | null;
  }
>;

export default function UserAvatar({ userProfile, ...props }: UserAvatarProps) {
  return (
    <Avatar
      {...props}
      alt={userProfile?.name ?? userProfile?.username ?? ''}
      src={userProfile?.avatarUrl ?? ''}
    />
  );
}
