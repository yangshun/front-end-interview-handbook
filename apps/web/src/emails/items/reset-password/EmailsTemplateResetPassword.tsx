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
// It is not trigger from client side
export default function EmailsTemplateResetPassword() {
  return (
    <Html lang="en">
      <Preview>Here are some remedies that have worked for other users</Preview>
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
            <EmailsButton href="{{ .ConfirmationURL }}" variant="primary">
              Reset Password
            </EmailsButton>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}
