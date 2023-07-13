import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';

import type { TextSize } from '../Text';
import Text from '../Text';

export type TabItem<T> = Readonly<{
  href?: string;
  icon?: React.ComponentType<React.ComponentProps<'svg'>>;
  label: string;
  value: T;
}>;

type TabSize = 'md' | 'sm' | 'xs';

type Props<T> = Readonly<{
  label: string;
  onSelect?: (value: T) => void;
  scrollToTop?: boolean;
  size?: TabSize;
  tabs: ReadonlyArray<TabItem<T>>;
  value: T;
}>;

const sizeClasses: Record<
  TabSize,
  Readonly<{
    borderRadius: string;
    iconSize: string;
    tabGapSize: string;
    tabInternalGapSize: string;
    tabItemSize: string;
    textSize: TextSize;
  }>
> = {
  md: {
    borderRadius: 'rounded-t-md',
    iconSize: 'h-5 w-5',
    tabGapSize: 'gap-x-3',
    tabInternalGapSize: 'gap-x-2',
    tabItemSize: 'py-2.5 px-5',
    textSize: 'body',
  },
  sm: {
    borderRadius: 'rounded-t',
    iconSize: 'h-4 w-4',
    tabGapSize: 'gap-x-2',
    tabInternalGapSize: 'gap-x-1.5',
    tabItemSize: 'py-1.5 px-3',
    textSize: 'body2',
  },
  xs: {
    borderRadius: 'rounded-t',
    iconSize: 'h-4 w-4',
    tabGapSize: 'gap-x-1',
    tabInternalGapSize: 'gap-x-1',
    tabItemSize: 'py-1.5 px-2',
    textSize: 'body3',
  },
};

export default function Tabs<T>({
  label,
  tabs,
  scrollToTop = true,
  size = 'md',
  value,
  onSelect,
}: Props<T>) {
  const {
    borderRadius,
    iconSize,
    tabItemSize,
    tabInternalGapSize,
    tabGapSize,
    textSize,
  } = sizeClasses[size];

  return (
    <div className="isolate w-full overflow-x-auto" role="tablist">
      <div
        className={clsx('border-b border-neutral-300 dark:border-neutral-700')}>
        <nav aria-label={label} className={clsx('flex', tabGapSize)}>
          {tabs.map((tabItem) => {
            const {
              icon: Icon,
              label: tabItemLabel,
              value: tabItemValue,
              href,
            } = tabItem;
            const isSelected = tabItemValue === value;
            const commonProps = {
              'aria-label': tabItemLabel,
              'aria-selected': isSelected,
              children: (
                <Text
                  className={clsx('flex items-center', tabInternalGapSize)}
                  color={isSelected ? 'active' : 'secondary'}
                  size={textSize}
                  weight="medium">
                  {Icon && (
                    <Icon
                      className={clsx(
                        'shrink-0',
                        !isSelected &&
                          'dark:hover-text-inherit text-neutral-400 hover:text-inherit dark:text-neutral-500',
                        iconSize,
                      )}
                    />
                  )}
                  {tabItemLabel}
                </Text>
              ),
              className: clsx(
                'flex items-center whitespace-nowrap -mb-px z-10 transition',
                borderRadius,
                isSelected
                  ? clsx(
                      'border',
                      'border-t-neutral-300 border-x-neutral-300 border-b-white',
                      'dark:border-t-neutral-700 dark:border-x-neutral-700 dark:border-b-neutral-950',
                    )
                  : clsx(
                      'bg-neutral-100 hover:bg-neutral-50 dark:bg-neutral-700 dark:hover:bg-neutral-800/40',
                      'border',
                      'border-t-transparent border-x-transparent border-b-neutral-300 hover:border-neutral-300',
                      'dark:border-t-neutral-700 dark:border-x-neutral-700 dark:border-b-neutral-700 dark:hover:border-t-neutral-700 dark:hover:border-x-neutral-700',
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
                  scrollToTop={scrollToTop}
                  variant="unstyled"
                  {...commonProps}
                />
              );
            }

            return (
              <button
                key={String(tabItemValue)}
                type="button"
                {...commonProps}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}
