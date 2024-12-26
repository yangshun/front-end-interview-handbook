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
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

export default function EmailsTemplateInterviewsProgress(
  _props: Record<string, never>,
) {
  return (
    <Html lang="en">
      <Preview>Incredible deals you'll want to check out today</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailHeader />
          <Section style={{ marginTop: 40 }}>
            <Heading as="h1" style={heading1}>
              Premium offers you'll love
            </Heading>
            <Text style={{ ...textBody1, marginTop: 8 }}>
              Get amazing discounts with simple steps – choose your offer and
              save today!
            </Text>
          </Section>
          <Section style={{ marginTop: 40 }}>
            <Link
              href={new URL(
                `/promotions#promotions-review-cashback`,
                getSiteOrigin(),
              ).toString()}>
              <Row>
                <Column
                  align="center"
                  style={{
                    width: 80,
                  }}>
                  <Img
                    alt="100% off ticket"
                    height="auto"
                    src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/discounts/discount1.png"
                    width="80"
                  />
                </Column>
                <Column>
                  <Text
                    style={{
                      ...paragraph,
                      color: '#52525B',
                      marginLeft: 20,
                    }}>
                    Share a <span style={bold}>success story or review</span> of
                    GreatFrontEnd →
                  </Text>
                </Column>
              </Row>
            </Link>
            <Link
              href={new URL(
                `/promotions#promotions-student-discount`,
                getSiteOrigin(),
              ).toString()}>
              <Row style={{ marginTop: 24 }}>
                <Column
                  align="center"
                  style={{
                    width: 80,
                  }}>
                  <Img
                    alt="40% off ticket"
                    height="auto"
                    src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/discounts/discount2.png"
                    width="80"
                  />
                </Column>
                <Column>
                  <Text
                    style={{
                      ...paragraph,
                      color: '#52525B',
                      marginLeft: 20,
                    }}>
                    Sign up with <span style={bold}>student email →</span>
                  </Text>
                </Column>
              </Row>
            </Link>
            <Link href={new URL(`/rewards/social`, getSiteOrigin()).toString()}>
              <Row style={{ margin: '24px 0 0 0' }}>
                <Column
                  align="center"
                  style={{
                    width: 80,
                  }}>
                  <Img
                    alt="20% off ticket"
                    height="auto"
                    src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/discounts/discount3.png"
                    width="80"
                  />
                </Column>
                <Column>
                  <Text
                    style={{
                      ...paragraph,
                      color: '#52525B',
                      marginLeft: 20,
                    }}>
                    Do simple tasks like{' '}
                    <span style={bold}>following us on social media →</span>
                  </Text>
                </Column>
              </Row>
            </Link>
          </Section>
          <Section
            style={{
              marginTop: 64,
            }}>
            <Heading as="h2" style={heading2}>
              Fast-track to your dream job
            </Heading>
            <Text style={{ ...paragraph, marginTop: 8 }}>
              You could land a job without Premium, but why not get there
              faster?
            </Text>
            <Img
              alt="Premium vs Non-premium comparison"
              height="auto"
              src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/PremiumNonPremiumComparison.png"
              style={{
                margin: '32px 0 0 0',
              }}
              width="100%"
            />
          </Section>
          <Section style={{ ...grayCard, marginTop: 64 }}>
            <Text style={{ ...paragraph, fontWeight: 500 }}>
              🔊 Did you know?
            </Text>
            <Text
              style={{
                ...paragraph,
                color: '#3F3F46',
                margin: '16px 0 0 0',
              }}>
              Many interviewers create their questions based on resources like
              ours. Get a head start by practicing with the same source that
              inspires countless front end interviewers.{' '}
              <Link
                href={new URL(
                  `/interviews/pricing`,
                  getSiteOrigin(),
                ).toString()}
                style={{
                  ...paragraph,
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}>
                Go premium →
              </Link>
            </Text>
          </Section>
          <Section
            style={{
              marginTop: 64,
            }}>
            <Heading style={heading2}>
              It's worth it when it's your dream job
            </Heading>
            <Text style={{ ...paragraph, marginTop: 8 }}>
              Join the ranks of tens of thousands using GreatFrontEnd Premium to
              stay ahead of the competition.
            </Text>
            <EmailButton
              href={new URL('/interviews/pricing', getSiteOrigin()).toString()}
              style={{
                marginBottom: 24,
                marginTop: 40,
              }}
              variant="primary">
              Get Premium now →
            </EmailButton>
          </Section>
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}

const heading1 = {
  color: '#18181B',
  fontSize: 30,
  fontWeight: 600,
  lineHeight: '40px',
  margin: 0,
};

const heading2 = {
  fontSize: 24,
  fontWeight: 600,
  lineHeight: '32px',
  margin: 0,
};

const textBody1 = {
  color: '#18181B',
  fontSize: 16,
  lineHeight: '28px',
  margin: 0,
};

const paragraph = {
  color: '#18181B',
  fontSize: 16,
  lineHeight: '24px',
  margin: 0,
};

const bold = {
  color: '#18181B',
  fontWeight: 600,
};

const grayCard = {
  background: '#FAFAFA',
  border: '1px solid #E4E4E7',
  borderRadius: 8,
  display: 'block',
  padding: 24,
  width: '100%',
};
