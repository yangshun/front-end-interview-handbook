import clsx from 'clsx';
import React from 'react';

import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsNumberedPairText,
} from '~/emails/components/EmailsComponents';
import EmailsHr from '~/emails/components/EmailsHr';
import EmailsParagraph from '~/emails/components/EmailsParagraph';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';
import type { EmailsUnsubscribeFields } from '~/emails/EmailsTypes';
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
} from '@react-email/components';

type Props = Readonly<{
  unsub: EmailsUnsubscribeFields;
}>;

export default function EmailsTemplateWelcomeSeriesImmediate({ unsub }: Props) {
  return (
    <Html lang="en">
      <Head>
        <style>
          {`
            @media only screen and (max-width: 640px) {
              .responsive-card--width {
                max-width: 100%;
              }
              .responsive-card--left{
                padding-right: 0px !important;
              }
              .responsive-card--right{
                padding-left: 0px !important;
              }
            }
            @media only screen and (min-width: 641px) {
              .responsive-card--width {
                max-width: 50%;
              }
            }
            .responsive-card--left{
              padding-right: 8px;
            }
            .responsive-card--right{
              padding-left: 8px;
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
            <EmailsParagraph size="body1" style={{ marginTop: 8 }}>
              To ace your front end interviews in the least amount of time
            </EmailsParagraph>
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
            <EmailsParagraph
              size="body0"
              style={{ marginBottom: 32, marginTop: 48 }}>
              Hone in specific topics you need the most practice
            </EmailsParagraph>
            {FOCUS_AREAS.map(({ name, logo, href }, index) => (
              <Section
                key={name}
                className={clsx(
                  'responsive-card--width',
                  index % 2 === 0
                    ? 'responsive-card--left'
                    : 'responsive-card--right',
                )}
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
                      <EmailsParagraph
                        size="body0"
                        style={{
                          marginLeft: 20,
                        }}>
                        {name} →
                      </EmailsParagraph>
                    </Column>
                  </Row>
                </Link>
              </Section>
            ))}
            <EmailsParagraph
              size="body0"
              style={{ marginBottom: 32, marginTop: 56 }}>
              Revise your fundamentals with knowledge quizzes
            </EmailsParagraph>
            {QUIZ_TOPICS.map(({ name, logo, href }, index) => (
              <Section
                key={name}
                className={clsx(
                  'responsive-card--width',
                  index % 2 === 0
                    ? 'responsive-card--left'
                    : 'responsive-card--right',
                )}
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
                      <EmailsParagraph
                        size="body0"
                        style={{
                          marginLeft: 8,
                        }}>
                        {name} →
                      </EmailsParagraph>
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
            <EmailsParagraph size="body0" style={{ marginTop: 48 }}>
              Our curated study plans optimize your preparation for any timeline
            </EmailsParagraph>
            <Link
              href={new URL(
                '/interviews/study-plans',
                getSiteOrigin(),
              ).toString()}>
              <Img
                height="auto"
                src="https://emails.gfecdn.net/interviews/welcome-series/study-plans.png"
                style={{ marginTop: 32 }}
                width="100%"
              />
            </Link>
            <EmailsParagraph
              size="body0"
              style={{ marginBottom: 32, marginTop: 56 }}>
              Preparing for specific companies? Tackle their interview questions
            </EmailsParagraph>
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
                          <EmailsParagraph
                            size="body0"
                            style={{
                              marginLeft: 8,
                            }}>
                            {name} →
                          </EmailsParagraph>
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
            <EmailsParagraph style={{ marginTop: 8 }}>
              Check out our new platform for real-world front end projects.
            </EmailsParagraph>
            <EmailsButton
              href={new URL('/projects', getSiteOrigin()).toString()}
              style={{ marginTop: 40 }}
              variant="projects">
              Check it out →
            </EmailsButton>
            <Img
              alt="GreatFrontEnd Projects banner"
              height="auto"
              src="https://emails.gfecdn.net/interviews/welcome-series/projects-banner.png"
              style={{ marginTop: 48 }}
              width="100%"
            />
          </Section>
          <EmailsFooter unsub={unsub} />
        </Container>
      </Body>
    </Html>
  );
}

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
    logo: 'https://emails.gfecdn.net/interviews/focus-areas/accessibility.png',
    name: 'Accessibility',
  },
  {
    href: new URL(
      '/interviews/focus-areas/async-operations',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/focus-areas/async-operations.png',
    name: 'Async Operations',
  },
  {
    href: new URL(
      '/interviews/focus-areas/data-structures-algorithms',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/focus-areas/data-structures.png',
    name: 'Data Structures & Algorithms',
  },
  {
    href: new URL(
      '/interviews/focus-areas/design-system-components',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/focus-areas/design-system-components.png',
    name: 'Design System Components',
  },
  {
    href: new URL(
      '/interviews/focus-areas/dom-manipulation',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/focus-areas/dom-manipulation.png',
    name: 'DOM Manipulation',
  },
  {
    href: new URL('/interviews/focus-areas/forms', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/focus-areas/forms.png',
    name: 'Forms',
  },
  {
    href: new URL(
      '/interviews/focus-areas/javascript-polyfills',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/focus-areas/js-polyfills.png',
    name: 'JavaScript Polyfills',
  },
  {
    href: new URL('/interviews/focus-areas/lodash', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/focus-areas/lodash.png',
    name: 'Lodash Functions',
  },
];

const QUIZ_TOPICS = [
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/javascript.png',
    name: 'JavaScript',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/css.png',
    name: 'CSS',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/html.png',
    name: 'HTML',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/accessibility.png',
    name: 'Accessibility',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/internationalization.png',
    name: 'Internationalization',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/performance.png',
    name: 'Performance',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/testing.png',
    name: 'Testing',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/network.png',
    name: 'Network',
  },
  {
    href: new URL('/questions/quiz', getSiteOrigin()).toString(),
    logo: 'https://emails.gfecdn.net/interviews/topics/security.png',
    name: 'Security',
  },
];

const COMPANIES = [
  {
    href: new URL(
      '/interviews/company/google/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/google.png',
    name: 'Google',
  },
  {
    href: new URL(
      '/interviews/company/amazon/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/amazon.png',
    name: 'Amazon',
  },
  {
    href: new URL(
      '/interviews/company/tiktok/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/tiktok.png',
    name: 'TikTok',
  },
  {
    href: new URL(
      '/interviews/company/bytedance/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/bytedance.png',
    name: 'ByteDance',
  },
  {
    href: new URL(
      '/interviews/company/apple/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/apple.png',
    name: 'Apple',
  },
  {
    href: new URL(
      '/interviews/company/microsoft/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/microsoft.png',
    name: 'Microsoft',
  },
  {
    href: new URL(
      '/interviews/company/atlassian/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/atlassian.png',
    name: 'Atlassian',
  },
  {
    href: new URL(
      '/interviews/company/linkedin/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/linkedin.png',
    name: 'LinkedIn',
  },
  {
    href: new URL(
      '/interviews/company/uber/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/uber.png',
    name: 'Uber',
  },
  {
    href: new URL(
      '/interviews/company/dropbox/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/dropbox.png',
    name: 'Dropbox',
  },
  {
    href: new URL(
      '/interviews/company/lyft/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/lyft.png',
    name: 'Lyft',
  },
  {
    href: new URL(
      '/interviews/company/airbnb/questions-guides',
      getSiteOrigin(),
    ).toString(),
    logo: 'https://emails.gfecdn.net/interviews/company/airbnb.png',
    name: 'Airbnb',
  },
];
