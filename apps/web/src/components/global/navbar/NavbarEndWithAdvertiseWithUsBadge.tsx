import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';

import SponsorsAdvertiseWithUsBadge from '~/components/sponsors/SponsorsAdvertiseWithUsBadge';
import NavbarEnd from '~/components/ui/Navbar/NavbarEnd';

type Props = Omit<React.ComponentProps<typeof NavbarEnd>, 'className'> &
  Readonly<{
    hideAdvertiseWithUsBadge?: boolean;
    isPremium: boolean;
  }>;

export default function NavbarEndWithAdvertiseWithUsBadge({
  hideAdvertiseWithUsBadge,
  isLoading,
  isPremium,
  ...props
}: Props) {
  const user = useUser();
  const isLoggedIn = user != null;

  return (
    <div
      className={clsx('flex grow items-center justify-end lg:grow-0', 'gap-8')}>
      {!hideAdvertiseWithUsBadge &&
        (isLoggedIn && isPremium ? (
          <div className="hidden sm:flex">
            <SponsorsAdvertiseWithUsBadge />
          </div>
        ) : (
          <div
            className={clsx(
              'hidden min-[1200px]:flex',
              isLoading ? 'opacity-0' : 'opacity-100',
            )}>
            <SponsorsAdvertiseWithUsBadge />
          </div>
        ))}
      <NavbarEnd
        isLoading={isLoading}
        {...props}
        className={clsx('flex items-center gap-x-8')}
      />
    </div>
  );
}
