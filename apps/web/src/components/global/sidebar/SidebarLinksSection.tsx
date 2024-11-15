import clsx from 'clsx';
import { type ReactNode, useEffect, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import { textVariants } from '~/components/ui/Text';
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

type SidebarSize = 'md' | 'sm';

type SidebarBaseItem = Readonly<{
  addOnElement?: ReactNode;
  currentMatchRegex?: RegExp;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  showIcon?: boolean;
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

function isItemActive(
  {
    href,
    currentMatchRegex,
  }: Readonly<{ currentMatchRegex?: RegExp; href: string }>,
  pathname: string | null,
) {
  return (
    pathname === href || (pathname != null && currentMatchRegex?.test(pathname))
  );
}

function SidebarLinkItem({
  addOnElement,
  href,
  icon: Icon,
  label,
  showIcon = false,
  currentMatchRegex,
  size,
}: Readonly<{ size: SidebarSize }> & SidebarLink) {
  const { pathname } = useI18nPathname();
  const isActive = isItemActive({ currentMatchRegex, href }, pathname);

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
      <Anchor
        className={clsx(
          'group',
          'flex items-center gap-x-2.5',
          'w-full p-2',
          'rounded-md',
          size === 'sm'
            ? 'text-[0.8125rem] leading-4'
            : textVariants({ size: 'body2' }),
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
          <Tooltip asChild={true} label={label} side="right">
            <span className="line-clamp-1">{label}</span>
          </Tooltip>
          {addOnElement}
        </div>
      </Anchor>
    </li>
  );
}

function SidebarLinks({
  item,
  onToggle,
  size,
}: Readonly<{
  item: SidebarLinkEntity;
  onToggle: () => void;
  size: SidebarSize;
}>) {
  const { pathname } = useI18nPathname();

  if (!('items' in item)) {
    return (
      <SidebarLinkItem
        key={item.href}
        showIcon={item.showIcon}
        {...item}
        size={size}
      />
    );
  }

  const isActiveSection = item.items.find((linkItem) =>
    isItemActive(linkItem, pathname),
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
          )}
          onClick={() => {
            onToggle();
          }}>
          <span
            className={clsx(
              'text-left',
              size === 'sm'
                ? 'text-[0.8125rem] leading-4'
                : textVariants({ size: 'body2' }),
              'font-medium',
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
              size={size}
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
  size,
}: Readonly<{
  items: ReadonlyArray<SidebarLinkEntity>;
  size: SidebarSize;
}>) {
  const { pathname } = useI18nPathname();
  const [manuallyOpenSections, setManuallyOpenSections] = useState<
    ReadonlyArray<string>
  >([]);
  const [automaticOpenSections, setAutomaticOpenSections] = useState<
    ReadonlyArray<string>
  >([]);

  useEffect(() => {
    const activeValue = (() => {
      for (const item of items) {
        if (!('items' in item)) {
          continue;
        }

        if (item.items.find((linkItem) => isItemActive(linkItem, pathname))) {
          return item.label;
        }
      }
    })();

    if (activeValue) {
      setAutomaticOpenSections([activeValue]);
    }
  }, [items, pathname]);

  return (
    <AccordionPrimitive.Root
      asChild={true}
      className={clsx('flex flex-col gap-y-2')}
      type="multiple"
      value={[...automaticOpenSections, ...manuallyOpenSections]}>
      <ul>
        {items.map((item) => (
          <SidebarLinks
            key={item.label}
            item={item}
            size={size}
            onToggle={() => {
              const inAutomaticOpen = automaticOpenSections.includes(
                item.label,
              );

              if (inAutomaticOpen) {
                setAutomaticOpenSections(
                  automaticOpenSections.filter((label) => label !== item.label),
                );
              }
              if (manuallyOpenSections.includes(item.label)) {
                setManuallyOpenSections(
                  manuallyOpenSections.filter((label) => label !== item.label),
                );
              } else if (!inAutomaticOpen) {
                setManuallyOpenSections([...manuallyOpenSections, item.label]);
              }
            }}
          />
        ))}
      </ul>
    </AccordionPrimitive.Root>
  );
}
