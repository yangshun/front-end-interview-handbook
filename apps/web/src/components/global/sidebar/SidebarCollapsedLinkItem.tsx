import clsx from 'clsx';
import { useState } from 'react';
import url from 'url';

import Anchor from '~/components/ui/Anchor';
import NavbarPopoverLink from '~/components/ui/Navbar/NavbarPopoverLink';
import type {
  NavPopoverListItem,
  NavTopLevelLinkItem,
} from '~/components/ui/Navbar/NavTypes';
import { popoverContentClassName } from '~/components/ui/Popover/popoverStyles';
import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextColor,
  themeTextColor_Hover,
  themeTextSecondaryColor,
  themeTextSubtitleColor_Hover,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

import * as PopoverPrimitive from '@radix-ui/react-popover';

export type SidebarCollapsedLinkItemProps =
  | NavPopoverListItem
  | NavTopLevelLinkItem;

export default function SidebarCollapsedLinkItem({
  currentMatchRegex,
  label,
  icon: Icon,
  onClick,
  ...props
}: SidebarCollapsedLinkItemProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useI18nPathname();
  const activeClassName = clsx(
    themeTextColor,
    'bg-neutral-200/40 dark:bg-neutral-800/40',
  );
  const defaultClassName = clsx(
    themeTextSecondaryColor,
    themeTextSubtitleColor_Hover,
  );

  const isSelected = pathname != null && currentMatchRegex?.test(pathname);
  const commonClass = clsx(
    'flex shrink-0 items-center',
    'w-full p-3',
    'rounded-md',
    'transition-colors',
    themeTextColor_Hover,
    'hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40',
    [
      themeOutlineElement_FocusVisible,
      themeOutlineElementBrandColor_FocusVisible,
    ],
  );

  const iconElement =
    Icon != null ? <Icon className="size-5 shrink-0" /> : null;

  if (props.type === 'link') {
    const urlObject = url.parse(props.href ?? '');
    const isLinkSelected = pathname === urlObject.pathname || isSelected;

    const link = (
      <Anchor
        aria-current={isLinkSelected ? 'page' : undefined}
        aria-label={label}
        className={clsx(
          commonClass,
          isLinkSelected ? activeClassName : defaultClassName,
        )}
        href={props.href}
        prefetch={null}
        scroll={props.scroll}
        variant="unstyled"
        onClick={onClick}>
        {iconElement}
      </Anchor>
    );

    return (
      <Tooltip asChild={true} label={label} side="right">
        {link}
      </Tooltip>
    );
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <Tooltip asChild={true} label={label} side="right">
        <PopoverPrimitive.Trigger
          aria-label={label}
          className={clsx(
            commonClass,
            isSelected || open ? activeClassName : defaultClassName,
          )}>
          {iconElement}
        </PopoverPrimitive.Trigger>
      </Tooltip>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={props.align}
          className={clsx(popoverContentClassName, 'max-w-lg')}
          side="right"
          sideOffset={8}>
          {props.items.map((childItem) => (
            <NavbarPopoverLink
              key={childItem.itemKey}
              {...childItem}
              onClick={(event) => {
                // To close the popover.
                setOpen(false);
                childItem.onClick?.(event);
              }}
            />
          ))}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
