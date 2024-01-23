import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import Anchor from '~/components/ui/Anchor';

type Props = Readonly<{
  profile: Readonly<{
    id: string;
    name: string | null;
    username: string;
  }>;
}>;

export default function ProjectsProfileDisplayNameLink({ profile }: Props) {
  const { username } = profile;

  return (
    <Anchor
      className="font-medium"
      href={`/projects/u/${username}`}
      variant="flat">
      <UserProfileDisplayName profile={profile} />
    </Anchor>
  );
}
