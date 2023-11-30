import clsx from 'clsx';
import { useMemo } from 'react';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeElementBorderColor,
  themeTextBrandHoverColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export type ProjectBreakdownTabItem<T> = Readonly<{
  hint: string;
  href?: string;
  subtitle: string;
  title: string;
  value: T;
}>;

type Props<T> = Readonly<{
  className?: string;
  label: string;
  onSelect?: (value: T) => void;
  tabs: ReadonlyArray<ProjectBreakdownTabItem<T>>;
  value: T;
}>;

export default function ProjectsProjectBreakdownTabs<T>({
  className,
  label,
  tabs,
  value,
  onSelect,
}: Props<T>) {
  // Combined hints with the same value to form a larger hint
  const combinedHints = useMemo(() => {
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
      <div
        className="flex flex-col items-stretch"
        style={{
          minWidth: tabs.length * 256 + (tabs.length - 1) * 12,
        }}>
        <div
          className="grid gap-x-6"
          style={{
            gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
          }}>
          {combinedHints.map(({ hint, columnSpan }) => (
            <div
              key={hint}
              className="flex min-w-[256px] flex-col gap-3"
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
          className={clsx(
            '-mb-px mt-4 flex gap-x-6',
            'overflow-x-visible border-t',
            themeElementBorderColor,
          )}>
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
                  'group min-w-[256px] flex-1 whitespace-nowrap border-t-2 py-4',
                  isSelected
                    ? 'border-brand'
                    : [
                        themeTextBrandHoverColor,
                        themeTextSecondaryColor,
                        'border-transparent',
                      ],
                )}
                href={href}
                variant="unstyled"
                onClick={() => onSelect?.(tabItemValue)}>
                <div className="flex flex-col">
                  <Text color={isSelected ? 'active' : 'default'} weight="bold">
                    {tabItemTitle}
                  </Text>
                  <Text color="secondary">{tabItemSubtitle}</Text>
                </div>
              </Anchor>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
