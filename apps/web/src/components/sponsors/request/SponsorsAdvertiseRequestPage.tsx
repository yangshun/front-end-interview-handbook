import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import SponsorsAdvertiseRequestForm from './SponsorsAdvertiseRequestForm';

export default function SponsorsAdvertiseRequestPage() {
  return (
    <Container className="py-12 lg:py-20" width="marketing">
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
      <Section>
        <div className="mt-12">
          <SponsorsAdvertiseRequestForm />
        </div>
      </Section>
    </Container>
  );
}
