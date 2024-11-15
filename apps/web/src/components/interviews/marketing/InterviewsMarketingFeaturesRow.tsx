'use client';

import clsx from 'clsx';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeGlassyBorder,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

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

export default function InterviewsMarketingFeaturesRow({
  title,
  features,
}: Props) {
  return (
    <div>
      <Heading className="sr-only" level="custom">
        {title}
      </Heading>
      <Section>
        <div
          className={clsx(
            'grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3',
            'mx-auto max-w-sm md:max-w-xl lg:max-w-full',
          )}>
          {features.map(({ description, key, icon: Icon, name }) => (
            <div
              key={key}
              className="flex flex-row items-start gap-6 lg:flex-col">
              <span
                aria-hidden="true"
                className={clsx(
                  'rounded-full p-3 dark:bg-neutral-800/70',
                  themeGlassyBorder,
                )}>
                <Icon
                  className={clsx(
                    'text-primary size-6',
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
