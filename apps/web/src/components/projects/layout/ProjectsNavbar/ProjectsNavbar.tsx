import clsx from 'clsx';
import { RiMenuFill } from 'react-icons/ri';

import LogoLink from '~/components/global/Logo';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';

import type { User } from '@supabase/supabase-js';

type Props = Readonly<{
  className?: string;
  onMenuClick?: () => void;
  user: User | null;
}>;

export default function ProjectsNavbar({
  className,
  user,
  onMenuClick,
}: Props) {
  return (
    <div
      className={clsx(
        'flex h-[var(--navbar-height)] items-center justify-between p-4',
        className,
      )}>
      <div className="flex items-center justify-start lg:w-0 lg:grow">
        <LogoLink />
      </div>
      <div className="-my-2 flex gap-4 sm:-mr-2 lg:hidden">
        {user && (
          <Avatar
            src={user?.user_metadata?.avatar_url ?? undefined}
            userName={user?.user_metadata?.name ?? user?.email ?? 'Unknown'}
          />
        )}
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
