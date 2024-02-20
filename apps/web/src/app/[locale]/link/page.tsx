'use client';

import clsx from 'clsx';
import { notFound, useSearchParams } from 'next/navigation';
import { RiLink } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import LogoLink from '~/components/global/logos/LogoLink';
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
    <div className="flex min-h-screen flex-col">
      <Navbar isLoading={false} links={[]} logo={<LogoLink />} />
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-4">
        <RiLink className={clsx('size-10 shrink-0', themeTextSecondaryColor)} />
        <div className="flex max-w-[360px] flex-col items-center justify-center gap-1 px-4 md:px-0">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="You're about to open a link:"
              description="Title for external link page"
              id="pWwyKQ"
            />
          </Heading>
          <Section>
            <Heading
              className="max-w-full truncate md:max-w-lg"
              level="heading5">
              {externalUrl}
            </Heading>
            <Text
              className="text-center text-neutral-500 dark:text-neutral-200"
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
