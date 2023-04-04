import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';

export type TabItem<T> = Readonly<{
  href?: string;
  label: string;
  value: T;
}>;

type TabSize = 'md' | 'sm';

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
    tabItemSize: string;
    tabSpacingSize: string;
    textSize: string;
  }>
> = {
  md: {
    tabItemSize: 'py-4 px-2',
    tabSpacingSize: 'space-x-4',
    textSize: 'text-sm',
  },
  sm: {
    tabItemSize: 'py-2 px-1',
    tabSpacingSize: 'space-x-3',
    textSize: 'text-xs',
  },
};

export default function Tabs<T>({
  label,
  tabs,
  size = 'md',
  value,
  onSelect,
}: Props<T>) {
  const { tabItemSize, tabSpacingSize, textSize } = sizeClasses[size];

  return (
    <div className="w-full">
      <div role="tablist">
        <div className="border-b border-slate-200">
          <nav
            aria-label={label}
            className={clsx('-mb-px flex', tabSpacingSize)}>
            {tabs.map((tab) => {
              const isSelected = tab.value === value;
              const commonProps = {
                'aria-label': tab.label,
                'aria-selected': isSelected,
                children: tab.label,
                className: clsx(
                  isSelected
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200',
                  'whitespace-nowrap border-b-2 font-medium',
                  tabItemSize,
                  textSize,
                ),
                onClick:
                  onSelect != null ? () => onSelect(tab.value) : undefined,
                role: 'tab',
              };

              if (tab.href != null) {
                return (
                  <Anchor
                    key={String(tab.value)}
                    href={tab.href}
                    variant="unstyled"
                    {...commonProps}
                  />
                );
              }

              return (
                <button
                  key={String(tab.value)}
                  type="button"
                  {...commonProps}
                />
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
