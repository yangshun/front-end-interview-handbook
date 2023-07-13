import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';

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

type Props<T> = Readonly<{
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
    iconSize: 'h-5 w-5',
    tabGapSize: 'gap-x-8',
    tabInternalGapSize: 'gap-x-2',
    tabItemSize: 'py-2',
    textSize: 'body',
  },
  sm: {
    iconSize: 'h-4 w-4',
    tabGapSize: 'gap-x-6',
    tabInternalGapSize: 'gap-x-1.5',
    tabItemSize: 'py-1.5',
    textSize: 'body2',
  },
  xs: {
    iconSize: 'h-4 w-4',
    tabGapSize: 'gap-x-4',
    tabInternalGapSize: 'gap-x-1',
    tabItemSize: 'py-1',
    textSize: 'body3',
  },
};

export default function TabsUnderline<T>({
  display = 'block',
  label,
  tabs,
  size = 'md',
  value,
  onSelect,
}: Props<T>) {
  const { iconSize, tabItemSize, tabInternalGapSize, tabGapSize, textSize } =
    sizeClasses[size];

  return (
    <div
      className={clsx(
        'overflow-x-auto overflow-y-hidden',
        displayClasses[display],
        'border-b border-neutral-300 dark:border-neutral-700',
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
                color={isSelected ? 'active' : 'inherit'}
                size={textSize}
                weight="medium">
                {Icon && (
                  <Icon
                    className={clsx(
                      'shrink-0',
                      !isSelected &&
                        'text-neutral-400 group-hover:text-inherit dark:text-neutral-500 dark:group-hover:text-inherit',
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
                ? 'border-brand'
                : clsx(
                    'border-transparent hover:text-brand',
                    themeTextSecondaryColor,
                  ),
              tabItemSize,
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
