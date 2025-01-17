import React from 'react';

import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsParagraph,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';

import {
  Body,
  Container,
  Html,
  Preview,
  Section,
} from '@react-email/components';

// This email template is just to generate HTML content to be used in Supabase email template
// It is not triggered from GFE website
export default function EmailsTemplateAuthPasswordReset() {
  return (
    <Html lang="en">
      <Preview>Reset your GreatFrontEnd password</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsHeading as="h1" level="heading1">
              Reset password
            </EmailsHeading>
            <EmailsParagraph defaultMargins={true}>
              Click the button below to securely reset your password.
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              <EmailsButton href="{{ .ConfirmationURL }}" variant="primary">
                Reset Password
              </EmailsButton>
            </EmailsParagraph>
            <EmailsParagraph>
              If you didn't request to reset your password, you can safely
              ignore this email.
            </EmailsParagraph>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}
