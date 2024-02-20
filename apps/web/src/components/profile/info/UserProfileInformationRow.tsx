import clsx from 'clsx';

import UserProfileExperience from '~/components/profile/info/UserProfileExperience';
import UserProfileTitle from '~/components/profile/info/UserProfileTitle';

type Size = 'body2' | 'body3';

type Props = Readonly<{
  profile: Readonly<{
    currentStatus: string | null;
    startWorkDate: Date | null;
    title: string | null;
  }>;
  size?: Size;
}>;

const gapClasses: Record<Size, string> = {
  body2: 'gap-y-2',
  body3: 'gap-y-0.5',
};

export default function UserProfileInformationRow({
  profile,
  size = 'body2',
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
        'flex flex-wrap items-center',
        'gap-x-4',
        gapClasses[size],
      )}>
      <UserProfileTitle profile={profile} size={size} />
      <UserProfileExperience profile={profile} size={size} />
    </div>
  );
}
