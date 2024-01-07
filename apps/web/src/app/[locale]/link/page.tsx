'use client';

import clsx from 'clsx';
import { notFound, useSearchParams } from 'next/navigation';
import { RiLink } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import LogoLink from '~/components/global/Logo';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Navbar from '~/components/ui/Navbar/Navbar';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

export default function ExternalLinkPage() {
  const intl = useIntl();
  const searchParams = useSearchParams();

  const externalUrl = searchParams?.get('u')
    ? decodeURIComponent(searchParams.get('u') ?? '')
    : '';

  if (!externalUrl) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoading={false} links={[]} logo={<LogoLink />} />
      <div className="flex items-center justify-center h-full flex-1 flex-col gap-4">
        <RiLink
          className={clsx('h-10 w-10 shrink-0', themeTextSecondaryColor)}
        />
        <div className="max-w-[360px] md:px-0 px-4 flex flex-col justify-center items-center gap-1">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="You're about to open a link:"
              description="Title for external link page"
              id="pWwyKQ"
            />
          </Heading>
          <Section>
            <Heading
              className="truncate md:max-w-lg max-w-full"
              level="heading5">
              {externalUrl}
            </Heading>
            <Text
              className="dark:text-neutral-200 text-neutral-500 text-center"
              size="body2">
              <FormattedMessage
                defaultMessage="You're about to open an external website. Be cautious and keep your personal information safe"
                description="Subtitle for external link page"
                id="p9Ml7d"
              />
            </Text>
          </Section>
        </div>
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Open anyway',
            description: 'Label for open external link button',
            id: 'XGThSq',
          })}
          size="md"
          variant="primary"
          onClick={() =>
            window.open(externalUrl, '_self', 'noopener,noreferrer')
          }
        />
      </div>
    </div>
  );
}
