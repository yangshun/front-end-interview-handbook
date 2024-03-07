import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBorderElementColor,
  themeTextBrandColor_Hover,
  themeTextColor,
} from '~/components/ui/theme';

import type { ProjectsChallengeItemStepsTabType } from './ProjectsChallengeStepsTabsImpl';
import useProjectsChallengeStepsReadStatus from './useProjectsChallengeStepsReadStatus';
import type { ProjectsChallengeItem } from '../types';

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

function ProjectsChallengeStepsTabItem({
  challenge,
  item,
  onSelect,
}: Readonly<{
  challenge: ProjectsChallengeItem;
  item: ProjectStepsTabItem;
  onSelect?: (value: ProjectsChallengeItemStepsTabType) => void;
}>) {
  const { accessAllSteps } = useProjectsChallengeSessionContext();

  const value: ProjectsChallengeItemStepsTabType =
    (useSelectedLayoutSegment() as ProjectsChallengeItemStepsTabType) ||
    'brief';
  const {
    title: tabItemTitle,
    subtitle: tabItemSubtitle,
    value: tabItemValue,
    href,
  } = item;
  const [hasRead, setHasRead] = useProjectsChallengeStepsReadStatus(
    challenge,
    item.value,
  );
  const isSelected = value === tabItemValue;

  useEffect(() => {
    if (isSelected) {
      setHasRead(true);
    }
  }, [isSelected, setHasRead]);

  return (
    <Anchor
      className={clsx(
        'group shrink-0 md:grow',
        'w-[160px] md:min-w-[256px]',
        'pt-4',
        'border-t-2',
        isSelected
          ? 'border-brand'
          : [themeTextBrandColor_Hover, themeTextColor, 'border-transparent'],
      )}
      href={href}
      scrollToTop={false}
      variant="unstyled"
      onClick={() => {
        onSelect?.(tabItemValue);
      }}>
      <Text
        color={isSelected ? 'active' : 'inherit'}
        display="block"
        size="body1"
        weight="bold">
        {tabItemTitle}
        {accessAllSteps && !hasRead && (
          <span className="bg-red size-2 mb-2 ms-1 inline-block rounded-full" />
        )}
      </Text>
      <Text color="secondary" display="block" size="body1">
        {tabItemSubtitle}
      </Text>
    </Anchor>
  );
}

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
        <nav
          aria-label={label}
          className={clsx('-mb-px mt-4', 'relative flex gap-x-6', [
            'border-t',
            themeBorderElementColor,
          ])}>
          {tabs.map((tabItem) => (
            <ProjectsChallengeStepsTabItem
              key={String(tabItem.value)}
              challenge={challenge}
              item={tabItem}
              onSelect={onSelect}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
