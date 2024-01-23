import clsx from 'clsx';

import UserProfileExperience from '~/components/profile/info/UserProfileExperience';
import UserProfileTitle from '~/components/profile/info/UserProfileTitle';

type Size = 'sm' | 'xs';

type Props = Readonly<{
  profile: Readonly<{
    currentStatus: string | null;
    startWorkDate: Date | null;
    title: string | null;
  }>;
  size?: Size;
}>;

const gapClasses: Record<Size, string> = {
  sm: 'gap-y-2',
  xs: 'gap-y-0.5',
};

export default function UserProfileInformationRow({
  profile,
  size = 'sm',
}: Props) {
  if (
    profile.currentStatus == null &&
    profile.startWorkDate == null &&
    profile.title == null
  ) {
    return null;
  }

  return (
    <div
      className={clsx(
        'flex items-center flex-wrap',
        'gap-x-4',
        gapClasses[size],
      )}>
      <UserProfileTitle profile={profile} size={size} />
      <UserProfileExperience profile={profile} size={size} />
    </div>
  );
}
