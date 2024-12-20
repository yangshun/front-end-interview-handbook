import EmailFooter from '~/emails/components/EmailFooter';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

type Props = Readonly<{
  coupon: Readonly<{
    code: string;
    percentOff: number;
  }>;
  name: string;
}>;

export default function EmailsTemplateCheckoutMultipleTimes({
  name,
  coupon,
}: Props) {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,800;1,14..32,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>
        Final call to save big on Premium. Complete your purchase today!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Row>
            <Column align="center" style={{ padding: '14px 0' }}>
              <Img
                height="auto"
                src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/logo.png"
                width="53"
              />
            </Column>
          </Row>
          <Row>
            <Column align="center">
              <Container style={{ ...couponCard, margin: '40px 0 0 0' }}>
                <Text
                  style={{
                    color: '#18181B',
                    fontSize: '36px',
                    fontWeight: 600,
                    letterSpacing: '-1.125px',
                    lineHeight: '40px',
                    margin: '24px 8px',
                  }}>
                  {coupon.percentOff}% OFF
                </Text>
              </Container>
            </Column>
          </Row>
          <Row>
            <Column align="center">
              <Container style={{ ...couponCode, margin: '16px 0 0 0' }}>
                <Text
                  style={{
                    color: '#18181B',
                    fontSize: '12px',
                    fontWeight: 600,
                    lineHeight: '16px',
                    margin: '4px 12px',
                  }}>
                  Coupon code: {coupon.code}
                </Text>
              </Container>
            </Column>
          </Row>
          <Row>
            <Column align="center">
              <Text
                style={{
                  color: '#18181B',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '24px',
                  margin: '8px 0 0 0',
                }}>
                Expires in: 48 hours from email time
              </Text>
            </Column>
          </Row>
          <Section style={body}>
            <Section>
              <Text style={paragraph}>Hi {name},</Text>
              <Text style={paragraph}>
                We noticed you were so close to completing your purchase. To
                thank you for your interest, we're offering you a special{' '}
                <span style={bold}>{coupon.percentOff}% discount</span>, no
                frills.
              </Text>
              <Text style={paragraph}>
                This is the <span style={bold}>highest no-frills discount</span>{' '}
                we currently offer.
              </Text>
              <Text style={paragraph}>
                But don't wait too long—this offer expires in{' '}
                <span style={bold}>48 hours</span>!
              </Text>
            </Section>
            <Section style={{ margin: '40px 0 0 0' }}>
              <Row>
                <Column align="center">
                  <Link
                    href={new URL(
                      '/interviews/pricing',
                      getSiteOrigin(),
                    ).toString()}
                    style={{
                      background: '#E3FE6F',
                      borderRadius: '40px',
                      color: '#18181B',
                      display: 'inline-block',
                      fontSize: '16px',
                      fontWeight: 500,
                      height: '40px',
                      lineHeight: '24px',
                    }}>
                    <span
                      style={{ display: 'inline-block', padding: '8px 20px' }}>
                      Checkout now
                    </span>
                  </Link>
                </Column>
              </Row>
              <Row>
                <Column align="center">
                  <Text
                    style={{
                      color: '#52525B',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      textAlign: 'center',
                    }}>
                    We'll apply the code to any plan you pick
                  </Text>
                </Column>
              </Row>
            </Section>
            <EmailFooter />
          </Section>
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

const body = {
  margin: '40px 0 0 0',
};

const paragraph = {
  color: '#3F3F46',
  fontSize: '1rem',
  lineHeight: '1.5rem',
};

const bold = {
  color: '#18181B',
  fontWeight: 600,
};

const couponCard = {
  backgroundColor: '#F5F5F5',
  borderRadius: '9px',
  textAlign: 'center' as const,
  width: '265px',
};
const couponCode = {
  backgroundColor: '#E3FE6F',
  borderRadius: '4px',
  display: 'block',
  width: 'fit-content',
};
