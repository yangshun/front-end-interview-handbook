import React from 'react';

import EmailButton from '~/emails/components/EmailButton';
import EmailFooter from '~/emails/components/EmailFooter';
import EmailHeader from '~/emails/components/EmailHeader';
import { containerStyle, mainStyle } from '~/emails/components/EmailStyles';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Column,
  Container,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
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
          <EmailHeader />
          <Section style={{ marginTop: 40 }}>
            <Heading style={heading}>
              Your payment has failed, here's how you can fix it
            </Heading>
            <Text style={paragraph}>Hi {name ?? 'there'},</Text>
            <Text style={paragraph}>
              We noticed that your attempt to pay on GreatFrontEnd has failed.{' '}
              This is a common problem faced by customers from countries like
              India and Vietnam.
            </Text>
            <Text style={paragraph}>Please check and try the following:</Text>
            <ol>
              <li>
                <Text style={paragraph}>
                  If you are using a debit card, ensure that there are
                  sufficient funds in your card.
                </Text>
              </li>
              <li>
                <Text style={paragraph}>
                  Enable international payments/charges for your card. You might
                  be able to do this using your bank's mobile app or calling
                  your bank. Try to pay again after this is done.
                </Text>
              </li>
              <li>
                <Text style={paragraph}>
                  If the payment still doesn't succeed, go to the{' '}
                  <Link
                    href={new URL(
                      '/profile/billing',
                      getSiteOrigin(),
                    ).toString()}
                    style={link}>
                    Customer Portal from the Billing page
                  </Link>{' '}
                  and delete any cards that have been added. Then try paying
                  again.
                </Text>
              </li>
            </ol>
            <Row style={{ marginBottom: 40, marginTop: 40 }}>
              <Column align="center">
                {/* TODO: generalize for projects */}
                <EmailButton
                  href={new URL(
                    '/interviews/pricing',
                    getSiteOrigin(),
                  ).toString()}
                  variant="primary">
                  Click here to try again →
                </EmailButton>
              </Column>
            </Row>
            <Text style={paragraph}>
              Send an email to{' '}
              <Link href="mailto:contact@greatfrontend.com" style={link}>
                contact@greatfrontend.com
              </Link>{' '}
              if you're still facing issues!
            </Text>
          </Section>
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}

const heading = {
  color: '#18181B',
  fontSize: 28,
  fontWeight: 'bold',
  margin: 0,
};

const paragraph = {
  color: '#18181B',
  fontSize: 16,
  lineHeight: '26px',
};

const link = {
  color: '#18181B',
  textDecoration: 'underline',
};
