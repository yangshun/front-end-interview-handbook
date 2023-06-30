import clsx from 'clsx';
import { forwardRef, Fragment } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeDivideColor,
  themeTextColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { Menu, Transition } from '@headlessui/react';

type Props = Readonly<{
  email?: string;
  navItems: ReadonlyArray<NavLinkItem>;
  thumbnailUrl?: string;
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
  email,
  navItems,
  thumbnailUrl,
}: Props) {
  const intl = useIntl();

  return (
    <Menu as="div" className="relative inline-block shrink-0">
      <div className="flex">
        <Menu.Button
          className={clsx(
            'group inline-flex items-center justify-center',
            'rounded-full',
            'h-8 w-8',
            'transition-colors',
            'border border-neutral-300 dark:border-neutral-700',
            [
              'bg-white dark:bg-neutral-950',
              'hover:bg-neutral-100 dark:hover:bg-neutral-900',
            ],
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
          {thumbnailUrl ? (
            <img
              alt={intl.formatMessage({
                defaultMessage: 'Profile image',
                description: 'Alt text for user profile image',
                id: 'I619Rj',
              })}
              className="h-7 w-7 rounded-full"
              src={thumbnailUrl}
            />
          ) : (
            <RiAccountCircleLine className={clsx('h-5 w-5', themeTextColor)} />
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
            {email}
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
