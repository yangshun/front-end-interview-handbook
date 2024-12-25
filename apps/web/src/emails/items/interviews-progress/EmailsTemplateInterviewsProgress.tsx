import EmailFooter from '~/emails/components/EmailFooter';
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
          <Heading as="h1" style={heading1}>
            Special premium offers
          </Heading>
          <Text style={{ ...textBody1, margin: '8px 0 0 0' }}>
            Unbeatable savings you can't miss
          </Text>
          <Section style={body}>
            <Section>
              <Link
                href={new URL(
                  `/promotions#promotions-review-cashback`,
                  getSiteOrigin(),
                ).toString()}>
                <Row>
                  <Column
                    align="center"
                    style={{
                      width: '96px',
                    }}>
                    <Img
                      alt="$10 off ticket image"
                      height="auto"
                      src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/discount1.png"
                      width="96"
                    />
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...paragraph,
                        color: '#52525B',
                        margin: '0 0 0 20px',
                      }}>
                      Share a <span style={bold}>success story or review</span>{' '}
                      of GreatFrontEnd
                    </Text>
                  </Column>
                </Row>
              </Link>
              <Link
                href={new URL(
                  `/promotions#promotions-student-discount`,
                  getSiteOrigin(),
                ).toString()}>
                <Row style={{ margin: '24px 0 0 0' }}>
                  <Column
                    align="center"
                    style={{
                      width: '96px',
                    }}>
                    <Img
                      alt="40% off ticket image"
                      height="auto"
                      src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/discount2.png"
                      width="96"
                    />
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...paragraph,
                        color: '#52525B',
                        margin: '0 0 0 20px',
                      }}>
                      Sign up with <span style={bold}>student email →</span>
                    </Text>
                  </Column>
                </Row>
              </Link>
              <Link
                href={new URL(`/rewards/social`, getSiteOrigin()).toString()}>
                <Row style={{ margin: '24px 0 0 0' }}>
                  <Column
                    align="center"
                    style={{
                      width: '96px',
                    }}>
                    <Img
                      alt="20% off ticket image"
                      height="auto"
                      src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/discount3.png"
                      width="96"
                    />
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...paragraph,
                        color: '#52525B',
                        margin: '0 0 0 20px',
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
                margin: '64px 0 0 0',
              }}>
              <Heading style={heading2}>Fast-track to your dream job</Heading>
              <Text style={{ ...paragraph, margin: '8px 0 0 0' }}>
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
            <Section
              style={{
                margin: '64px 0 0 0',
              }}>
              <Section style={grayCard}>
                <Text style={{ ...paragraph, fontWeight: 500 }}>
                  🔊 Did you know?
                </Text>
                <Text
                  style={{
                    ...paragraph,
                    color: '#3F3F46',
                    margin: '16px 0 0 0',
                  }}>
                  Many interviewers create their questions based on resources
                  like ours. Get a head start by practicing with the same source
                  that inspires countless front end interviewers.{' '}
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
                  margin: '64px 0 0 0',
                }}>
                <Heading style={heading2}>
                  It's worth it when it's your dream job
                </Heading>
                <Text style={{ ...paragraph, margin: '8px 0 0 0' }}>
                  Join the ranks of tens of thousands using Premium to stay
                  ahead of the competition.
                </Text>
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
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: '24px',
                    margin: '40px 0 24px 0',
                    padding: '8px 20px',
                  }}>
                  Get Premium now
                </Link>
              </Section>
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
    'Inter, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  marginTop: 30,
  maxWidth: 600,
};

const heading1 = {
  color: '#18181B',
  fontSize: 30,
  fontWeight: 600,
  lineHeight: '40px',
  margin: '40px 0 0 0',
};

const heading2 = {
  fontSize: 24,
  fontWeight: 600,
  lineHeight: '32px',
};

const textBody1 = {
  color: '#18181B',
  fontSize: 16,
  lineHeight: '28px',
  margin: 0,
};

const body = {
  margin: '64px 0 0 0',
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
  borderRadius: '8px',
  display: 'block',
  padding: '24px',
  width: '100%',
};
