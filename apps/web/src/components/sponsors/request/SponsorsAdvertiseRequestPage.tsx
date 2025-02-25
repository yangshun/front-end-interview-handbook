import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import SponsorsAdvertiseRequestForm from './SponsorsAdvertiseRequestForm';

export default function SponsorsAdvertiseRequestPage() {
  return (
    <Container className="py-12 lg:py-20" width="5xl">
      <Heading level="heading4">Advertise on GreatFrontEnd</Heading>
      <Text className="mt-4 block max-w-prose" color="subtitle">
        Fill this super quick form to start advertising! Upon approval (1–2
        days), you will receive a confirmation email with the invoice and
        payment link.
      </Text>
      <Section>
        <div className="mt-12">
          <SponsorsAdvertiseRequestForm />
        </div>
      </Section>
    </Container>
  );
}
