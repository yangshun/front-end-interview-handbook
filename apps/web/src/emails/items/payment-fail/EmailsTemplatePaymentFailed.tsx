import {
  Body,
  Column,
  Container,
  Html,
  Preview,
  Row,
  Section,
} from '@react-email/components';
import React from 'react';

import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsLink,
  EmailsParagraph,
  EmailsStrong,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';

type Props = Readonly<{
  billingPortalUrl: string;
  name?: string | null;
  pricingPageUrl: string;
}>;

export default function EmailsTemplatePaymentFailed({
  billingPortalUrl,
  name,
  pricingPageUrl,
}: Props) {
  return (
    <Html lang="en">
      <Preview>Here are some remedies that have worked for other users</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsHeading as="h1" level="heading1">
              Your payment has failed, here's how you can fix it
            </EmailsHeading>
            <EmailsParagraph defaultMargins={true}>
              Hi {name ?? 'there'},
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              We noticed that your recent attempt to pay on GreatFrontEnd has
              failed. This is a common problem faced by customers from countries
              like India, Egypt, and Russia.
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              Here are some actions that may help:
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              1. <EmailsStrong>Enable international charges</EmailsStrong>:
              Enable international payments/charges for your card. You might be
              able to do this using your bank's mobile app or calling your bank.
              Try to pay again after this is done. This is the most common
              solution for customers in India.
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              2. <EmailsStrong>Insufficient funds</EmailsStrong>: If you are
              using a debit card, ensure that there are sufficient funds in your
              account.
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              3. <EmailsStrong>Re-add your card</EmailsStrong>: If the payment
              still doesn't succeed, go to the{' '}
              <EmailsLink href={billingPortalUrl}>
                Stripe Customer Portal
              </EmailsLink>
              , delete any cards that have been added, then try paying again.
            </EmailsParagraph>
            <Row style={{ marginBottom: 40, marginTop: 40 }}>
              <Column align="center">
                <EmailsButton href={pricingPageUrl} variant="primary">
                  Click here to try again →
                </EmailsButton>
              </Column>
            </Row>
            <EmailsParagraph defaultMargins={true}>
              If these steps do not resolve the issue, please contact our
              support team at{' '}
              <EmailsLink href="mailto:support@greatfrontend.com">
                support@greatfrontend.com
              </EmailsLink>
              .
            </EmailsParagraph>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}
