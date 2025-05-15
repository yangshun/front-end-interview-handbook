'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeBorderColor,
  themeDivideColor,
  themeIconColor,
  themeTextBrandColor_GroupHover,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

type Props = Readonly<{
  links: ReadonlyArray<{
    description: string | undefined;
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    title: string;
  }>;
  returnHref: string;
}>;

export default function NotFoundPage({ links, returnHref }: Props) {
  const intl = useIntl();
  const pathname = usePathname();

  useEffect(() => {
    gtag.event({
      action: '404',
      category: 'engagement',
      label: pathname ?? window.location.pathname,
    });
    gtag.event({
      action: `404.${pathname}`,
      category: 'engagement',
      label: pathname ?? window.location.pathname,
    });
    logEvent('not_found', {
      namespace: 'general',
    });
  }, [pathname]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl py-12 sm:py-16">
        <Heading className="text-center" level="heading4">
          {intl.formatMessage({
            defaultMessage: 'This page does not exist',
            description: 'Not found page title',
            id: 'tbjYz4',
          })}
        </Heading>
        <Section>
          <div className="mt-4 md:mt-8">
            <Text
              className="block text-pretty text-center"
              color="secondary"
              size="body1">
              {intl.formatMessage({
                defaultMessage:
                  'The page has been removed or there is a mistake in the URL.',
                description: 'Not found page description',
                id: '8S9LzK',
              })}
            </Text>
            <Text className="mb-2 mt-8 block" color="secondary" size="body2">
              {intl.formatMessage({
                defaultMessage: 'In the meantime, check out these pages:',
                description: 'Not found page suggestion',
                id: 'vZx+Xb',
              })}
            </Text>
            <Section>
              <ul
                className={clsx(
                  ['border-y', themeBorderColor],
                  ['divide-y', themeDivideColor],
                )}
                role="list">
                {links.map((link) => (
                  <li
                    key={link.title}
                    className="group relative flex items-start gap-x-4 py-6">
                    <div className="shrink-0">
                      <span
                        className={clsx(
                          'flex items-center justify-center rounded-lg',
                          'size-12',
                          themeBackgroundChipColor,
                        )}>
                        <link.icon
                          aria-hidden="true"
                          className={clsx(
                            'size-6',
                            'shrink-0',
                            'transition-colors',
                            themeIconColor,
                            themeTextBrandColor_GroupHover,
                          )}
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 gap-1">
                      <Heading className="text-base font-medium" level="custom">
                        <span className="focus-within:ring-brand rounded-sm focus-within:ring-2 focus-within:ring-offset-2">
                          <Anchor
                            className="focus:outline-none"
                            href={link.href}
                            variant="unstyled">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {link.title}
                          </Anchor>
                        </span>
                      </Heading>
                      <Section>
                        <Text className="block" color="secondary" size="body2">
                          {link.description}
                        </Text>
                      </Section>
                    </div>
                    <div className="shrink-0 self-center">
                      <RiArrowRightSLine
                        aria-hidden="true"
                        className={clsx(
                          'size-6',
                          'shrink-0',
                          themeIconColor,
                          themeTextBrandColor_GroupHover,
                        )}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Anchor
                  className={textVariants({ color: 'inherit', size: 'body2' })}
                  href={returnHref}>
                  {intl.formatMessage({
                    defaultMessage: 'Go back',
                    description: 'Go back label',
                    id: 'rviSvL',
                  })}
                  <span aria-hidden="true"> &rarr;</span>
                </Anchor>
              </div>
            </Section>
          </div>
        </Section>
      </div>
    </main>
  );
}
