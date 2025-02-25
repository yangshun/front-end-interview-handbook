'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { RiMoreLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundSuccessColor,
  themeBorderBrandColor,
  themeBorderElementColor,
  themeBorderEmphasizeColor,
  themeTextBrandColor_Hover,
  themeTextColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

function StepsTabItem({
  status,
  title,
  isSelected,
  subtitle,
  onSelect,
}: Readonly<{
  isSelected: boolean;
  onSelect: () => void;
  status: StepsTabItemStatus;
  subtitle: string;
  title: string;
}>) {
  return (
    <Anchor
      className={clsx(
        'group flex flex-1 gap-4',
        'min-w-[200px]',
        'py-3',
        'border-t-2',
        isSelected
          ? themeBorderBrandColor
          : [themeTextBrandColor_Hover, themeTextColor, 'border-transparent'],
      )}
      variant="unstyled"
      onClick={() => {
        onSelect();
      }}>
      <div
        className={clsx(
          'mt-2',
          'size-7',
          'flex shrink-0 items-center justify-center',
          'rounded-full',
          status === 'completed' ? themeTextInvertColor : themeTextColor,
          (status === 'not_started' || status === 'in_progress') && [
            'border-2',
            themeBorderEmphasizeColor,
          ],
          status === 'completed' && themeBackgroundSuccessColor,
        )}>
        {status === 'in_progress' && <RiMoreLine className="size-4" />}
        {status === 'completed' && <FaCheck className="size-4" />}
      </div>
      <div>
        <Text
          className="block"
          color={isSelected ? 'active' : 'inherit'}
          size="body1"
          weight="bold">
          {title}
        </Text>
        <Text className="block" color="secondary" size="body3">
          {subtitle}
        </Text>
      </div>
    </Anchor>
  );
}

type StepsTabItemStatus = 'completed' | 'in_progress' | 'not_started';
type StepsTabItem<T> = Readonly<{
  status: StepsTabItemStatus;
  subtitle: string;
  title: string;
  value: T;
}>;

type Props<T> = Readonly<{
  className?: string;
  label: string;
  onSelect?: (value: T) => void;
  tabs: ReadonlyArray<StepsTabItem<T>>;
  value: T;
}>;

export default function StepsTabItems<T>({
  label,
  tabs,
  onSelect,
  value,
  className,
}: Props<T>) {
  return (
    <nav
      aria-label={label}
      className={clsx(
        '-mb-px',
        'relative flex gap-x-6',
        ['border-t', themeBorderElementColor],
        className,
        themeBackgroundColor,
        'overflow-auto',
      )}>
      {tabs.map((tabItem) => (
        <StepsTabItem
          key={String(tabItem.value)}
          isSelected={value === tabItem.value}
          status={tabItem.status}
          subtitle={tabItem.subtitle}
          title={tabItem.title}
          onSelect={() => onSelect?.(tabItem.value)}
        />
      ))}
    </nav>
  );
}
