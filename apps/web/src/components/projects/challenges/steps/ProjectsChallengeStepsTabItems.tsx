import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect } from 'react';

import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import type { ProjectStepsTabItem } from '~/components/projects/challenges/steps/ProjectsChallengeStepsTabs';
import type { ProjectsChallengeItemStepsTabType } from '~/components/projects/challenges/steps/ProjectsChallengeStepsTabsImpl';
import useProjectsChallengeStepsReadStatus from '~/components/projects/challenges/steps/useProjectsChallengeStepsReadStatus';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeTextBrandColor_Hover,
  themeTextColor,
} from '~/components/ui/theme';

function ProjectsChallengeStepsTabItem({
  challenge,
  compact,
  item,
  onSelect,
}: Readonly<{
  challenge: ProjectsChallengeItem;
  compact?: boolean;
  item: ProjectStepsTabItem;
  onSelect?: (value: ProjectsChallengeItemStepsTabType) => void;
}>) {
  const { accessAllSteps } = useProjectsChallengeSessionContext();

  const value: ProjectsChallengeItemStepsTabType =
    (useSelectedLayoutSegment() as ProjectsChallengeItemStepsTabType) ||
    'brief';
  const {
    href,
    subtitle: tabItemSubtitle,
    title: tabItemTitle,
    value: tabItemValue,
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
        'w-[160px] md:min-w-[206px]',
        compact ? 'pt-2' : 'pt-4',
        'border-t-2',
        isSelected
          ? themeBorderBrandColor
          : [themeTextBrandColor_Hover, themeTextColor, 'border-transparent'],
      )}
      href={href}
      scroll={false}
      variant="unstyled"
      onClick={() => {
        onSelect?.(tabItemValue);
      }}>
      <Text
        className="block"
        color={isSelected ? 'active' : 'inherit'}
        size={compact ? 'body2' : 'body1'}
        weight="bold">
        {tabItemTitle}
        {accessAllSteps && !hasRead && (
          <span className="bg-red mb-2 ms-1 inline-block size-2 rounded-full" />
        )}
      </Text>
      <Text
        className="block"
        color="secondary"
        size={compact ? 'body2' : 'body1'}>
        {tabItemSubtitle}
      </Text>
    </Anchor>
  );
}

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  className?: string;
  compact?: boolean;
  label: string;
  onSelect?: (value: ProjectsChallengeItemStepsTabType) => void;
  tabs: ReadonlyArray<ProjectStepsTabItem>;
}>;

export default function ProjectsChallengeStepsTabItems({
  challenge,
  className,
  compact,
  label,
  onSelect,
  tabs,
}: Props) {
  return (
    <nav
      aria-label={label}
      className={clsx(
        '-mb-px',
        'relative flex gap-x-6',
        ['border-t', themeBorderElementColor],
        className,
      )}>
      {tabs.map((tabItem) => (
        <ProjectsChallengeStepsTabItem
          key={String(tabItem.value)}
          challenge={challenge}
          compact={compact}
          item={tabItem}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
}
