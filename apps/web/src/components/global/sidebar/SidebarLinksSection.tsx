import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextColor,
  themeTextFaintColor,
  themeTextSecondaryColor,
  themeTextSubtitleColor_Hover,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

type SidebarBaseItem = Readonly<{
  addOnElement?: ReactNode;
  currentMatchRegex?: RegExp;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
}>;

type SidebarLink = Readonly<{
  href: string;
}> &
  SidebarBaseItem;

type SidebarItemList = Readonly<{
  items: ReadonlyArray<SidebarLink>;
}> &
  SidebarBaseItem;

export type SidebarLinkEntity = SidebarItemList | SidebarLink;

function SidebarLinkItem({
  addOnElement,
  href,
  icon: Icon,
  label,
  showIcon,
}: Readonly<{ showIcon: boolean }> & SidebarLink) {
  const { pathname } = useI18nPathname();
  const isActive = pathname === href;

  const activeClassName = clsx(
    themeTextColor,
    'font-medium',
    'bg-neutral-200/40 dark:bg-neutral-800/40',
  );
  const defaultClassName = clsx(
    themeTextSecondaryColor,
    themeTextSubtitleColor_Hover,
  );

  return (
    <li key={href} className="relative">
      <Tooltip asChild={true} label={label} side="right">
        <Anchor
          className={clsx(
            'group',
            'flex items-center gap-x-2.5',
            'w-full p-2',
            'rounded-md',
            'text-[0.8125rem] leading-4',
            'select-none outline-none',
            'transition-colors',
            'hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40',
            [
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            ],
            isActive ? activeClassName : defaultClassName,
          )}
          href={href}
          variant="unstyled">
          {Icon && showIcon && (
            <Icon
              className={clsx(
                'size-4 group-hover:animate-wiggle shrink-0 origin-bottom',
                !isActive && themeTextFaintColor,
              )}
            />
          )}
          <div className="flex items-center gap-x-2">
            <span className="line-clamp-1">{label}</span>
            {addOnElement}
          </div>
        </Anchor>
      </Tooltip>
    </li>
  );
}

function SidebarLinks({
  item,
}: Readonly<{ item: SidebarLinkEntity; showIcon: boolean }>) {
  const { pathname } = useI18nPathname();

  if (!('items' in item)) {
    return <SidebarLinkItem key={item.href} showIcon={false} {...item} />;
  }

  const isActiveSection = item.items.find(
    (linkItem) => linkItem.href === pathname,
  );

  return (
    <AccordionPrimitive.Item value={item.label}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
          className={clsx(
            'flex items-center justify-between',
            'w-full p-2',
            'rounded-md',
            'group',
            'select-none outline-none',
            [
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            ],
            'transition-colors',
            themeBackgroundElementEmphasizedStateColor_Hover,
          )}>
          <span
            className={clsx(
              'text-left text-[0.8125rem] font-medium leading-4',
              isActiveSection ? themeTextColor : themeTextSecondaryColor,
              'group-hover:text-neutral-700 dark:group-hover:text-neutral-300',
              'transition-colors',
            )}>
            {item.label}
          </span>
          <RiArrowRightSLine
            aria-hidden={true}
            className={clsx(
              'size-4 shrink-0 transition-transform group-data-[state=open]:rotate-90',
              isActiveSection ? themeTextColor : themeTextSubtleColor,
            )}
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        className={clsx(
          'overflow-hidden transition-all',
          'data-[state=open]:animate-accordion-down',
          'data-[state=closed]:animate-accordion-up overflow-hidden',
        )}>
        <ul className={clsx('flex flex-col gap-y-px', 'py-1 pl-3')} role="list">
          {item.items.map((linkItem) => (
            <SidebarLinkItem
              key={linkItem.href}
              showIcon={true}
              {...linkItem}
            />
          ))}
        </ul>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

export default function SidebarLinksSection({
  items,
}: Readonly<{
  items: ReadonlyArray<SidebarLinkEntity>;
}>) {
  return (
    <AccordionPrimitive.Root
      asChild={true}
      className={clsx('flex flex-col gap-y-px')}
      defaultValue={items.map((section) => section.label)}
      type="multiple">
      <ul>
        {items.map((item) => (
          <SidebarLinks key={item.label} item={item} showIcon={false} />
        ))}
      </ul>
    </AccordionPrimitive.Root>
  );
}
