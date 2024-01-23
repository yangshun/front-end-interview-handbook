type Props = Readonly<{
  profile: Readonly<{
    id: string;
    name: string | null;
    username: string;
  }>;
}>;

export default function UserProfileDisplayName({ profile }: Props) {
  const { username, name } = profile;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{name ?? username}</>;
}
