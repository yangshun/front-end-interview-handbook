import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { popoverContentClassName } from '~/components/ui/Popover/popoverStyles';
import {
  themeBackgroundCardColor,
  themeBorderColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
} from '~/components/ui/theme';

import NavbarPopoverLink from './NavbarPopoverLink';
import type { NavPopoverListItem } from './NavTypes';
import ScrollArea from '../ScrollArea';
import { textVariants } from '../Text';
import { themeTextColor_Hover } from '../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export default function NavbarPopoverTabs({
  items,
  onClose,
}: Readonly<{
  items: ReadonlyArray<NavPopoverListItem>;
  onClose: (event?: React.MouseEvent<HTMLElement>) => void;
}>) {
  const [value, setValue] = useState(items[0].id);
  const mobileAndAbove = useMediaQuery('(min-width: 461px)');

  useEffect(() => {
    // Automatically close when popover is still open and
    // screen has been resized to be below laptop.
    if (!mobileAndAbove) {
      onClose();
    }
  }, [onClose, mobileAndAbove]);

  return (
    <div className={clsx('flex gap-4', popoverContentClassName, '!p-0')}>
      <TabsPrimitive.Root
        className="flex w-full flex-col gap-4 sm:flex-row"
        orientation="vertical"
        value={value}
        onValueChange={setValue}>
        <div className="h-full">
          <TabsPrimitive.List
            className={clsx(
              'h-full sm:w-56',
              'hidden shrink-0 flex-col gap-y-2 sm:flex',
              'px-1 py-4',
              themeBackgroundCardColor,
              ['border-r', themeBorderColor],
            )}>
            {items.map(({ id, label }) => (
              <TabsPrimitive.Trigger
                key={id}
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
                    color: value === id ? 'default' : 'secondary',
                    size: 'body2',
                    weight: 'medium',
                  }),
                )}
                value={id}
                onMouseEnter={() => {
                  setValue(id);
                }}>
                {label}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          <div className="block sm:hidden">
            <ScrollArea
              className="-mb-2"
              scrollbars="horizontal"
              viewportClass="pb-2">
              <TabsPrimitive.List
                className={clsx('overflow-y-hidden', 'block', 'px-4', [
                  'border-b',
                  themeBorderElementColor,
                ])}>
                <div className={clsx('-mb-px flex', 'gap-6')}>
                  {items.map(({ id, label }) => (
                    <TabsPrimitive.Trigger
                      key={id}
                      className={clsx(
                        'whitespace-nowrap border-b-2',
                        'py-3',
                        value === id
                          ? 'border-neutral-900 dark:border-neutral-100'
                          : ['border-transparent', themeTextColor_Hover],
                        textVariants({
                          color: value === id ? 'default' : 'secondary',
                          size: 'body3',
                          weight: 'medium',
                        }),
                      )}
                      value={id}>
                      {label}
                    </TabsPrimitive.Trigger>
                  ))}
                </div>
              </TabsPrimitive.List>
            </ScrollArea>
          </div>
        </div>
        <div className="flex w-full grow items-center px-2 sm:px-0 sm:py-4 sm:pe-4">
          {items.map((item) => (
            <TabsPrimitive.Content
              key={item.id}
              className={clsx(
                'outline-none',
                value === item.id && 'size-full flex flex-col gap-y-2',
              )}
              value={item.id}>
              {item.items.map((childItem, index) => (
                <NavbarPopoverLink
                  key={childItem.id}
                  number={index + 1}
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
