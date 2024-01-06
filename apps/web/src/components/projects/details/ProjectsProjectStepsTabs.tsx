import clsx from 'clsx';
import { useMemo } from 'react';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeElementBorderColor,
  themeTextBrandHoverColor,
  themeTextColor,
} from '~/components/ui/theme';

export type ProjectStepsTabItem<T> = Readonly<{
  hint: string;
  href?: string;
  subtitle: string;
  title: string;
  value: T;
}>;

export type Props<T> = Readonly<{
  className?: string;
  label: string;
  onSelect?: (value: T) => void;
  tabs: ReadonlyArray<ProjectStepsTabItem<T>>;
  value: T;
}>;

export default function ProjectsProjectStepsTabs<T>({
  className,
  label,
  tabs,
  value,
  onSelect,
}: Props<T>) {
  // Merge hints of the same value, and calculate the column span for each hint
  const mergedHints = useMemo(() => {
    const result: Array<{
      columnSpan: number;
      hint: string;
    }> = [];

    let currentHint = '';
    let currentColumnSpan = 0;

    for (const tab of tabs) {
      if (tab.hint === currentHint) {
        currentColumnSpan++;
      } else {
        if (currentHint !== '') {
          result.push({
            columnSpan: currentColumnSpan,
            hint: currentHint,
          });
        }
        currentHint = tab.hint;
        currentColumnSpan = 1;
      }
    }

    if (currentHint !== '') {
      result.push({
        columnSpan: currentColumnSpan,
        hint: currentHint,
      });
    }

    return result;
  }, [tabs]);

  return (
    <div className={clsx('overflow-x-auto overflow-y-hidden', className)}>
      <div className="flex flex-col items-stretch min-w-fit">
        <div
          className="grid gap-x-6"
          style={{
            gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
          }}>
          {mergedHints.map(({ hint, columnSpan }) => (
            <div
              key={hint}
              className="flex flex-col gap-3"
              style={{
                gridColumn: `span ${columnSpan} / span ${columnSpan}`,
              }}>
              <Text color="subtle" size="body3">
                {hint}
              </Text>
              <div
                className={clsx(
                  'h-4 w-full border-l border-r border-t border-dashed',
                  themeElementBorderColor,
                )}
              />
            </div>
          ))}
        </div>
        <nav
          aria-label={label}
          className={clsx('-mb-px mt-4', 'relative flex gap-x-6', [
            'border-t',
            themeElementBorderColor,
          ])}>
          {tabs.map((tabItem) => {
            const {
              title: tabItemTitle,
              subtitle: tabItemSubtitle,
              value: tabItemValue,
              href,
            } = tabItem;
            const isSelected = tabItemValue === value;

            return (
              <Anchor
                key={String(tabItemValue)}
                className={clsx(
                  'group w-[160px] md:min-w-[256px] md:flex-grow shrink-0 border-t-2 pt-4',
                  isSelected
                    ? 'border-brand'
                    : [
                        themeTextBrandHoverColor,
                        themeTextColor,
                        'border-transparent',
                      ],
                )}
                href={href}
                variant="unstyled"
                onClick={() => onSelect?.(tabItemValue)}>
                <div className="w-[160px]">
                  <Text
                    color={isSelected ? 'active' : 'inherit'}
                    display="block"
                    weight="bold">
                    {tabItemTitle}
                  </Text>
                  <Text color="secondary" display="block">
                    {tabItemSubtitle}
                  </Text>
                </div>
              </Anchor>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
