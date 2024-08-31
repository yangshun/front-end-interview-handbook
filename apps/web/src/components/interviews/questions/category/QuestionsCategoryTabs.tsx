import clsx from 'clsx';
import type { ForwardedRef, ForwardRefWithGenerics } from 'react';
import { forwardRef } from 'react';

import Anchor from '~/components/ui/Anchor';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export type TabItem<T> = Readonly<{
  href?: string;
  icon?: React.ComponentType<React.ComponentProps<'svg'>>;
  label: string;
  value: T;
}>;

type TabDisplay = 'block' | 'inline';
type TabAlignment = 'start' | 'stretch';

type Props<T> = Readonly<{
  alignment?: TabAlignment;
  display?: TabDisplay;
  label: string;
  onSelect?: (value: T) => void;
  tabs: ReadonlyArray<TabItem<T>>;
  value: T;
}>;

const displayClasses: Record<TabDisplay, string> = {
  block: 'block',
  inline: 'inline-block',
};

const sizeClass: Readonly<{
  iconSize: string;
  tabGapSize: string;
  tabInternalGapSize: string;
  textSize: TextSize;
}> = {
  iconSize: 'size-5',
  tabGapSize: 'gap-x-7',
  tabInternalGapSize: 'gap-x-2',
  textSize: 'body2',
};

function QuestionsCategoryTabs<T>(
  {
    alignment = 'start',
    display = 'block',
    label,
    tabs,
    value,
    onSelect,
  }: Props<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { iconSize, tabInternalGapSize, tabGapSize, textSize } = sizeClass;

  return (
    <div
      ref={ref}
      className={clsx(
        'overflow-x-auto overflow-y-hidden',
        '-m-2 p-2',
        displayClasses[display],
      )}>
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
            children: (
              <Text
                className={clsx('group flex items-center', tabInternalGapSize)}
                color={isSelected ? 'active' : 'inherit'}
                size={textSize}
                weight="medium">
                {Icon && (
                  <Icon
                    className={clsx(
                      'shrink-0',
                      !isSelected && [
                        'text-neutral-400 dark:text-neutral-500',
                        'group-hover:text-inherit dark:group-hover:text-inherit',
                      ],
                      iconSize,
                    )}
                  />
                )}
                {tabItemLabel}
              </Text>
            ),
            className: clsx(
              'group whitespace-nowrap',
              themeTextSecondaryColor,
              themeTextBrandColor_Hover,
              alignment === 'stretch' && 'flex-1',
              'rounded',
              [
                themeOutlineElement_FocusVisible,
                themeOutlineElementBrandColor_FocusVisible,
              ],
            ),
            onClick: () => onSelect?.(tabItemValue),
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
            <button key={String(tabItemValue)} type="button" {...commonProps} />
          );
        })}
      </nav>
    </div>
  );
}

const withForwardRef: ForwardRefWithGenerics = forwardRef(
  QuestionsCategoryTabs,
);

export default withForwardRef;
