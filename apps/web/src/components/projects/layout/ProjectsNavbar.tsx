import clsx from 'clsx';
import { RiMenuFill } from 'react-icons/ri';

import useUserProfile from '~/hooks/user/useUserProfile';

import LogoLink from '~/components/global/logos/LogoLink';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Button from '~/components/ui/Button';
import SlideOut from '~/components/ui/SlideOut';

import { ProjectsSidebarExpanded } from './sidebar/ProjectsSidebar';

type Props = Readonly<{
  className?: string;
}>;

export default function ProjectsNavbar({ className }: Props) {
  const { userProfile } = useUserProfile();

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
        {userProfile != null && <UserAvatar userProfile={userProfile} />}
        <SlideOut
          className="lg:hidden"
          enterFrom="start"
          isTitleHidden={true}
          padding={false}
          size="xs"
          trigger={
            <Button
              icon={RiMenuFill}
              isLabelHidden={true}
              label="Open menu"
              variant="secondary"
            />
          }>
          <ProjectsSidebarExpanded />
        </SlideOut>
      </div>
    </div>
  );
}
