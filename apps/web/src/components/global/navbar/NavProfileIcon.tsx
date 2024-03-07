import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import EmptyAvatarIcon from '~/components/common/EmptyAvatarIcon';
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

import { Content, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';

type Props = Readonly<{
  avatarUrl?: string; // Can be name or email.
  navItems: ReadonlyArray<NavLinkItem>;
  userIdentifierString?: string;
}>;

export default function NavProfileIcon({
  userIdentifierString,
  navItems,
  avatarUrl,
}: Props) {
  return (
    <Root>
      <Trigger
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
        {avatarUrl ? (
          <img
            alt={userIdentifierString}
            className="size-7 rounded-full"
            src={avatarUrl}
          />
        ) : (
          <EmptyAvatarIcon className="size-8" />
        )}
      </Trigger>
      <Portal>
        <Content
          align="end"
          className={dropdownContentClassName}
          sideOffset={8}>
          <Text
            className="truncate px-2 py-1"
            display="block"
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
        </Content>
      </Portal>
    </Root>
  );
}
