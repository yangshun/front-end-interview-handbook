import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

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
import type { NavbarPrimaryItem } from './NavTypes';
import Anchor from '../Anchor';

import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';

export default function NavbarItem({
  onClick,
  label,
  ...props
}: NavbarPrimaryItem) {
  const [open, setOpen] = useState(false);

  const commonStyles = clsx(
    'inline-flex cursor-pointer items-center gap-2 px-3 py-1',
    'text-[0.8125rem] font-medium whitespace-nowrap',
    'group rounded-full',
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
    <Root open={open} onOpenChange={setOpen}>
      <Trigger
        className={clsx(
          commonStyles,
          open
            ? themeTextBrandColor
            : clsx(themeTextColor, themeTextBrandColor_Hover),
        )}>
        <span>{label}</span>
        <RiArrowDownSLine
          aria-hidden="true"
          className={clsx(
            open ? themeTextSecondaryColor : themeTextSecondaryInvertColor,
            'size-5 group-hover:text-neutral-500',
          )}
        />
      </Trigger>
      <Portal>
        <Content
          align={props.align}
          className={clsx(
            'z-popover',
            'rounded-lg',
            'shadow-lg',
            // TODO: Increase max-width as number of items increase.
            'w-screen max-w-5xl',
          )}
          sideOffset={8}>
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
        </Content>
      </Portal>
    </Root>
  );
}
