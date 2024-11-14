import clsx from 'clsx';
import type { ReactNode } from 'react';
import { type Ref } from 'react';

import Anchor from '~/components/ui/Anchor';
import {
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { themeTextColor, themeTextColor_Hover } from '../ui/theme';

function flattenNavigationItems<T>(
  items: ReadonlyArray<SideNavigationItem<T>>,
): ReadonlyArray<SideNavigationItem<T>> {
  return items.reduce<Array<SideNavigationItem<T>>>((acc, item) => {
    acc.push(item);
    if (item.children) {
      acc = acc.concat(flattenNavigationItems(item.children));
    }

    return acc;
  }, []);
}

type SideNavigationItem<T> = Readonly<{
  children?: ReadonlyArray<SideNavigationItem<T>>;
  label: ReactNode;
  value: T;
}>;

export type SideNavigationItems<T> = ReadonlyArray<SideNavigationItem<T>>;

function NavigationItem<T>({
  activeValue,
  activeLinkRef,
  level,
  section,
  onClick,
}: Readonly<{
  activeLinkRef?: Ref<HTMLAnchorElement>;
  activeValue: T | null;
  level: number;
  onClick?: (value: T) => void;
  section: SideNavigationItem<T>;
}>) {
  const isActive = activeValue === section.value;

  const hasChildren = section.children && section.children.length > 0;

  return (
    <li key={String(section.value)}>
      <div className={clsx('flex', hasChildren && 'mb-2')}>
        <Anchor
          ref={isActive ? activeLinkRef : undefined}
          className={clsx(
            '-ml-0.5 flex w-full items-center gap-x-2 pl-[19px]',
            'motion-safe:transition-all',
            'leading-5',
            isActive ? themeTextColor : themeTextSecondaryColor,
            themeTextColor_Hover,
          )}
          href={onClick ? '#' : `#${section.value}`}
          variant="unstyled"
          onClick={() => onClick?.(section.value)}>
          <span className="line-clamp-1" style={{ paddingLeft: 12 * level }}>
            {section.label}
          </span>
        </Anchor>
      </div>
      {hasChildren && (
        <NavigationItems
          activeLinkRef={activeLinkRef}
          activeValue={activeValue}
          items={section.children}
          level={level + 1}
          // We don't support clicks for non-first level items for now.
        />
      )}
    </li>
  );
}

function NavigationItems<T>({
  activeLinkRef,
  activeValue,
  items,
  level = 0,
  onClick,
}: Readonly<{
  activeLinkRef?: Ref<HTMLAnchorElement>;
  activeValue: T | null;
  items: SideNavigationItems<T>;
  level: number;
  onClick?: (value: T) => void;
}>) {
  return (
    <ul
      className={clsx(
        'flex flex-col gap-y-2',
        level === 0 && ['border-l-2', themeBorderColor],
      )}
      role="list">
      {items.map((section) => (
        <NavigationItem
          key={String(section.value)}
          activeLinkRef={activeLinkRef}
          activeValue={activeValue}
          level={level}
          section={section}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

type Props<T> = Readonly<{
  activeLinkRef?: Ref<HTMLAnchorElement>;
  activeValue: T | null;
  fontSize?: 'medium' | 'normal';
  items: SideNavigationItems<T>;
  onClick?: (value: T) => void;
}>;

export default function SideNavigation<T>({
  activeValue,
  activeLinkRef,
  items,
  fontSize = 'normal',
  onClick,
}: Props<T>) {
  const flatItems = flattenNavigationItems(items);
  const ITEM_HEIGHT_AND_GAP = 28;
  const activeItemIndex = flatItems.findIndex(
    (item) => item.value === activeValue,
  );
  const activeIndicatorTopPosition = activeItemIndex * ITEM_HEIGHT_AND_GAP;

  return (
    <div
      className={clsx(
        'relative',
        fontSize === 'normal' ? 'text-[0.8125rem]' : 'text-sm',
      )}>
      <div
        className={clsx(
          'absolute h-5 w-0.5 rounded-full bg-current',
          'transition-all duration-300 ease-in-out',
          activeItemIndex < 0 && 'hidden',
        )}
        style={{
          top: `${activeIndicatorTopPosition}px`,
        }}
      />
      <NavigationItems
        activeLinkRef={activeLinkRef}
        activeValue={activeValue}
        items={items}
        level={0}
        onClick={onClick}
      />
    </div>
  );
}
