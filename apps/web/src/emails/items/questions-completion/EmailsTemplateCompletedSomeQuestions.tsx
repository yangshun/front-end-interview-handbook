import EmailFooter from '~/emails/components/EmailFooter';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

export default function EmailsTemplateCompletedSomeQuestions() {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,800;1,14..32,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>Get the full experience of Premium with special deals</Preview>
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
          <Text style={{ ...textBody0, margin: '8px 0 0 0' }}>
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
              <Section style={greyCard}>
                <Text style={{ ...paragraph, fontWeight: 500 }}>
                  🔊 Did you know?
                </Text>
                <Text
                  style={{
                    ...paragraph,
                    color: '#3F3F46',
                    margin: '16px 0 0 0',
                  }}>
                  Ever wondered how interviewers craft their questions? They
                  often get inspiration from or modify existing ones, including
                  GreatFrontEnd questions.
                </Text>
                <Link
                  href={new URL(
                    `/interviews/pricing`,
                    getSiteOrigin(),
                  ).toString()}>
                  <Text
                    style={{
                      ...paragraph,
                      fontWeight: 600,
                      textDecoration: 'underline',
                    }}>
                    Go Premium and excel!
                  </Text>
                </Link>
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
                    fontSize: '16px',
                    fontWeight: 500,
                    height: '40px',
                    lineHeight: '24px',
                    margin: '40px 0 24px 0',
                  }}>
                  <span
                    style={{ display: 'inline-block', padding: '8px 20px' }}>
                    Get Premium now
                  </span>
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

const heading1 = {
  color: '#18181B',
  fontSize: '1.875rem',
  fontWeight: 600,
  lineHeight: '2.5rem',
  margin: '40px 0 0 0',
};

const heading2 = {
  fontSize: '1.5rem',
  fontWeight: 600,
  lineHeight: '2rem',
};

const textBody0 = {
  color: '#18181B',
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  margin: 0,
};

const body = {
  margin: '64px 0 0 0',
};

const paragraph = {
  color: '#18181B',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  margin: 0,
};

const bold = {
  color: '#18181B',
  fontWeight: 600,
};

const greyCard = {
  background: '#FAFAFA',
  border: '1px solid #E4E4E7',
  borderRadius: '8px',
  display: 'block',
  padding: '24px',
  width: '100%',
};
