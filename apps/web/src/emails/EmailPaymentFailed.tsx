import React from 'react';

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type Props = Readonly<{
  name?: string | null;
}>;

export function EmailPaymentFailed({ name }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your payment has failed, here's how you can fix it</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            Your payment has failed, here's how you can fix it
          </Heading>
          <Section style={body}>
            <Text style={paragraph}>Hi {name ?? 'there'},</Text>
            <Text style={paragraph}>
              We noticed that your attempt to pay on GreatFrontEnd has failed.{' '}
              This is a common problem faced by customers from countries like
              India and Vietnam. Please check and try the following:
            </Text>
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
                  <Link href="https://www.greatfrontend.com/profile/billing">
                    Customer Portal from the Billing page
                  </Link>{' '}
                  and delete any cards that have been added. Then try paying
                  again.
                </Text>
              </li>
            </ol>
            <Text style={paragraph}>
              {/* TODO: generalize for projects */}
              <Link
                href="https://www.greatfrontend.com/interviews/pricing"
                style={link}>
                Click here to try again
              </Link>
            </Text>
            <Text style={paragraph}>
              Send an email to{' '}
              <Link href="mailto:contact@greatfrontend.com">
                contact@greatfrontend.com
              </Link>{' '}
              if you're still facing issues!
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            GreatFrontEnd Team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>Codeney Pte. Ltd.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '#948cf9',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};
