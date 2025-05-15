type Props = Readonly<{
  userProfile: Readonly<{
    id: string;
    name: string | null;
    username: string;
  }>;
}>;

export default function UserProfileDisplayName({ userProfile }: Props) {
  const { name, username } = userProfile;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{name ?? username}</>;
}
