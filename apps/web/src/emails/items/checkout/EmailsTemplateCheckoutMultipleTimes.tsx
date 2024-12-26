import EmailButton from '~/emails/components/EmailButton';
import EmailFooter from '~/emails/components/EmailFooter';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Column,
  Container,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

type Props = Readonly<{
  coupon: Readonly<{
    code: string;
    expiryDays: number;
    percentOff: number;
  }>;
  name: string | null;
}>;

export default function EmailsTemplateCheckoutMultipleTimes({
  name,
  coupon,
}: Props) {
  return (
    <Html lang="en">
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
                    fontSize: 36,
                    fontWeight: 600,
                    letterSpacing: '-1.125px',
                    lineHeight: '40px',
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
                    fontSize: 12,
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
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: '24px',
                  margin: '8px 0 0 0',
                }}>
                Expires in: {coupon.expiryDays * 24} hours from email time
              </Text>
            </Column>
          </Row>
          <Section style={body}>
            <Section>
              <Text style={paragraph}>Hi {name ?? 'there'},</Text>
              <Text style={paragraph}>
                We noticed you were so close to completing your purchase. To
                thank you for your interest, we're offering you a limited time{' '}
                <span style={bold}>{coupon.percentOff}% discount</span>! This is
                the <span style={bold}>highest no-frills discount</span> we
                currently offer.
              </Text>
              <Text style={paragraph}>
                Use this promo code at checkout:{' '}
                <span style={bold}>{coupon.code}</span>, but don't wait too
                long–this offer expires in{' '}
                <span style={bold}>{coupon.expiryDays * 24} hours</span>!
              </Text>
            </Section>
            <Section style={{ margin: '40px 0 0 0' }}>
              <Row>
                <Column align="center">
                  <EmailButton
                    href={new URL(
                      '/interviews/pricing',
                      getSiteOrigin(),
                    ).toString()}
                    variant="primary">
                    Checkout now →
                  </EmailButton>
                </Column>
              </Row>
              <Row>
                <Column align="center">
                  <Text
                    style={{
                      color: '#52525B',
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: '20px',
                      textAlign: 'center',
                    }}>
                    Apply the code to any plan you want, even lifetime!
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
  color: '#18181B',
  fontFamily:
    'Inter, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu","Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
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
  fontSize: 16,
  lineHeight: '24px',
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
