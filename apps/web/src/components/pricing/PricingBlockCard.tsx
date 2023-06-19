import clsx from 'clsx';
import React, { useId } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeBackgroundColor,
  themeBrandShadow,
  themeGlassyBorder,
  themeLineColor,
} from '~/components/ui/theme';

import Text from '../ui/Text';

type Props = Readonly<{
  features: ReadonlyArray<React.ReactNode>;
  featuresSectionTitle: React.ReactNode;
  footer?: React.ReactNode;
  glow?: boolean;
  hideFeaturesSectionTitle?: boolean;
  rightSectionContents: React.ReactNode;
  subtitle: React.ReactNode;
  title: React.ReactNode;
}>;

export default function PricingBlockCard({
  footer,
  title,
  subtitle,
  hideFeaturesSectionTitle = false,
  featuresSectionTitle,
  features,
  rightSectionContents,
  glow = false,
}: Props) {
  const id = useId();

  return (
    <div
      className={clsx(
        'mx-auto max-w-lg overflow-hidden rounded-3xl border lg:flex lg:max-w-none',
        !glow && [themeGlassyBorder, themeLineColor],
        glow && ['border-brand', themeBrandShadow],
      )}>
      <div className={clsx('flex-1 px-6 py-8 lg:p-12', themeBackgroundColor)}>
        <Heading
          className="text-neutral-300"
          color="custom"
          id={id}
          level="heading5">
          {title}
        </Heading>
        <Section>
          <Text
            className="mt-2 text-xl"
            color="secondary"
            display="block"
            size="custom">
            {subtitle}
          </Text>
          <div className="mt-8">
            <div className="flex items-center">
              <Text
                className={clsx(
                  'flex-shrink-0 pr-4',
                  themeBackgroundColor,
                  hideFeaturesSectionTitle && 'sr-only',
                )}
                color="active"
                display="block"
                weight="bold">
                {featuresSectionTitle}
              </Text>
              <div className={clsx('flex-1 border-t-2', themeLineColor)} />
            </div>
            <ul
              className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
              role="list">
              {features.map((feature, idx) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <RiCheckLine
                      aria-hidden="true"
                      className="text-brand h-5 w-5"
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
          </div>
          {footer && <div className="pt-8">{footer}</div>}
        </Section>
      </div>
      <Section>
        <div
          className={clsx(
            'min-w-[300px] py-8 px-6 lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-8',
          )}
          style={{
            background: '#21223d',
          }}>
          {rightSectionContents}
        </div>
      </Section>
    </div>
  );
}
