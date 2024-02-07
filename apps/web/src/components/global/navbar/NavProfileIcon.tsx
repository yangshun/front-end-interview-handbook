import clsx from 'clsx';
import { forwardRef, Fragment } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
  themeDivideColor,
  themeTextColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { Menu, Transition } from '@headlessui/react';

type Props = Readonly<{
  avatarUrl?: string; // Can be name or email.
  navItems: ReadonlyArray<NavLinkItem>;
  userIdentifierString?: string;
}>;

const NavProfileLink = forwardRef<
  HTMLAnchorElement,
  NavLinkItem & Readonly<{ active: boolean }>
>(({ active, href, label, itemKey, ...rest }, ref) => {
  return (
    <Anchor
      key={itemKey}
      ref={ref}
      className={clsx(
        'block px-2 py-1.5',
        'w-full text-left text-sm',
        'rounded',
        themeTextSecondaryColor,
        active && 'bg-neutral-100 dark:bg-neutral-900',
      )}
      href={href}
      variant="unstyled"
      {...rest}>
      {label}
    </Anchor>
  );
});

export default function NavProfileIcon({
  userIdentifierString,
  navItems,
  avatarUrl,
}: Props) {
  return (
    <Menu as="div" className="relative inline-block shrink-0">
      <div className="flex">
        <Menu.Button
          className={clsx(
            'group inline-flex items-center justify-center',
            'rounded-full',
            'size-8',
            'transition-colors',
            ['border', themeBorderElementColor],
            themeBackgroundElementColor,
            themeBackgroundElementEmphasizedStateColor_Hover,
            themeBackgroundElementPressedStateColor_Active,
            [
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-brand-dark dark:focus-visible:outline-brand',
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
            <RiAccountCircleLine className={clsx('size-5', themeTextColor)} />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className={clsx(
            'absolute z-10 mt-2 w-64 py-1',
            'right-0 origin-top-right',
            ['divide-y', themeDivideColor],
            'rounded-md',
            themeBackgroundColor,
            ['border', 'border-transparent dark:border-neutral-700'],
            'shadow-lg',
            'ring-brand ring-1 ring-opacity-5 focus:outline-none',
          )}>
          <Text
            className="truncate px-3.5 py-3"
            display="block"
            size="body2"
            weight="bold">
            {userIdentifierString}
          </Text>
          <div className="p-2" role="none">
            {navItems.map((navItem) => (
              <Menu.Item key={navItem.itemKey}>
                {({ active }) => (
                  <NavProfileLink active={active} {...navItem} />
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
