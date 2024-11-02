'use client';

import clsx from 'clsx';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { RiLink } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

const SAFE_DOMAINS = [
  'github.com',
  'github.io',
  'vercel.app',
  'netlify.app',
  'pages.dev',
];

export default function ExternalLinkPage() {
  const intl = useIntl();
  const searchParams = useSearchParams();

  const externalUrl = searchParams?.get('u')
    ? decodeURIComponent(searchParams.get('u') ?? '')
    : '';

  function navigateToUrl(url: string) {
    window.open(url, '_self', 'noopener, noreferrer');
  }

  useEffect(() => {
    if (!externalUrl || !URL.canParse(externalUrl)) {
      return;
    }

    const urlParts = new URL(externalUrl);

    if (!SAFE_DOMAINS.some((domain) => urlParts.hostname.endsWith(domain))) {
      return;
    }

    navigateToUrl(externalUrl);
  }, [externalUrl]);

  if (!externalUrl) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Container
        className="flex h-full flex-1 flex-col items-center justify-center gap-6"
        width="md">
        <div
          className={clsx(
            'flex flex-col items-center justify-center gap-2',
            'max-w-sm',
          )}>
          <RiLink
            aria-hidden={true}
            className={clsx('size-10 shrink-0', themeTextSecondaryColor)}
          />
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="You're about to open a link:"
              description="Title for external link page"
              id="pWwyKQ"
            />
          </Heading>
          <Section>
            <Heading
              className="max-w-full truncate text-center md:max-w-lg"
              level="heading5">
              {externalUrl}
            </Heading>
            <Text className="text-center" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="You're about to visit an external website. Proceed with caution and keep your personal information safe!"
                description="Subtitle for external link page"
                id="uK9SHL"
              />
            </Text>
          </Section>
        </div>
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Visit external link',
            description: 'Label for open external link button',
            id: '2BQudu',
          })}
          size="md"
          variant="primary"
          onClick={() => navigateToUrl(externalUrl)}
        />
      </Container>
    </div>
  );
}
