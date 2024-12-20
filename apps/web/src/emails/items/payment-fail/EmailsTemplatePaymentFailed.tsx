import React from 'react';

import EmailFooter from '~/emails/components/EmailFooter';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type Props = Readonly<{
  name?: string | null;
}>;

export default function EmailsTemplatePaymentFailed({ name }: Props) {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,800;1,14..32,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>Your payment has failed, here's how you can fix it</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            height="auto"
            src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/logo.png"
            style={{
              marginBottom: '40px',
            }}
            width="53"
          />
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
            <Text style={paragraph}>
              {/* TODO: generalize for projects */}
              <Link
                href={new URL(
                  '/interviews/pricing',
                  getSiteOrigin(),
                ).toString()}
                style={link}>
                Click here to try again
              </Link>
            </Text>
            <Text style={paragraph}>
              Send an email to{' '}
              <Link href="mailto:contact@greatfrontend.com" style={link}>
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
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#fff',
  color: '#18181B',
  fontFamily:
    'Inter, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  marginTop: '30px',
  maxWidth: '600px',
};

const heading = {
  color: '#18181B',
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '40px 0 0 0',
};

const paragraph = {
  color: '#18181B',
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '#18181B',
  textDecoration: 'underline',
};
