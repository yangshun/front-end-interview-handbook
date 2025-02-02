'use client';

import clsx from 'clsx';
import React from 'react';
import { RiArrowRightSLine, RiStarSmileFill } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderBrandColor_GroupHover,
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor_GroupHover,
  themeTextSecondaryColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  actions: ReadonlyArray<{
    description: React.ReactNode;
    featured?: boolean;
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    title: React.ReactNode;
  }>;
  crossSellSection?: React.ReactNode;
  title: React.ReactNode;
}>;

export default function PurchasePaymentSuccessSection({
  crossSellSection,
  title,
  actions,
}: Props): JSX.Element {
  const intl = useIntl();

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        <span
          className={clsx(
            'relative flex items-center justify-center',
            'size-12 rounded-full',
            'bg-brand',
          )}>
          <RiStarSmileFill
            aria-hidden={true}
            className={clsx('size-8 shrink-0', 'text-neutral-900')}
          />
        </span>
        <Heading
          className={clsx('max-w-md text-center', 'text-2xl sm:text-3xl')}
          level="custom">
          {title}
        </Heading>
      </div>
      <Section>
        <div className="mt-10 flex flex-col gap-10">
          {crossSellSection}
          <div>
            <Heading
              className={clsx('text-base', themeTextSecondaryColor)}
              color="custom"
              level="custom">
              <FormattedMessage
                defaultMessage="Next steps"
                description="Next steps label for payment success page"
                id="9E2iPt"
              />
            </Heading>
            <Section>
              <ul
                className={clsx(
                  'mt-4',
                  ['border-b border-t', themeBorderColor],
                  ['divide-y', themeDivideColor],
                )}
                role="list">
                {actions.map((action) => (
                  <li
                    key={action.href}
                    className="group relative flex items-start gap-x-4 py-6">
                    <div className="shrink-0">
                      <span
                        className={clsx(
                          'size-12 inline-flex items-center justify-center rounded-md',
                          themeTextSubtleColor,
                          themeBackgroundCardColor,
                          [
                            'border',
                            themeBorderColor,
                            themeBorderBrandColor_GroupHover,
                          ],
                          'transition-colors',
                        )}>
                        <action.icon
                          aria-hidden={true}
                          className={clsx(
                            'transition-colors',
                            'dark:group-hover:text-brand group-hover:text-neutral-900',
                            'shrink-0',
                            'size-6',
                          )}
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <Heading
                        className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-medium"
                        level="custom">
                        <Anchor href={action.href} variant="unstyled">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {action.title}
                        </Anchor>
                        {action.featured && (
                          <span>
                            <Badge
                              label={intl.formatMessage({
                                defaultMessage: 'Recommended',
                                description: 'Label for Recommended tag',
                                id: 'baItxW',
                              })}
                              size="sm"
                              variant="success"
                            />
                          </span>
                        )}
                      </Heading>
                      <Section>
                        <Text
                          className="mt-1 block"
                          color="secondary"
                          size="body2">
                          {action.description}
                        </Text>
                      </Section>
                    </div>
                    <div className="shrink-0 self-center">
                      <RiArrowRightSLine
                        aria-hidden="true"
                        className={clsx(
                          'size-5 shrink-0',
                          themeTextSecondaryColor,
                          themeTextBrandColor_GroupHover,
                        )}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      </Section>
    </div>
  );
}
