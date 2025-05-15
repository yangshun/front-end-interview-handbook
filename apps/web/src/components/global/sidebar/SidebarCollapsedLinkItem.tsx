import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import url from 'url';
import { useDebounceValue } from 'usehooks-ts';

import Anchor from '~/components/ui/Anchor';
import NavbarPopoverLink from '~/components/ui/Navbar/NavbarPopoverLink';
import type {
  NavPopoverListItem,
  NavTopLevelLinkItem,
} from '~/components/ui/Navbar/NavTypes';
import { popoverContentClassName } from '~/components/ui/Popover/popoverStyles';
import Text from '~/components/ui/Text';
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

export type SidebarCollapsedLinkItemProps =
  | NavPopoverListItem
  | NavTopLevelLinkItem;

export default function SidebarCollapsedLinkItem({
  currentMatchRegex,
  icon: Icon,
  label,
  onClick,
  ...props
}: SidebarCollapsedLinkItemProps) {
  const [debouncedOpen, setOpen] = useDebounceValue(false, 100);

  function handleMouseEnter() {
    setOpen(true);
  }

  function handleMouseLeave() {
    setOpen(false);
  }

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
      <Tooltip asChild={true} delayDuration={0} label={label} side="right">
        {link}
      </Tooltip>
    );
  }

  return (
    <PopoverPrimitive.Root open={debouncedOpen} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        aria-label={label}
        className={clsx(
          commonClass,
          isSelected || debouncedOpen ? activeClassName : defaultClassName,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {iconElement}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={props.align}
          className={clsx(
            popoverContentClassName,
            'flex flex-col gap-2',
            'max-w-[448px]',
            'outline-none',
          )}
          side="right"
          sideOffset={8}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <Text
            className="px-2 py-0.5"
            color="secondary"
            size="body2"
            weight="medium">
            {label}
          </Text>
          <div className="flex flex-col gap-2">
            {props.items.map((childItem, index) => (
              <NavbarPopoverLink
                key={childItem.id}
                number={index + 1}
                {...childItem}
                onClick={(event) => {
                  // To close the popover.
                  setOpen(false);
                  childItem.onClick?.(event);
                }}
              />
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
