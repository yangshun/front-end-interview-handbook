import clsx from 'clsx';
import React, { useId } from 'react';
import { FaCheck } from 'react-icons/fa6';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderEmphasizeColor,
  themeTextSuccessColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
  features: ReadonlyArray<React.ReactNode>;
  footer?: React.ReactNode;
  leftSectionContents: React.ReactNode;
  subtitle: React.ReactNode;
  title: React.ReactNode;
  widthClassName?: string;
}>;

export default function PurchaseBlockCard({
  className,
  features,
  footer,
  leftSectionContents,
  subtitle,
  title,
  widthClassName = 'w-full max-w-xl md:max-w-none',
}: Props) {
  const id = useId();

  return (
    <div
      className={clsx(
        'relative isolate overflow-hidden',
        'rounded-xl',
        'mx-auto',
        widthClassName,
        themeBackgroundColor,
        ['border', themeBorderEmphasizeColor],
        [
          themeWhiteGlowCardBackground,
          'before:-top-[150px] before:left-1/2 before:h-[180px] before:w-[680px] before:-translate-x-1/2',
        ],
      )}>
      <div
        className={clsx(
          'relative z-10',
          'flex flex-col gap-x-8 gap-y-6 md:flex-row lg:items-stretch',
          'w-full',
          'rounded-[inherit]',
          'p-6',
          className,
        )}>
        <div
          className={clsx(
            'flex flex-col gap-y-6 lg:flex-1',
            'md:max-w-[240px] lg:max-w-[300px] xl:max-w-[350px]',
          )}>
          <div className="flex flex-col gap-y-2">
            <Heading
              className={clsx(
                'text-sm font-semibold lg:text-base',
                textVariants({
                  color: 'default',
                }),
              )}
              color="custom"
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
              {leftSectionContents}
            </div>
          </Section>
        </div>
        <Divider className="md:hidden" direction="horizontal" />
        <Divider className="hidden md:block" direction="vertical" />
        <Section>
          <div className="flex flex-1 grow flex-col justify-center gap-4">
            <Text
              className="block text-sm xl:text-base"
              size="inherit"
              weight="bold">
              {subtitle}
            </Text>
            <ul className="list-disc space-y-1 pl-4" role="list">
              {features.map((feature, idx) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}>
                  <Text
                    className="block text-xs md:text-sm"
                    color="secondary"
                    size="inherit">
                    {feature}
                  </Text>
                </li>
              ))}
            </ul>
            {footer && <div>{footer}</div>}
          </div>
        </Section>
      </div>
    </div>
  );
}
