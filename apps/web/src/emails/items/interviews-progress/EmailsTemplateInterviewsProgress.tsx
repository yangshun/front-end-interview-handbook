import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsLink,
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
  Link,
  Preview,
  Row,
  Section,
} from '@react-email/components';

type Props = Readonly<{
  unsub: EmailsUnsubscribeFields;
}>;

export default function EmailsTemplateInterviewsProgress({ unsub }: Props) {
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
            <EmailsParagraph size="body1" style={{ marginTop: 8 }}>
              Get amazing discounts with simple steps – choose your offer and
              save today!
            </EmailsParagraph>
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
                    src="https://emails.gfecdn.net/discounts/discount-100.png"
                    width="80"
                  />
                </Column>
                <Column>
                  <EmailsParagraph
                    color="secondary"
                    style={{
                      marginLeft: 20,
                    }}>
                    Share a <EmailsStrong>success story or review</EmailsStrong>{' '}
                    of GreatFrontEnd →
                  </EmailsParagraph>
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
                    src="https://emails.gfecdn.net/discounts/discount-40.png"
                    width="80"
                  />
                </Column>
                <Column>
                  <EmailsParagraph
                    color="secondary"
                    style={{
                      marginLeft: 20,
                    }}>
                    Sign up with <EmailsStrong>student email →</EmailsStrong>
                  </EmailsParagraph>
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
                    src="https://emails.gfecdn.net/discounts/discount-20.png"
                    width="80"
                  />
                </Column>
                <Column>
                  <EmailsParagraph
                    color="secondary"
                    style={{
                      marginLeft: 20,
                    }}>
                    Do simple tasks like{' '}
                    <EmailsStrong>following us on social media →</EmailsStrong>
                  </EmailsParagraph>
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
            <EmailsParagraph color="secondary" style={{ marginTop: 8 }}>
              You could land a job without Premium, but why not get there
              faster?
            </EmailsParagraph>
            <Img
              alt="Premium vs Non-premium comparison"
              height="auto"
              src="https://emails.gfecdn.net/interviews/premium-comparison.png"
              style={{
                marginTop: 32,
              }}
              width="100%"
            />
          </Section>
          <Section style={{ ...grayCard, marginTop: 64 }}>
            <EmailsParagraph color="secondary" style={{ fontWeight: 500 }}>
              🔊 Did you know?
            </EmailsParagraph>
            <EmailsParagraph
              color="subtitle"
              style={{
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
            </EmailsParagraph>
          </Section>
          <Section
            style={{
              marginTop: 64,
            }}>
            <EmailsHeading as="h2" level="heading2">
              It's worth it when it's your dream job
            </EmailsHeading>
            <EmailsParagraph style={{ marginTop: 8 }}>
              Join the ranks of tens of thousands using GreatFrontEnd Premium to
              stay ahead of the competition.
            </EmailsParagraph>
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
          <EmailsFooter unsub={unsub} />
        </Container>
      </Body>
    </Html>
  );
}

const grayCard = {
  background: '#fafafa',
  border: '1px solid #e4e4e7',
  borderRadius: 8,
  display: 'block',
  padding: 24,
  width: '100%',
};
