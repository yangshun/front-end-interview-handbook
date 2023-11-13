'use client';

import clsx from 'clsx';

import Section from '~/components/ui/Heading/HeadingContext';

import Heading from '../../ui/Heading';
import Text from '../../ui/Text';
import { themeGlassyBorder, themeTextSubtitleColor } from '../../ui/theme';

export type Feature = Readonly<{
  description: string;
  key: string;
  name: string;
}>;

type Props = Readonly<{
  features: ReadonlyArray<Feature>;
  title: string;
}>;

export default function MarketingFeaturesRow({ title, features }: Props) {
  return (
    <div>
      <Heading className="sr-only" level="custom">
        {title}
      </Heading>
      <Section>
        <div className="mx-auto grid max-w-sm grid-cols-1 gap-x-8 gap-y-12 md:max-w-3xl md:grid-cols-2 lg:max-w-full lg:grid-cols-4">
          {features.map(({ description, key, name }, index) => (
            <div
              key={key}
              className="flex flex-row items-start gap-6 lg:flex-col">
              <span
                aria-hidden="true"
                className={clsx(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-3 dark:bg-neutral-800/70',
                  themeGlassyBorder,
                )}>
                <Text className={clsx('text-primary', themeTextSubtitleColor)}>
                  {index + 1}
                </Text>
              </span>
              <div className="flex flex-col gap-2">
                <Heading
                  className={themeTextSubtitleColor}
                  color="custom"
                  level="heading6">
                  {name}
                </Heading>
                <Text color="secondary" size="body2">
                  {description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
