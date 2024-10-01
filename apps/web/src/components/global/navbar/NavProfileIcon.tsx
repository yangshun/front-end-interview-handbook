import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import { dropdownContentClassName } from '~/components/ui/DropdownMenu/dropdownStyles';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type Props = Readonly<{
  avatarUrl?: string; // Can be name or email.
  navItems: ReadonlyArray<NavLinkItem>;
  userIdentifierString?: string;
}>;

export default function NavProfileIcon({
  avatarUrl,
  userIdentifierString,
  navItems,
}: Props) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger
        className={clsx(
          'group inline-flex shrink-0 items-center justify-center',
          'rounded-full',
          'size-8',
          'transition-colors',
          ['border', themeBorderElementColor],
          themeBackgroundElementColor,
          themeBackgroundElementEmphasizedStateColor_Hover,
          themeBackgroundElementPressedStateColor_Active,
          [
            themeOutlineElement_FocusVisible,
            themeOutlineElementBrandColor_FocusVisible,
          ],
        )}>
        <span className="sr-only">
          <FormattedMessage
            defaultMessage="Open navigation profile menu"
            description="Screenreader text to open the profile menu"
            id="EjbpUe"
          />
        </span>
        <Avatar alt={userIdentifierString ?? ''} src={avatarUrl} />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          className={dropdownContentClassName}
          sideOffset={8}>
          <Text
            className="display truncate px-2 py-1"
            size="body2"
            weight="bold">
            {userIdentifierString}
          </Text>
          <Divider className="-mx-2 my-1" />
          <div>
            {navItems.map((navItem) => (
              <DropdownMenu.Item key={navItem.itemKey} {...navItem} />
            ))}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
