'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

import SponsorsAdvertiseRequestForm from './SponsorsAdvertiseRequestForm';

export default function SponsorsAdvertiseRequestPage() {
  const searchParams = useSearchParams();
  const step = searchParams?.get('step');

  return (
    <div
      className={clsx(
        !step && [
          'isolate before:!-top-[180px]',
          themeRadialWhiteGlowBackground,
        ],
      )}>
      <Container
        className={clsx('py-12', step && 'lg:py-20')}
        width="marketing">
        {step && (
          <>
            <Heading level="heading4">
              <FormattedMessage
                defaultMessage="Advertise on GreatFrontEnd"
                description="Title for advertise request page"
                id="P4PHei"
              />
            </Heading>
            <Text className="mt-4 block max-w-prose" color="subtitle">
              <FormattedMessage
                defaultMessage="Fill this super quick form to start advertising! Upon approval ({approvalDays}
        days), you will receive a confirmation email with the invoice and
        payment link."
                description="Subtitle for advertise request page"
                id="CILeO3"
                values={{
                  approvalDays: '1-2',
                }}
              />
            </Text>
          </>
        )}
        <Section>
          <div className={clsx(step && 'mt-12')}>
            <SponsorsAdvertiseRequestForm />
          </div>
        </Section>
      </Container>
    </div>
  );
}
