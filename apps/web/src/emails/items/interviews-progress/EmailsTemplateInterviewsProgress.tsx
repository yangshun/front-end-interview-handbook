import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsLink,
  EmailsStrong,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Column,
  Container,
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
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsHeading as="h1" level="heading1">
              Premium offers you'll love
            </EmailsHeading>
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
                    Share a <EmailsStrong>success story or review</EmailsStrong>{' '}
                    of GreatFrontEnd →
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
                    Sign up with <EmailsStrong>student email →</EmailsStrong>
                  </Text>
                </Column>
              </Row>
            </Link>
            <Link href={new URL(`/rewards/social`, getSiteOrigin()).toString()}>
              <Row style={{ marginTop: 24 }}>
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
                    <EmailsStrong>following us on social media →</EmailsStrong>
                  </Text>
                </Column>
              </Row>
            </Link>
          </Section>
          <Section
            style={{
              marginTop: 64,
            }}>
            <EmailsHeading as="h2" level="heading2">
              Fast-track to your dream job
            </EmailsHeading>
            <Text style={{ ...paragraph, marginTop: 8 }}>
              You could land a job without Premium, but why not get there
              faster?
            </Text>
            <Img
              alt="Premium vs Non-premium comparison"
              height="auto"
              src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/PremiumNonPremiumComparison.png"
              style={{
                marginTop: 32,
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
                marginTop: 16,
              }}>
              Many interviewers create their questions based on resources like
              ours. Get a head start by practicing with the same source that
              inspires countless front end interviewers.{' '}
              <EmailsLink
                href={new URL(
                  `/interviews/pricing`,
                  getSiteOrigin(),
                ).toString()}
                style={{
                  fontWeight: 600,
                }}>
                Go premium →
              </EmailsLink>
            </Text>
          </Section>
          <Section
            style={{
              marginTop: 64,
            }}>
            <EmailsHeading as="h2" level="heading2">
              It's worth it when it's your dream job
            </EmailsHeading>
            <Text style={{ ...paragraph, marginTop: 8 }}>
              Join the ranks of tens of thousands using GreatFrontEnd Premium to
              stay ahead of the competition.
            </Text>
            <EmailsButton
              href={new URL('/interviews/pricing', getSiteOrigin()).toString()}
              style={{
                marginBottom: 24,
                marginTop: 40,
              }}
              variant="primary">
              Get Premium now →
            </EmailsButton>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}

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

const grayCard = {
  background: '#FAFAFA',
  border: '1px solid #E4E4E7',
  borderRadius: 8,
  display: 'block',
  padding: 24,
  width: '100%',
};
