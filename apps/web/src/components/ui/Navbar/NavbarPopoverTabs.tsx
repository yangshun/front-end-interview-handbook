import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderEmphasizeColor,
  themeBorderEmphasizeColor_Hover,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import NavbarFeatureIcon from './NavbarFeatureIcon';
import type { NavPopoverGroupItem, NavPopoverLinkItem } from './NavTypes';
import Text, { textVariants } from '../Text';
import { themeTextColor_Hover } from '../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

function NavbarPopoverLink({
  label,
  href,
  onClick,
  sublabel,
  labelAddon,
  bottomEl,
  ...props
}: NavPopoverLinkItem) {
  const el = (
    <div
      className={clsx(
        'w-full',
        'group',
        'p-3',
        'flex items-center gap-4',
        'rounded-md',
        'transition-colors',
        themeBackgroundElementEmphasizedStateColor_Hover,
        ['border border-transparent', themeBorderEmphasizeColor_Hover],
      )}>
      <NavbarFeatureIcon {...props} />
      <div className={clsx('flex grow flex-col justify-center')}>
        <Text className="flex items-center gap-2" size="body2" weight="bold">
          <span className="shrink-0">{label}</span> {labelAddon}
        </Text>
        {sublabel && (
          <Text className="mt-1 block" color="secondary" size="body3">
            {sublabel}
          </Text>
        )}
        {bottomEl && <div className="mt-2">{bottomEl}</div>}
      </div>
      <RiArrowRightLine
        aria-hidden={true}
        className={clsx('size-5 shrink-0', themeTextSubtleColor)}
      />
    </div>
  );

  const className = clsx(
    'group flex grow',
    themeOutlineElement_FocusVisible,
    themeOutlineElementBrandColor_FocusVisible,
  );

  if (href == null) {
    return <div className={className}>{el}</div>;
  }

  return (
    <Anchor
      className={className}
      href={href}
      prefetch={null}
      suppressHydrationWarning={true}
      variant="unstyled"
      onClick={onClick}>
      {el}
    </Anchor>
  );
}

export default function NavbarPopoverTabs({
  items,
  onClose,
}: Readonly<{
  items: ReadonlyArray<NavPopoverGroupItem>;
  onClose: (event?: React.MouseEvent<HTMLElement>) => void;
}>) {
  const [value, setValue] = useState(items[0].itemKey);
  const laptopAndAbove = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    // Automatically close when popover is still open and
    // screen has been resized to be below laptop.
    if (!laptopAndAbove) {
      onClose();
    }
  }, [onClose, laptopAndAbove]);

  return (
    <div
      className={clsx(
        'flex gap-4',
        'overflow-hidden',
        'p-4',
        'rounded-lg',
        'shadow-lg dark:shadow-none',
        ['border', themeBorderEmphasizeColor],
        themeBackgroundColor,
      )}>
      <TabsPrimitive.Root
        className="flex w-full"
        orientation="vertical"
        value={value}
        onValueChange={setValue}>
        <TabsPrimitive.List
          className={clsx('w-64', 'flex shrink-0 flex-col gap-y-2')}>
          {items.map(({ itemKey, label }) => (
            <TabsPrimitive.Trigger
              key={itemKey}
              className={clsx(
                'block w-full',
                'rounded-md',
                'px-3 py-2',
                'text-left text-sm font-medium',
                'outline-none',
                themeOutlineElement_FocusVisible,
                themeTextColor_Hover,
                'text-pretty',
                textVariants({
                  color: value === itemKey ? 'default' : 'secondary',
                  size: 'body2',
                  weight: 'medium',
                }),
              )}
              value={itemKey}
              onMouseEnter={() => {
                setValue(itemKey);
              }}>
              {label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        <div className="flex w-full grow items-center">
          {items.map((item) => (
            <TabsPrimitive.Content
              key={item.itemKey}
              className={clsx(
                'outline-none',
                value === item.itemKey && 'size-full flex flex-col gap-y-2',
              )}
              value={item.itemKey}>
              {item.items.map((childItem) => (
                <NavbarPopoverLink
                  key={childItem.itemKey}
                  {...childItem}
                  onClick={(event) => {
                    // To close the popover.
                    onClose(event);
                    item.onClick?.(event);
                  }}
                />
              ))}
            </TabsPrimitive.Content>
          ))}
        </div>
      </TabsPrimitive.Root>
    </div>
  );
}
