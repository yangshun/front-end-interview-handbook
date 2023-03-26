import { forwardRef, Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';

import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
type Props = Readonly<{
  email?: string;
  navItems: ReadonlyArray<NavLinkItem>;
  thumbnailUrl?: string;
}>;

const MyLink = forwardRef<HTMLAnchorElement, NavLinkItem>(
  ({ href, label, key, ...rest }: NavLinkItem, ref) => {
    return (
      <Anchor
        key={key}
        ref={ref}
        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        href={href}
        variant="unstyled"
        {...rest}>
        {label}
      </Anchor>
    );
  },
);

export default function NavProfileIcon({
  email,
  navItems,
  thumbnailUrl,
}: Props) {
  const intl = useIntl();

  return (
    <Menu as="div" className="relative flex-shrink-0">
      <div>
        <Menu.Button className="focus:ring-brand-500 flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
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
            <UserCircleIcon className="h-7 w-7 text-slate-500" />
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
        <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-slate-200 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <p className="truncate py-3 px-3.5 text-sm" role="none">
            <span className="mt-0.5 font-semibold" role="none">
              {email}
            </span>
          </p>
          <div className="py-1.5" role="none">
            {navItems.map(({ key, ...others }) => (
              <Menu.Item key={key}>
                <MyLink key={key} {...others} />
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
