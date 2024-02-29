import clsx from 'clsx';
import React, { useId } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderBrandColor,
  themeBorderColor,
  themeBrandShadow,
  themeGlassyBorder,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  features: ReadonlyArray<React.ReactNode>;
  footer?: React.ReactNode;
  glow?: boolean;
  rightSectionContents: React.ReactNode;
  subtitle: React.ReactNode;
  title: React.ReactNode;
}>;

export default function PricingBlockCard({
  footer,
  title,
  subtitle,
  features,
  rightSectionContents,
  glow = false,
}: Props) {
  const id = useId();

  return (
    <div
      className={clsx(
        'lg:grid lg:grid-cols-3',
        'max-w-lg lg:max-w-none',
        'mx-auto overflow-hidden',
        'rounded-2xl sm:rounded-3xl',
        [
          'border',
          glow
            ? [themeBorderBrandColor, themeBrandShadow]
            : [themeGlassyBorder, themeBorderColor],
        ],
      )}>
      <div
        className={clsx(
          'col-span-2 flex flex-col gap-y-6',
          'p-8',
          themeBackgroundColor,
        )}>
        <div className="flex flex-col gap-y-2">
          <Heading
            className={themeTextSubtitleColor}
            color="custom"
            id={id}
            level="heading5">
            {title}
          </Heading>
          <Section>
            <Text color="secondary" display="block">
              {subtitle}
            </Text>
          </Section>
        </div>
        <Section>
          <Divider />
          <ul className="grid gap-y-5 lg:grid-cols-2 lg:gap-x-8" role="list">
            {features.map((feature, idx) => (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className="flex items-start lg:col-span-1">
                <div className="shrink-0">
                  <RiCheckLine
                    aria-hidden="true"
                    className="text-brand size-5"
                  />
                </div>
                <Text
                  className="ml-3"
                  color="secondary"
                  display="block"
                  size="body2">
                  {feature}
                </Text>
              </li>
            ))}
          </ul>
          {footer && <div className="pt-8">{footer}</div>}
        </Section>
      </div>
      <Section>
        <div
          className={clsx(
            'min-w-[300px] lg:flex lg:shrink-0 lg:flex-col lg:justify-center',
            'p-8',
            'bg-neutral-100 dark:bg-[#21223d]',
          )}>
          {rightSectionContents}
        </div>
      </Section>
    </div>
  );
}
