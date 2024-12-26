import React from 'react';

import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsLink,
  EmailsParagraph,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Column,
  Container,
  Html,
  Preview,
  Row,
  Section,
} from '@react-email/components';

type Props = Readonly<{
  name?: string | null;
}>;

export default function EmailsTemplatePaymentFailed({ name }: Props) {
  return (
    <Html lang="en">
      <Preview>Your payment has failed, here's how you can fix it</Preview>
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
              We noticed that your attempt to pay on GreatFrontEnd has failed.{' '}
              This is a common problem faced by customers from countries like
              India and Vietnam.
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              Please check and try the following:
            </EmailsParagraph>
            <ol>
              <li>
                <EmailsParagraph defaultMargins={true}>
                  If you are using a debit card, ensure that there are
                  sufficient funds in your card.
                </EmailsParagraph>
              </li>
              <li>
                <EmailsParagraph defaultMargins={true}>
                  Enable international payments/charges for your card. You might
                  be able to do this using your bank's mobile app or calling
                  your bank. Try to pay again after this is done.
                </EmailsParagraph>
              </li>
              <li>
                <EmailsParagraph defaultMargins={true}>
                  If the payment still doesn't succeed, go to the{' '}
                  <EmailsLink
                    href={new URL(
                      '/profile/billing',
                      getSiteOrigin(),
                    ).toString()}>
                    Customer Portal from the Billing page
                  </EmailsLink>{' '}
                  and delete any cards that have been added. Then try paying
                  again.
                </EmailsParagraph>
              </li>
            </ol>
            <Row style={{ marginBottom: 40, marginTop: 40 }}>
              <Column align="center">
                {/* TODO: generalize for projects */}
                <EmailsButton
                  href={new URL(
                    '/interviews/pricing',
                    getSiteOrigin(),
                  ).toString()}
                  variant="primary">
                  Click here to try again →
                </EmailsButton>
              </Column>
            </Row>
            <EmailsParagraph defaultMargins={true}>
              Send an email to{' '}
              <EmailsLink href="mailto:contact@greatfrontend.com">
                contact@greatfrontend.com
              </EmailsLink>{' '}
              if you're still facing issues!
            </EmailsParagraph>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}
