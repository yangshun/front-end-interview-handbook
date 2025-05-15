import clsx from 'clsx';

import UserProfileExperience from '~/components/profile/info/UserProfileExperience';
import UserProfileTitle from '~/components/profile/info/UserProfileTitle';

type Size = 'body2' | 'body3';

type Props = Readonly<{
  size?: Size;
  userProfile: Readonly<{
    company: string | null;
    currentStatus: string | null;
    startWorkDate: Date | null;
    title: string | null;
  }>;
}>;

const gapClasses: Record<Size, string> = {
  body2: 'gap-y-2',
  body3: 'gap-y-0.5',
};

export default function UserProfileInformationRow({
  size = 'body2',
  userProfile,
}: Props) {
  if (
    userProfile.currentStatus == null &&
    userProfile.startWorkDate == null &&
    userProfile.title == null
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
      <UserProfileTitle size={size} userProfile={userProfile} />
      <UserProfileExperience size={size} userProfile={userProfile} />
    </div>
  );
}
