import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';

import type { TextVariant } from '../Text';
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
    tabItemSize: string;
    textVariant: TextVariant;
  }>
> = {
  md: {
    borderRadius: 'rounded-t-md',
    iconSize: 'h-5 w-5',
    tabGapSize: 'gap-x-2',
    tabItemSize: 'py-2.5 px-5',
    textVariant: 'body',
  },
  sm: {
    borderRadius: 'rounded-t',
    iconSize: 'h-4 w-4',
    tabGapSize: 'gap-x-1.5',
    tabItemSize: 'py-1.5 px-3',
    textVariant: 'body2',
  },
  xs: {
    borderRadius: 'rounded-t',
    iconSize: 'h-4 w-4',
    tabGapSize: 'gap-x-1',
    tabItemSize: 'py-1.5 px-2',
    textVariant: 'body3',
  },
};

export default function Tabs<T>({
  label,
  tabs,
  size = 'md',
  value,
  onSelect,
}: Props<T>) {
  const { borderRadius, iconSize, tabItemSize, tabGapSize, textVariant } =
    sizeClasses[size];

  return (
    <div className="isolate w-full" role="tablist">
      <div className="border-b border-slate-200 dark:border-slate-800">
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
                  className={clsx('flex items-center', tabGapSize)}
                  color={isSelected ? 'active' : 'default'}
                  variant={textVariant}>
                  {Icon && (
                    <Icon
                      className={clsx(
                        'shrink-0',
                        !isSelected && 'text-slate-400 dark:text-slate-600',
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
                      'border-t-slate-200 border-x-slate-200 border-b-white',
                      'dark:border-t-slate-800 dark:border-x-slate-800 dark:border-b-slate-900',
                    )
                  : clsx(
                      'bg-slate-100 hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-800/40',
                      'border',
                      'border-t-slate-100 border-x-slate-100 hover:border-slate-200',
                      'dark:border-t-slate-800 dark:border-x-slate-800 dark:border-b-slate-800 dark:hover:border-t-slate-700 dark:hover:border-x-slate-700',
                    ),
                tabItemSize,
              ),
              onClick: () => onSelect?.(tabItemValue),
              role: 'tab',
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
