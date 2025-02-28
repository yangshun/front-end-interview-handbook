'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiCheckboxCircleLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextSuccessColor } from '~/components/ui/theme';

export default function SponsorsAdvertiseRequestSuccessPage() {
  const intl = useIntl();

  return (
    <Container className="py-16" width="marketing">
      <div className="flex flex-col items-center space-y-6">
        <RiCheckboxCircleLine
          aria-hidden={true}
          className={clsx('size-16 shrink-0', themeTextSuccessColor)}
        />
        <div className="flex flex-col gap-y-2">
          <Heading level="heading4">
            <FormattedMessage
              defaultMessage="Advertise on GreatFrontEnd"
              description="Title for advertise request page"
              id="P4PHei"
            />
          </Heading>
          <Text className="max-w-md text-center" color="subtitle" size="body0">
            <FormattedMessage
              defaultMessage="Request submitted successfully!"
              description="Subtitle for advertise request success page"
              id="gco77c"
            />
          </Text>
        </div>
        <Text className="max-w-md text-center" color="secondary" size="body1">
          <FormattedMessage
            defaultMessage="Upon approval ({approvalDays} days), you will receive a confirmation email with the invoice and payment link."
            description="Advertise request success message"
            id="HERJCK"
            values={{
              approvalDays: '1-2',
            }}
          />
        </Text>

        <Button
          className="mt-10"
          href="/advertise-with-us"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Go back',
            description: 'Go back button label',
            id: 'Ie6Nzu',
          })}
          size="md"
          variant="primary"
        />
      </div>
    </Container>
  );
}
