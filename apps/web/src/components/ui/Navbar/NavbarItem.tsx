import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDebounceValue } from 'usehooks-ts';

import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextColor,
  themeTextSecondaryColor,
  themeTextSecondaryInvertColor,
} from '~/components/ui/theme';

import Anchor from '../Anchor';
import { anchorVariants } from '../Anchor/AnchorStyles';
import NavbarPopover from './NavbarPopover';
import NavbarPopoverTabs from './NavbarPopoverTabs';
import type { NavbarTopLevelItem } from './NavTypes';

export default function NavbarItem({
  label,
  onClick,
  ...props
}: NavbarTopLevelItem) {
  const [debouncedOpen, setOpen] = useDebounceValue(false, 100);
  const [isClicked, setIsClicked] = useState(false);

  function handleMouseEnter() {
    setOpen(true);
  }

  function handleMouseLeave() {
    setOpen(false);
  }

  const commonStyles = clsx(
    'group',
    'inline-flex items-center gap-2',
    'py-1',
    'rounded-full',
    'text-sm font-medium whitespace-nowrap',
    'cursor-pointer',
    [
      themeOutlineElement_FocusVisible,
      themeOutlineElementBrandColor_FocusVisible,
    ],
  );

  if (props.type === 'link') {
    return (
      <Anchor
        className={clsx(
          commonStyles,
          themeTextColor,
          themeTextBrandColor_Hover,
          'hover:underline dark:hover:no-underline',
        )}
        href={props.href}
        prefetch={null}
        suppressHydrationWarning={props.suppressHydrationWarning}
        variant="unstyled"
        onClick={onClick}>
        {label} {props.labelAddon}
      </Anchor>
    );
  }

  return (
    <PopoverPrimitive.Root open={debouncedOpen} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        className={clsx(
          commonStyles,
          anchorVariants({ variant: 'unstyled' }),
          debouncedOpen
            ? clsx(themeTextBrandColor, 'underline dark:no-underline')
            : clsx(themeTextColor, themeTextBrandColor_Hover),
        )}
        onClick={() => setIsClicked(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <span>{label}</span>
        <RiArrowDownSLine
          aria-hidden="true"
          className={clsx(
            debouncedOpen
              ? themeTextSecondaryColor
              : themeTextSecondaryInvertColor,
            'size-5 group-hover:text-neutral-500',
          )}
        />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          // Prevent auto focus when popover is opened due to hover
          align={props.align}
          className={clsx(
            'z-popover',
            'rounded-lg',
            'shadow-lg',
            'w-[calc(100vw_-_32px)] sm:w-screen sm:max-w-[95%] md:max-w-[720px]',
          )}
          collisionPadding={{
            left: 16,
          }}
          sideOffset={16}
          onCloseAutoFocus={(event) => {
            if (!isClicked) {
              event.preventDefault();
            }
            setIsClicked(false);
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {(() => {
            switch (props.type) {
              case 'popover':
                return (
                  <NavbarPopover
                    items={props.items}
                    onClose={() => {
                      setOpen(false);
                    }}
                  />
                );
              case 'popover-tabs':
                return (
                  <NavbarPopoverTabs
                    items={props.items}
                    onClose={() => {
                      setOpen(false);
                    }}
                  />
                );
            }
          })()}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
