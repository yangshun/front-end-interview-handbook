import React from 'react';

import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsNumberedPairText,
} from '~/emails/components/EmailsComponents';
import EmailsHr from '~/emails/components/EmailsHr';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';
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

export default function EmailsTemplateWelcomeSeriesImmediate(
  _props: Record<string, never>,
) {
  return (
    <Html lang="en">
      <Head>
        <style>
          {`
            @media only screen and (max-width: 500px) {
              .responsive-card--width {
                max-width: 100%;
              }
            }
            @media only screen and (min-width: 501px) {
              .responsive-card--width {
                max-width: 50%;
              }
            }
          `}
        </style>
      </Head>
      <Preview>
        Ready to ace your interviews? Welcome to the inside track.
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsHeading as="h1" level="heading1">
              A simple, proven roadmap
            </EmailsHeading>
            <Text style={{ ...textBody1, marginTop: 8 }}>
              To ace your front end interviews in the least amount of time
            </Text>
          </Section>
          <Section style={{ marginTop: 40 }}>
            {ROADMAP.map((item, index) => (
              <EmailsNumberedPairText
                key={item.title}
                {...item}
                index={index}
              />
            ))}
          </Section>
          <EmailsHr />
          <Section>
            <EmailsHeading as="h2" level="heading2">
              Using any excess time
            </EmailsHeading>
            <Text style={{ ...textBody1, marginBottom: 32, marginTop: 48 }}>
              Hone in specific topics you need the most practice
            </Text>
            {FOCUS_AREAS.map(({ name, logo, href }) => (
              <Section
                key={name}
                className="responsive-card--width"
                style={{
                  display: 'inline-block',
                  marginBottom: 24,
                  width: '100%',
                }}>
                <Link href={href}>
                  <Row>
                    <Column style={{ width: 55 }}>
                      <Img
                        alt={`${name}'s logo`}
                        height="55"
                        src={logo}
                        style={{ borderRadius: 8 }}
                        width="55"
                      />
                    </Column>
                    <Column>
                      <Text
                        style={{
                          ...textBody1,
                          fontWeight: 500,
                          marginLeft: 28,
                        }}>
                        {name} →
                      </Text>
                    </Column>
                  </Row>
                </Link>
              </Section>
            ))}
            <Text style={{ ...textBody1, marginBottom: 32, marginTop: 56 }}>
              Revise your fundamentals with knowledge quizzes
            </Text>
            {QUIZ_TOPICS.map(({ name, logo, href }) => (
              <Section
                key={name}
                className="responsive-card--width"
                style={{
                  display: 'inline-block',
                  marginBottom: 16,
                  width: '100%',
                }}>
                <Link href={href}>
                  <Row>
                    <Column style={{ width: 55 }}>
                      <Img
                        alt={`${name}'s logo`}
                        height="55"
                        src={logo}
                        style={{ borderRadius: 8 }}
                        width="55"
                      />
                    </Column>
                    <Column>
                      <Text
                        style={{
                          ...textBody1,
                          marginLeft: 16,
                        }}>
                        {name} →
                      </Text>
                    </Column>
                  </Row>
                </Link>
              </Section>
            ))}
          </Section>
          <EmailsHr />
          <Section>
            <EmailsHeading as="h2" level="heading2">
              More time-savers
            </EmailsHeading>
            <Text style={{ ...textBody1, marginTop: 48 }}>
              Our curated study plans optimize your preparation for any timeline
            </Text>
            <Img
              height="auto"
              src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/study-plans.png"
              style={{ marginTop: 32 }}
              width="100%"
            />
            <Text style={{ ...textBody1, marginBottom: 32, marginTop: 56 }}>
              Preparing for specific companies? Tackle their interview questions
            </Text>
            {Array.from({ length: Math.ceil(COMPANIES.length / 2) }, (_, i) =>
              COMPANIES.slice(i * 2, i * 2 + 2),
            ).map((items, index) => (
              <Row
                key={`row-${index + 1}`}
                style={{
                  marginBottom: 16,
                }}>
                {items.map(({ name, logo, href }) => (
                  <Column key={name} style={{ width: '50%' }}>
                    <Link href={href}>
                      <Row>
                        <Column style={{ width: 55 }}>
                          <Img
                            alt={`${name}'s logo`}
                            height="55"
                            src={logo}
                            style={{ borderRadius: 8 }}
                            width="55"
                          />
                        </Column>
                        <Column>
                          <Text
                            style={{
                              fontWeight: 500,
                              marginLeft: 16,
                            }}>
                            {name} →
                          </Text>
                        </Column>
                      </Row>
                    </Link>
                  </Column>
                ))}
              </Row>
            ))}
          </Section>
          <EmailsHr />
          <Section>
            <EmailsHeading as="h2" level="heading2">
              Need a portfolio project?
            </EmailsHeading>
            <Text style={{ ...textBody1, marginTop: 8 }}>
              Check out our new platform for real-world front end projects.
            </Text>
            <EmailsButton
              href={new URL('/projects', getSiteOrigin()).toString()}
              style={{ marginTop: 40 }}
              variant="projects">
              Check it out →
            </EmailsButton>
            <Img
              alt="GreatFrontEnd Projects banner"
              height="auto"
              src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/projects-banner.png"
              style={{ marginTop: 48 }}
              width="100%"
            />
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
  fontWeight: 500,
  lineHeight: '24px',
  margin: 0,
};

const ROADMAP = [
  {
    href: new URL('/front-end-interview-playbook', getSiteOrigin()).toString(),
    subtitle: 'Quick overview on what to prepare and how',
    title: 'Read Front End Interview Playbook',
  },
  {
    href: new URL('/interviews/gfe75', getSiteOrigin()).toString(),
    subtitle:
      '75 essential front end interview questions to master key patterns and common topics.',
    title: 'Practice GFE 75',
  },
  {
    href: new URL('/interviews/blind75', getSiteOrigin()).toString(),
    subtitle:
      "For DSA prep, tackle the Blind 75—a concise, effective list. We've solved these in JavaScript/TypeScript for front end engineers.",
    title: 'Practice Blind 75',
  },
  {
    href: new URL(
      '/front-end-system-design-playbook',
      getSiteOrigin(),
    ).toString(),
    subtitle:
      'Master core system design techniques from the most in-depth and comprehensive resource available',
    title: 'Read Front End System Design Playbook',
  },
];

const FOCUS_AREAS = [
  {
    href: new URL(
      '/interviews/focus-areas/accessibility',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/focus-area-icons/accessibility.png',
    name: 'Accessibility',
  },
  {
    href: new URL(
      '/interviews/focus-areas/async-operations',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/focus-area-icons/async-operations.png',
    name: 'Async Operations',
  },
  {
    href: new URL(
      '/interviews/focus-areas/data-structures-algorithms',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/focus-area-icons/data-structures.png',
    name: 'Data Structures & Algorithms',
  },
  {
    href: new URL(
      '/interviews/focus-areas/design-system-components',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/focus-area-icons/design-system-components.png',
    name: 'Design System Components',
  },
  {
    href: new URL(
      '/interviews/focus-areas/dom-manipulation',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/focus-area-icons/dom-manipulation.png',
    name: 'DOM Manipulation',
  },
  {
    href: new URL('/interviews/focus-areas/forms', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/focus-area-icons/forms.png',
    name: 'Forms',
  },
  {
    href: new URL(
      '/interviews/focus-areas/javascript-polyfills',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/focus-area-icons/js-polyfills.png',
    name: 'JavaScript Polyfills',
  },
  {
    href: new URL('/interviews/focus-areas/lodash', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/focus-area-icons/lodash.png',
    name: 'Lodash Functions',
  },
];

const QUIZ_TOPICS = [
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/javascript.png',
    name: 'JavaScript',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/css.png',
    name: 'CSS',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/html.png',
    name: 'HTML',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/accessibility.png',
    name: 'Accessibility',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/internationalization.png',
    name: 'Internationalization',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/performance.png',
    name: 'Performance',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/testing.png',
    name: 'Testing',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/network.png',
    name: 'Network',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/topic-icons/security.png',
    name: 'Security',
  },
];

const COMPANIES = [
  {
    href: new URL(
      '/interviews/company/google/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/google.png',
    name: 'Google',
  },
  {
    href: new URL(
      '/interviews/company/amazon/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/amazon.png',
    name: 'Amazon',
  },
  {
    href: new URL(
      '/interviews/company/tiktok/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/tiktok.png',
    name: 'TikTok',
  },
  {
    href: new URL(
      '/interviews/company/bytedance/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/bytedance.png',
    name: 'ByteDance',
  },
  {
    href: new URL(
      '/interviews/company/apple/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/apple.png',
    name: 'Apple',
  },
  {
    href: new URL(
      '/interviews/company/microsoft/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/microsoft.png',
    name: 'Microsoft',
  },
  {
    href: new URL(
      '/interviews/company/atlassian/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/atlassian.png',
    name: 'Atlassian',
  },
  {
    href: new URL(
      '/interviews/company/linkedin/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/linkedin.png',
    name: 'LinkedIn',
  },
  {
    href: new URL(
      '/interviews/company/uber/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/uber.png',
    name: 'Uber',
  },
  {
    href: new URL(
      '/interviews/company/dropbox/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/dropbox.png',
    name: 'Dropbox',
  },
  {
    href: new URL(
      '/interviews/company/lyft/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/lyft.png',
    name: 'Lyft',
  },
  {
    href: new URL(
      '/interviews/company/airbnb/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company-logo/airbnb.png',
    name: 'Airbnb',
  },
];
