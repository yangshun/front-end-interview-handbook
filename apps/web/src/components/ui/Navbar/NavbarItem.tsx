import clsx from 'clsx';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDebounce } from 'usehooks-ts';

import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextColor,
  themeTextSecondaryColor,
  themeTextSecondaryInvertColor,
} from '~/components/ui/theme';

import NavbarPopover from './NavbarPopover';
import NavbarPopoverTabs from './NavbarPopoverTabs';
import type { NavbarTopLevelItem } from './NavTypes';
import Anchor from '../Anchor';
import { anchorVariants } from '../Anchor/AnchorStyles';

import * as PopoverPrimitive from '@radix-ui/react-popover';

type Props = NavbarTopLevelItem &
  Readonly<{
    popoverTabsItemsAddOn?: React.ReactNode;
  }>;

export default function NavbarItem({ onClick, label, ...props }: Props) {
  const [open, setOpen] = useState(false);
  // To debounce open state when quick hovering on and out
  const debouncedOpen = useDebounce(open, 100);
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
    'px-3 py-1',
    'rounded-full',
    'text-[0.8125rem] font-medium whitespace-nowrap',
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
          open
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
            open ? themeTextSecondaryColor : themeTextSecondaryInvertColor,
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
            'w-screen max-w-[720px]',
          )}
          sideOffset={8}
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
                    itemsAddOn={props.popoverTabsItemsAddOn}
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
