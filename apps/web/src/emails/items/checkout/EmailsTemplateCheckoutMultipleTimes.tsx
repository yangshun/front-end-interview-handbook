import EmailButton from '~/emails/components/EmailButton';
import EmailFooter from '~/emails/components/EmailFooter';
import EmailHeader from '~/emails/components/EmailHeader';
import { containerStyle, mainStyle } from '~/emails/components/EmailStyles';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Column,
  Container,
  Html,
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
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailHeader align="center" />
          <Section style={{ marginTop: 40 }}>
            <Row>
              <Column align="center">
                <Container style={couponCard}>
                  <Text
                    style={{
                      color: '#18181B',
                      fontSize: 24,
                      fontWeight: 600,
                      lineHeight: '32px',
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
          </Section>
          <Section style={{ marginTop: 40 }}>
            <Text style={paragraph}>Hi {name ?? 'there'},</Text>
            <Text style={paragraph}>
              We noticed you were so close to completing your purchase. To thank
              you for your interest, we're offering you a{' '}
              <span style={bold}>{coupon.percentOff}% discount</span>. This is
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
          <Section style={{ marginTop: 40 }}>
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
        </Container>
      </Body>
    </Html>
  );
}

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
  backgroundImage:
    'url(https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/discounts/ticket.png)',
  height: 80,
  textAlign: 'center' as const,
  width: 170,
};

const couponCode = {
  backgroundColor: '#E3FE6F',
  borderRadius: 4,
  display: 'block',
  width: 'fit-content',
};
