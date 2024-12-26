import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsStrong,
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
          <EmailsHeader align="center" />
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
                <Container style={{ ...couponCode, marginTop: 16 }}>
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
                    marginTop: 8,
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
              <EmailsStrong>{coupon.percentOff}% discount</EmailsStrong>. This
              is the <EmailsStrong>highest no-frills discount</EmailsStrong> we
              currently offer.
            </Text>
            <Text style={paragraph}>
              Use this promo code at checkout:{' '}
              <EmailsStrong>{coupon.code}</EmailsStrong>, but don't wait too
              long–this offer expires in{' '}
              <EmailsStrong>{coupon.expiryDays * 24} hours</EmailsStrong>!
            </Text>
          </Section>
          <Section style={{ marginTop: 40 }}>
            <Row>
              <Column align="center">
                <EmailsButton
                  href={new URL(
                    '/interviews/pricing',
                    getSiteOrigin(),
                  ).toString()}
                  variant="primary">
                  Checkout now →
                </EmailsButton>
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
          <EmailsFooter />
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
