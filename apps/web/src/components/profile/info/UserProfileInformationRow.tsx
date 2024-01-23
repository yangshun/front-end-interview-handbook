import clsx from 'clsx';

import UserProfileExperience from '~/components/profile/info/UserProfileExperience';
import UserProfileTitle from '~/components/profile/info/UserProfileTitle';

type Size = 'sm' | 'xs';

type Props = Readonly<{
  profile: Readonly<{
    title: string | null;
  }>;
  size?: Size;
}>;

const gapClasses: Record<Size, string> = {
  sm: 'gap-x-4 gap-y-2',
  xs: 'gap-x-4 gap-y-0.5',
};

export default function UserProfileInformationRow({
  profile,
  size = 'sm',
}: Props) {
  return (
    <div className={clsx('flex items-center flex-wrap', gapClasses[size])}>
      <UserProfileTitle profile={profile} size={size} />
      <UserProfileExperience profile={profile} size={size} />
    </div>
  );
}
