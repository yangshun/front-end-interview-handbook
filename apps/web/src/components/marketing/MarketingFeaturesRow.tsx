'use client';

import clsx from 'clsx';

import Section from '~/components/ui/Heading/HeadingContext';

import Heading from '../ui/Heading';
import Text from '../ui/Text';
import { themeGlassyBorder, themeTextSubtitleColor } from '../ui/theme';

export type Feature = Readonly<{
  description: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
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
        <div className="mx-auto grid max-w-sm grid-cols-1 gap-x-8 gap-y-12 md:max-w-xl lg:max-w-full lg:grid-cols-3">
          {features.map(({ description, key, icon: Icon, name }) => (
            <div
              key={key}
              className="flex flex-row items-start gap-6 lg:flex-col">
              <span
                aria-hidden="true"
                className={clsx(
                  'dark:bg-neutral-800/70 rounded-full p-3',
                  themeGlassyBorder,
                )}>
                <Icon
                  className={clsx(
                    'text-primary h-6 w-6',
                    themeTextSubtitleColor,
                  )}
                />
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
