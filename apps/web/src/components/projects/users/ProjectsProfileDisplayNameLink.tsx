import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import Anchor from '~/components/ui/Anchor';

type Props = Readonly<{
  userProfile: Readonly<{
    id: string;
    name: string | null;
    username: string;
  }>;
}>;

export default function ProjectsProfileDisplayNameLink({ userProfile }: Props) {
  const { username } = userProfile;

  return (
    <Anchor
      className="font-medium"
      href={`/projects/u/${username}`}
      variant="flat">
      <UserProfileDisplayName userProfile={userProfile} />
    </Anchor>
  );
}
