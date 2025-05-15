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
  EmailsHeading,
  EmailsParagraph,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';

// This email template is just to generate HTML content to be used in Supabase email template
// It is not triggered from GFE website
export default function EmailsTemplateAuthEmailVerify() {
  return (
    <Html lang="en">
      <Preview>
        Thanks for signing up with GreatFrontEnd! Simply click the button below,
        verify your email address and you're free to explore the platform.
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsHeading as="h1" level="heading1">
              Verify your email
            </EmailsHeading>
            <EmailsParagraph defaultMargins={true}>
              Thanks for signing up with GreatFrontEnd! Simply click the button
              below, verify your email address and you're free to explore the
              platform.
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              <EmailsButton href="{{ .ConfirmationURL }}" variant="primary">
                Verify now
              </EmailsButton>
            </EmailsParagraph>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}
