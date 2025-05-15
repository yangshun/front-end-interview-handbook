import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { RiStarSmileFill } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Chip from '~/components/ui/Chip';
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

type Props = Readonly<{
  avatarUrl?: string;
  isPremium?: boolean;
  navItems: ReadonlyArray<NavLinkItem>;
  userIdentifierString?: string; // Can be name or email.
}>;

export default function NavProfileIcon({
  avatarUrl,
  isPremium,
  navItems,
  userIdentifierString,
}: Props) {
  const intl = useIntl();

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger
        className={clsx(
          'group inline-flex shrink-0 items-center justify-center',
          'rounded-full',
          'size-7',
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
        <Avatar alt={userIdentifierString ?? ''} size="xs" src={avatarUrl} />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          className={clsx(dropdownContentClassName, 'max-w-52')}
          sideOffset={8}>
          <div className="flex items-center">
            <Text
              className="display truncate px-2 py-1"
              size="body2"
              weight="bold">
              {userIdentifierString}
            </Text>
            {isPremium && (
              <Chip
                className="size-[18px]"
                icon={RiStarSmileFill}
                iconClassName="size-[14px]"
                isLabelHidden={true}
                label={intl.formatMessage({
                  defaultMessage: 'Premium user badge',
                  description: 'Premium user badge',
                  id: 'ofoywG',
                })}
                variant="primary"
              />
            )}
          </div>
          <Divider className="my-1" />
          <div>
            {navItems.map((navItem) => (
              <DropdownMenu.Item
                key={navItem.id}
                {...navItem}
                icon={undefined}
              />
            ))}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
