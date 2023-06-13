import clsx from 'clsx';
import { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import {
  themeTextBrandColor,
  themeTextColor,
  themeTextSecondaryColor,
  themeTextSecondaryInvertColor,
} from '~/components/ui/theme';

import NavbarPopover from './NavbarPopover';
import NavbarPopoverTabs from './NavbarPopoverTabs';
import type { NavbarPrimaryItem } from './NavTypes';
import Anchor from '../Anchor';

import { Popover, Transition } from '@headlessui/react';

export default function NavbarItem({
  onClick,
  label,
  ...props
}: NavbarPrimaryItem) {
  if (props.type === 'link') {
    return (
      <Anchor
        className={clsx(
          'hover:text-brand flex cursor-pointer items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-medium',
          themeTextColor,
        )}
        href={props.href}
        suppressHydrationWarning={true}
        variant="unstyled"
        onClick={onClick}>
        {label} {props.labelAddon}
      </Anchor>
    );
  }

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={clsx(
              open ? themeTextBrandColor : themeTextColor,
              'focus:ring-brand group inline-flex items-center rounded-full px-3 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
            )}>
            <span>{label}</span>
            <RiArrowDownSLine
              aria-hidden="true"
              className={clsx(
                open ? themeTextSecondaryColor : themeTextSecondaryInvertColor,
                'ml-2 h-5 w-5 group-hover:text-neutral-500',
              )}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            {(() => {
              switch (props.type) {
                case 'popover':
                  return (
                    <Popover.Panel
                      className={clsx(
                        // TODO: Increase max-width as number of items increase.
                        'absolute z-10 -ml-4 mt-3 w-screen max-w-md transform lg:ml-0',
                        props.items.length === 2 && 'lg:max-w-4xl',
                        props.items.length === 3 && 'lg:max-w-5xl',
                        props.items.length === 4 && 'lg:max-w-6xl',
                      )}>
                      <NavbarPopover items={props.items} onClose={close} />
                    </Popover.Panel>
                  );
                case 'popover-tabs':
                  return (
                    <Popover.Panel
                      className={clsx(
                        // TODO: Increase max-width as number of items increase.
                        'fixed left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform xl:absolute xl:left-auto xl:ml-0 xl:translate-x-0',
                        props.items.length === 2 && 'lg:max-w-4xl',
                        props.items.length === 3 && 'lg:max-w-5xl',
                      )}>
                      <NavbarPopoverTabs items={props.items} onClose={close} />
                    </Popover.Panel>
                  );
              }
            })()}
          </Transition>
        </>
      )}
    </Popover>
  );
}
