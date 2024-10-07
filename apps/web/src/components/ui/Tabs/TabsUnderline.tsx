import clsx from 'clsx';
import type { ForwardedRef, ForwardRefWithGenerics } from 'react';
import { forwardRef } from 'react';

import Anchor from '~/components/ui/Anchor';
import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeTextBrandColor_Hover,
  themeTextColor_Hover,
} from '~/components/ui/theme';

import type { TextSize } from '../Text';
import Text from '../Text';
import { themeTextSecondaryColor } from '../theme';

export type TabItem<T> = Readonly<{
  href?: string;
  icon?: React.ComponentType<React.ComponentProps<'svg'>>;
  label: string;
  value: T;
}>;

type TabDisplay = 'block' | 'inline';
type TabSize = 'md' | 'sm' | 'xs';
type TabAlignment = 'start' | 'stretch';

type Props<T> = Readonly<{
  alignment?: TabAlignment;
  display?: TabDisplay;
  label: string;
  onSelect?: (value: T) => void;
  size?: TabSize;
  tabs: ReadonlyArray<TabItem<T>>;
  value: T;
}>;

const displayClasses: Record<TabDisplay, string> = {
  block: 'block',
  inline: 'inline-block',
};

const sizeClasses: Record<
  TabSize,
  Readonly<{
    iconSize: string;
    tabGapSize: string;
    tabInternalGapSize: string;
    tabItemSize: string;
    textSize: TextSize;
  }>
> = {
  md: {
    iconSize: 'size-5',
    tabGapSize: 'gap-x-8',
    tabInternalGapSize: 'gap-x-2',
    tabItemSize: 'py-2',
    textSize: 'body1',
  },
  sm: {
    iconSize: 'size-4',
    tabGapSize: 'gap-x-6',
    tabInternalGapSize: 'gap-x-1.5',
    tabItemSize: 'py-1.5',
    textSize: 'body2',
  },
  xs: {
    iconSize: 'size-4',
    tabGapSize: 'gap-x-4',
    tabInternalGapSize: 'gap-x-1',
    tabItemSize: 'py-1',
    textSize: 'body3',
  },
};

function TabsUnderline<T>(
  {
    alignment = 'start',
    display = 'block',
    label,
    tabs,
    size = 'md',
    value,
    onSelect,
  }: Props<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { iconSize, tabItemSize, tabInternalGapSize, tabGapSize, textSize } =
    sizeClasses[size];

  return (
    <div
      ref={ref}
      className={clsx(
        'overflow-x-auto overflow-y-hidden',
        displayClasses[display],
        ['border-b', themeBorderElementColor],
      )}>
      <nav aria-label={label} className={clsx('-mb-px flex', tabGapSize)}>
        {tabs.map((tabItem) => {
          const {
            icon: Icon,
            label: tabItemLabel,
            value: tabItemValue,
            href,
          } = tabItem;
          const isSelected = tabItemValue === value;
          const commonProps = {
            children: (
              <Text
                className={clsx('group flex items-center', tabInternalGapSize)}
                color={isSelected ? 'default' : 'inherit'}
                size={textSize}
                weight="medium">
                {Icon && (
                  <Icon
                    className={clsx(
                      'shrink-0',
                      !isSelected && [
                        'text-neutral-400 dark:text-neutral-500',
                        'group-hover:text-inherit dark:group-hover:text-inherit',
                      ],
                      iconSize,
                    )}
                  />
                )}
                {tabItemLabel}
              </Text>
            ),
            className: clsx(
              'group whitespace-nowrap border-b-2',
              isSelected
                ? 'border-neutral-900 dark:border-neutral-100'
                : clsx(
                    'border-transparent',
                    themeTextSecondaryColor,
                    themeTextColor_Hover,
                  ),
              tabItemSize,
              alignment === 'stretch' && 'flex-1',
            ),
            onClick: () => onSelect?.(tabItemValue),
          };

          if (href != null) {
            return (
              <Anchor
                key={String(tabItemValue)}
                href={href}
                variant="unstyled"
                {...commonProps}
              />
            );
          }

          return (
            <button key={String(tabItemValue)} type="button" {...commonProps} />
          );
        })}
      </nav>
    </div>
  );
}

const withForwardRef: ForwardRefWithGenerics = forwardRef(TabsUnderline);

export default withForwardRef;
