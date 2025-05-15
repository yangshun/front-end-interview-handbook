import {
  Body,
  Container,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import React from 'react';

import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsParagraph,
  EmailsStrong,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';

type Props = Readonly<{
  name: string | null;
  requestUrl: string;
}>;

export default function EmailsTemplateSponsorsAdRequestConfirmation({
  name,
  requestUrl,
}: Props) {
  return (
    <Html lang="en">
      <Preview>
        Thanks for considering GreatFrontEnd for your advertising needs. We're
        reviewing your details and will respond within the next 24 - 48 hours.
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              Dear {name ? name.split(/\s+/)[0] : 'there'},
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              Thank you for considering{' '}
              <EmailsStrong>GreatFrontEnd</EmailsStrong> for your advertising
              needs.
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              We're reviewing your details and will respond within the next 24 -
              48 hours. Meanwhile, feel free to modify your response using the
              link below.
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              <EmailsButton href={requestUrl} variant="primary">
                Edit your submission
              </EmailsButton>
            </EmailsParagraph>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}
