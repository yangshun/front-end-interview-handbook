import clsx from 'clsx';
import { useMemo } from 'react';

import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { ProjectsChallengeItem } from '../types';
import ProjectsChallengeStepsTabItems from './ProjectsChallengeStepsTabItems';
import type { ProjectsChallengeItemStepsTabType } from './ProjectsChallengeStepsTabsImpl';

export type ProjectStepsTabItem = Readonly<{
  hint: string;
  href?: string;
  subtitle: string;
  title: string;
  value: ProjectsChallengeItemStepsTabType;
}>;

export type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  className?: string;
  label: string;
  onSelect?: (value: ProjectsChallengeItemStepsTabType) => void;
  tabs: ReadonlyArray<ProjectStepsTabItem>;
}>;

export default function ProjectsChallengeStepsTabs({
  challenge,
  className,
  label,
  tabs,
  onSelect,
}: Props) {
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
      <div className="flex min-w-fit flex-col items-stretch">
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
                  themeBorderElementColor,
                )}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <ProjectsChallengeStepsTabItems
            challenge={challenge}
            label={label}
            tabs={tabs}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
}
