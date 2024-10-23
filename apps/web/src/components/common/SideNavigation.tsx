import clsx from 'clsx';
import type { ReactNode } from 'react';
import { forwardRef, type Ref } from 'react';

import Anchor from '~/components/ui/Anchor';
import {
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

function flattenNavigationItems(
  items: ReadonlyArray<SideNavigationItem>,
): ReadonlyArray<SideNavigationItem> {
  return items.reduce<Array<SideNavigationItem>>((acc, item) => {
    acc.push(item);
    if (item.children) {
      acc = acc.concat(flattenNavigationItems(item.children));
    }

    return acc;
  }, []);
}

type SideNavigationItem = Readonly<{
  children?: ReadonlyArray<SideNavigationItem>;
  label: ReactNode;
  value: string;
}>;

export type SideNavigationItems = ReadonlyArray<SideNavigationItem>;

function NavigationItem({
  activeValue,
  activeLinkRef,
  level,
  section,
  onClick,
}: Readonly<{
  activeLinkRef?: Ref<HTMLAnchorElement>;
  activeValue: string | null;
  level: number;
  onClick?: (value: string) => void;
  section: SideNavigationItem;
}>) {
  const isActive = activeValue === section.value;

  const hasChildren = section.children && section.children.length > 0;

  return (
    <li key={section.value} className="text-sm leading-6">
      <div className={clsx('flex', hasChildren && 'mb-2')}>
        <Anchor
          ref={isActive ? activeLinkRef : undefined}
          className={clsx(
            '-ml-0.5 flex w-full items-center gap-x-2 pl-[19px]',
            'motion-safe:transition-all',
            'text-[0.8125rem] leading-5',
            themeTextSecondaryColor,
            'hover:text-neutral-900 dark:hover:text-white',
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
        />
      )}
    </li>
  );
}

function NavigationItems({
  activeValue,
  activeLinkRef,
  items,
  level = 0,
  onClick,
}: Readonly<{
  activeLinkRef?: Ref<HTMLAnchorElement>;
  activeValue: string | null;
  items: SideNavigationItems;
  level: number;
  onClick?: (value: string) => void;
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
          key={section.value}
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

type Props = Readonly<{
  activeValue: string | null;
  items: SideNavigationItems;
  onClick?: (value: string) => void;
}>;

function SideNavigation(
  { activeValue, items, onClick }: Props,
  ref: Ref<HTMLAnchorElement>,
) {
  const flatItems = flattenNavigationItems(items);
  const ITEM_HEIGHT_AND_GAP = 28;
  const activeItemIndex = flatItems.findIndex(
    (item) => item.value === activeValue,
  );
  const activeIndicatorTopPosition = activeItemIndex * ITEM_HEIGHT_AND_GAP;

  return (
    <div className="relative">
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
        activeLinkRef={ref}
        activeValue={activeValue}
        items={items}
        level={0}
        onClick={onClick}
      />
    </div>
  );
}

export default forwardRef(SideNavigation);
