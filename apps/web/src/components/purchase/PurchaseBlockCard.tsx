import clsx from 'clsx';
import React, { useId } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBorderColor,
  themeGlassyBorder,
  themeTextSuccessColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
  features: ReadonlyArray<React.ReactNode>;
  footer?: React.ReactNode;
  rightSectionContents: React.ReactNode;
  subtitle: React.ReactNode;
  title: React.ReactNode;
}>;

export default function PurchaseBlockCard({
  footer,
  title,
  subtitle,
  features,
  rightSectionContents,
  className,
}: Props) {
  const id = useId();

  return (
    <div
      className={clsx(
        'flex flex-col gap-10 lg:flex-row lg:items-stretch',
        'max-w-lg lg:max-w-none',
        'overflow-hidden',
        'rounded-xl',
        ['border', themeGlassyBorder, themeBorderColor],
        'p-6',
        className,
      )}>
      <div
        className={clsx(
          'flex flex-1 flex-col gap-y-6',
          'min-w-[300px] xl:max-w-[350px]',
        )}>
        <div className="flex flex-col gap-y-2">
          <Heading
            className={textVariants({ size: 'body2', weight: 'medium' })}
            id={id}
            level="custom">
            {title}
          </Heading>
        </div>
        <Section>
          <div
            className={clsx(
              'lg:flex lg:shrink-0 lg:flex-col lg:justify-center',
            )}>
            {rightSectionContents}
          </div>
        </Section>
      </div>
      <Divider className="lg:hidden" direction="horizontal" />
      <Divider className="hidden lg:block" direction="vertical" />
      <Section>
        <div className="flex flex-1 grow flex-col justify-center gap-4">
          <Text className="block" size="body1" weight="bold">
            {subtitle}
          </Text>
          <ul className="flex flex-col gap-y-4" role="list">
            {features.map((feature, idx) => (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className="flex items-start lg:col-span-1">
                <div className="shrink-0">
                  <RiCheckLine
                    aria-hidden="true"
                    className={clsx('size-5 shrink-0', themeTextSuccessColor)}
                  />
                </div>
                <Text className="ml-3 block" color="secondary" size="body2">
                  {feature}
                </Text>
              </li>
            ))}
          </ul>
          {footer && <div className="pt-8">{footer}</div>}
        </div>
      </Section>
    </div>
  );
}
