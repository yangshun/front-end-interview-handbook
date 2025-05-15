import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';

import { useAuthLogout, useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import DropdownMenu from '~/components/ui/DropdownMenu';

export default function SidebarAuthDropdownItem() {
  const { userProfile } = useUserProfile();
  const { navigateToSignInUpPage, signInUpLabel } = useAuthSignInUp();
  const { logoutLabel, navigateToLogoutPage } = useAuthLogout();

  return userProfile == null ? (
    <DropdownMenu.Item
      icon={RiLoginBoxLine}
      label={signInUpLabel}
      onClick={() => {
        navigateToSignInUpPage();
      }}
    />
  ) : (
    <DropdownMenu.Item
      icon={RiLogoutBoxLine}
      label={logoutLabel}
      onClick={() => {
        navigateToLogoutPage();
      }}
    />
  );
}
