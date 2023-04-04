import clsx from 'clsx';

export type TabItem<T> = Readonly<{
  label: string;
  value: T;
}>;

type Props<T> = Readonly<{
  label: string;
  onSelect?: (value: T) => void;
  tabs: ReadonlyArray<TabItem<T>>;
  value: T;
}>;

export default function Tabs<T>({ label, tabs, value, onSelect }: Props<T>) {
  return (
    <div className="w-full">
      <div role="tablist">
        <div className="border-b border-slate-200">
          <nav aria-label={label} className="-mb-px flex space-x-4">
            {tabs.map((tab) => {
              const isSelected = tab.value === value;
              const commonProps = {
                'aria-label': tab.label,
                'aria-selected': isSelected,
                children: tab.label,
                className: clsx(
                  isSelected
                    ? 'border-brand-500 text-brand-600 font-medium'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-200',
                  'py-4 px-1 border-b-2 text-sm sm:text-base md:text-lg xl:text-xl text-center w-1/4',
                ),
                onClick:
                  onSelect != null ? () => onSelect(tab.value) : undefined,
                role: 'tab',
              };

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
