import clsx from 'clsx';
import { RiMenuFill } from 'react-icons/ri';

import useProfile from '~/hooks/user/useProfile';

import LogoLink from '~/components/global/Logo';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Button from '~/components/ui/Button';

type Props = Readonly<{
  className?: string;
  onMenuClick?: () => void;
}>;

export default function ProjectsNavbar({ className, onMenuClick }: Props) {
  const { profile } = useProfile();

  return (
    <div
      className={clsx(
        'flex h-[var(--navbar-height)] items-center justify-between p-4',
        className,
      )}>
      <div className="flex items-center justify-start lg:w-0 lg:grow">
        <LogoLink href="/projects" />
      </div>
      <div className="-my-2 flex gap-4 sm:-mr-2 lg:hidden">
        {profile != null && <UserAvatar profile={profile} />}
        <Button
          icon={RiMenuFill}
          isLabelHidden={true}
          label="Open menu"
          variant="secondary"
          onClick={onMenuClick}
        />
      </div>
    </div>
  );
}
