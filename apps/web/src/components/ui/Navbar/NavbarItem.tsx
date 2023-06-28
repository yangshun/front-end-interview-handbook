import clsx from 'clsx';
import { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import {
  themeTextBrandColor,
  themeTextBrandHoverColor,
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
  const commonStyles = clsx(
    'inline-flex cursor-pointer items-center gap-2 px-3 py-1',
    'text-sm font-medium whitespace-nowrap',
    'group rounded-full',
    [
      'focus-visible:ring-brand-dark dark:focus-visible:ring-brand',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-transparent',
    ],
  );

  if (props.type === 'link') {
    return (
      <Anchor
        className={clsx(commonStyles, themeTextColor, themeTextBrandHoverColor)}
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
              commonStyles,
              open
                ? themeTextBrandColor
                : clsx(themeTextColor, themeTextBrandHoverColor),
            )}>
            <span>{label}</span>
            <RiArrowDownSLine
              aria-hidden="true"
              className={clsx(
                open ? themeTextSecondaryColor : themeTextSecondaryInvertColor,
                'h-5 w-5 group-hover:text-neutral-500',
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
                        'fixed z-10 -ml-4 mt-3 w-screen max-w-5xl transform lg:ml-0',
                        'left-1/2 -translate-x-1/2',
                      )}>
                      <NavbarPopover items={props.items} onClose={close} />
                    </Popover.Panel>
                  );
                case 'popover-tabs':
                  return (
                    <Popover.Panel
                      className={clsx(
                        // TODO: Increase max-width as number of items increase.
                        'fixed left-1/2 z-10 mt-3 w-screen max-w-5xl -translate-x-1/2 transform xl:absolute xl:left-auto xl:ml-0 xl:translate-x-0',
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
