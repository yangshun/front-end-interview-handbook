import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import Anchor from '~/components/ui/Anchor';
import type { TextColor } from '~/components/ui/Text';
import { textVariants } from '~/components/ui/Text';

type Props = Readonly<{
  color?: TextColor;
  userProfile: Readonly<{
    id: string;
    name: string | null;
    username: string;
  }>;
}>;

export default function ProjectsProfileDisplayNameLink({
  color = 'default',
  userProfile,
}: Props) {
  const { username } = userProfile;

  return (
    <Anchor
      className={textVariants({
        color,
        weight: 'medium',
      })}
      href={`/projects/u/${username}`}
      variant="flat">
      <UserProfileDisplayName userProfile={userProfile} />
    </Anchor>
  );
}
