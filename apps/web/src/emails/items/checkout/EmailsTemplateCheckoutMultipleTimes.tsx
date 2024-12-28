import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsParagraph,
  EmailsStrong,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';
import type { EmailsUnsubscribeFields } from '~/emails/EmailsTypes';
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
} from '@react-email/components';

type Props = Readonly<{
  coupon: Readonly<{
    code: string;
    expiryDays: number;
    percentOff: number;
  }>;
  name: string | null;
  unsub: EmailsUnsubscribeFields;
}>;

export default function EmailsTemplateCheckoutMultipleTimes({
  name,
  coupon,
  unsub,
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
                <Img
                  height="80"
                  src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/discounts/ticket.png"
                  width="170"
                />
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Container style={{ ...couponCode, marginTop: 16 }}>
                  <EmailsParagraph
                    size="body3"
                    style={{
                      color: '#fff',
                      margin: '4px 12px',
                    }}
                    weight="bold">
                    Coupon code: {coupon.code}
                  </EmailsParagraph>
                </Container>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <EmailsParagraph
                  size="body2"
                  style={{
                    marginTop: 8,
                  }}
                  weight="medium">
                  Expires in: {coupon.expiryDays * 24} hours from email time
                </EmailsParagraph>
              </Column>
            </Row>
          </Section>
          <Section style={{ marginTop: 40 }}>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              Hi {name ?? 'there'},
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              We noticed you were so close to completing your purchase. To thank
              you for your interest, we're offering you a{' '}
              <EmailsStrong>{coupon.percentOff}% discount</EmailsStrong>. This
              is the <EmailsStrong>highest no-frills discount</EmailsStrong> we
              currently offer.
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              Use this promo code at checkout:{' '}
              <EmailsStrong>{coupon.code}</EmailsStrong>, but don't wait too
              long–this offer expires in{' '}
              <EmailsStrong>{coupon.expiryDays * 24} hours</EmailsStrong>!
            </EmailsParagraph>
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
                <EmailsParagraph
                  defaultMargins={true}
                  size="body2"
                  style={{
                    textAlign: 'center',
                  }}>
                  Apply the code to any plan you want, even lifetime!
                </EmailsParagraph>
              </Column>
            </Row>
          </Section>
          <EmailsFooter unsub={unsub} />
        </Container>
      </Body>
    </Html>
  );
}

const couponCode = {
  backgroundColor: '#016ffa',
  borderRadius: 4,
  display: 'block',
  width: 'fit-content',
};
