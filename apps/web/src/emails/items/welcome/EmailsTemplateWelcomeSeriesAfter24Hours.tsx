import type { ReactNode } from 'react';

import {
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsNumberedPairText,
  EmailsParagraph,
  EmailsStrong,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';
import { getSiteOrigin } from '~/seo/siteUrl';

import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
} from '@react-email/components';

function WhatYouCanDoSection({
  items,
}: Readonly<{
  items: ReadonlyArray<{
    href: string;
    subtitle: ReactNode;
    title: string;
  }>;
}>) {
  return (
    <Section style={{ marginTop: 40 }}>
      <EmailsParagraph size="body0" weight="medium">
        What you can do
      </EmailsParagraph>
      <Section style={{ marginTop: 24 }}>
        {items.map((item, index) => (
          <EmailsNumberedPairText key={item.title} {...item} index={index} />
        ))}
      </Section>
    </Section>
  );
}

function Card({
  title,
  subtitle,
  logos,
}: Readonly<{
  logos?: ReadonlyArray<{
    logoUrl: string;
    name: string;
  }>;
  subtitle: string;
  title: string;
}>) {
  return (
    <Section style={grayCard}>
      <div>
        <EmailsParagraph
          color="subtitle"
          size="body0"
          style={{
            display: 'inline-block',
            margin: 0,
            verticalAlign: 'middle',
          }}
          weight="bold">
          {title}
        </EmailsParagraph>
        {logos && logos.length > 0 && (
          <div
            style={{
              display: 'inline-block',
              marginLeft: 12,
              verticalAlign: 'middle',
            }}>
            {logos.map(({ logoUrl, name }, index) => (
              <Img
                key={name}
                alt={`${name}'s logo`}
                height="24"
                src={logoUrl}
                style={{
                  background: '#fff',
                  border: '1px solid #d4d4d8',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginLeft: index > 0 ? -4 : 0,
                }}
                width="24"
              />
            ))}
          </div>
        )}
      </div>
      <EmailsParagraph
        color="subtitle"
        size="body2"
        style={{
          marginTop: 8,
        }}
        weight="medium">
        {subtitle}
      </EmailsParagraph>
    </Section>
  );
}

function ChenweiZhang() {
  return (
    <>
      <Section>
        <Row>
          <Column align="center">
            <Img
              alt="Chenwei Zhang"
              height="48"
              src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/users/chenwei-zhang.png"
              style={{
                borderRadius: '50%',
              }}
              width="48"
            />
            <EmailsParagraph
              color="secondary"
              style={{
                marginTop: 16,
              }}>
              <EmailsStrong>Chenwei Zhang</EmailsStrong> Front End Engineer, San
              Francisco, US
            </EmailsParagraph>
          </Column>
        </Row>
      </Section>
      <Section style={{ marginTop: 40 }}>
        <div className="responsive-col">
          <Card
            logos={[
              {
                logoUrl:
                  'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/meta.png',
                name: 'Meta',
              },
            ]}
            subtitle="Received after using GreatFrontEnd"
            title="1 Mid-level Offer"
          />
        </div>
        <div className="responsive-col responsive-col--not-first-child">
          <Card subtitle="Increase in total compensation" title="+30%" />
        </div>
      </Section>
      <Section>
        <EmailsParagraph color="subtitle" defaultMargins={true}>
          "I practiced a lot of{' '}
          <EmailsStrong>Data Structures and Algorithms</EmailsStrong> questions
          before I joined GFE so I did not spend too much time on it.
        </EmailsParagraph>
        <EmailsParagraph color="subtitle" defaultMargins={true}>
          Instead I put my focus on practicing system design and behavioral
          questions with help of guidebooks. I went over{' '}
          <EmailsStrong>all system design questions at least once</EmailsStrong>{' '}
          and then practiced the most frequently asked ones on Excalidraw to
          strengthen my understanding.
        </EmailsParagraph>
        <EmailsParagraph color="subtitle" defaultMargins={true}>
          For behavioral questions, I{' '}
          <EmailsStrong>
            prepared at least one story for each evaluation category
          </EmailsStrong>{' '}
          and mock answering it in front of a couple friends to collect feedback
          and improve the answers."
        </EmailsParagraph>
      </Section>
      <WhatYouCanDoSection
        items={[
          {
            href: new URL('/interviews/blind75', getSiteOrigin()).toString(),
            subtitle:
              'Explore our new list of Blind 75 questions, written conveniently for frontenders in JavaScript / TypeScript.',
            title: 'Blind 75 questions',
          },
          {
            href: new URL(
              '/front-end-system-design-playbook',
              getSiteOrigin(),
            ).toString(),
            subtitle:
              'Read through the Front End System Design Playbook at least once and test your understanding by drawing it out on paper or with an online tool.',
            title: 'Front End System Design Playbook',
          },
          {
            href: new URL(
              '/behavioral-interview-playbook',
              getSiteOrigin(),
            ).toString(),
            subtitle:
              'Read through the Behavioral Interview Playbook at least once and test your understanding with mock interviews with your friends.',
            title: 'Behavioral Interview Playbook',
          },
        ]}
      />
    </>
  );
}

function ShrinivasKangal() {
  return (
    <>
      <Section>
        <Row>
          <Column align="center">
            <Img
              alt="Samsung's logo"
              height="48"
              src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/users/shrinivas-kangal.png"
              style={{
                borderRadius: '50%',
              }}
              width="48"
            />
            <EmailsParagraph
              color="secondary"
              style={{
                marginTop: 16,
              }}>
              <EmailsStrong>Shrinivas Kangal</EmailsStrong> Staff Engineer, San
              Francisco, US
            </EmailsParagraph>
          </Column>
        </Row>
      </Section>
      <Section style={{ marginTop: 40 }}>
        <Card
          logos={[
            {
              logoUrl:
                'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/zoox.png',
              name: 'Zoox',
            },
            {
              logoUrl:
                'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/samsung.png',
              name: 'Samsung',
            },
          ]}
          subtitle="Received after using GreatFrontEnd"
          title="3 Staff-level Offers"
        />
      </Section>
      <Section>
        <EmailsParagraph color="subtitle" defaultMargins={true}>
          "My initial strategy was to focus on Leetcode for a month or so and
          solve as many questions I could and{' '}
          <EmailsStrong>
            get familiar with all the different DSA concepts
          </EmailsStrong>
          . I wanted to get that out of the way and prepare Frontend Specific
          questions closer to the interviews.
        </EmailsParagraph>
        <EmailsParagraph
          color="subtitle"
          defaultMargins={true}
          style={{
            marginTop: 24,
          }}>
          For Frontend I luckily came across GFE at the start of the prep so
          that helped a lot. I initially focused on{' '}
          <EmailsStrong>
            solving all the questions listed without any help
          </EmailsStrong>
          , I was able to get most of them done with an exception of a few Hard
          ones. Once I was done with it, I made sure to{' '}
          <EmailsStrong>
            revise the questions every day for a couple of hours
          </EmailsStrong>{' '}
          to keep myself fresh."
        </EmailsParagraph>
      </Section>
      <WhatYouCanDoSection
        items={[
          {
            href: new URL('/interviews/blind75', getSiteOrigin()).toString(),
            subtitle:
              'Earlier in your interview preparation, practice the Blind 75—a list of 75 of the most important data structure and algorithm questions. We have conveniently solved them in JavaScript/TypeScript for front end engineers.',
            title: 'Blind 75',
          },
          {
            href: new URL('/questions', getSiteOrigin()).toString(),
            subtitle: (
              <>
                <EmailsParagraph>
                  As your interview date approaches, focus on solving questions
                  across the question formats—Coding, Quiz, and System Design
                  questions.
                </EmailsParagraph>
                <EmailsParagraph style={{ marginTop: 24 }}>
                  If you need a prioritized list, we recommend starting with GFE
                  75 or one of our Study plans.
                </EmailsParagraph>
              </>
            ),
            title: 'Coding, Quiz, System Design, GFE 75 and Study plans',
          },
        ]}
      />
      <Section style={{ ...yellowCard, marginTop: 40 }}>
        <EmailsParagraph weight="medium">
          💡 Additional tips from this experience
        </EmailsParagraph>
        <ol
          style={{
            marginTop: 16,
            paddingLeft: 20,
          }}>
          <li>
            <EmailsParagraph color="subtitle">
              Revise questions everyday for a couple of hours to keep yourself
              fresh.
            </EmailsParagraph>
          </li>
          <li>
            <EmailsParagraph color="subtitle">
              Be sure to repeatedly review those you couldn't solve without
              help.
            </EmailsParagraph>
          </li>
        </ol>
      </Section>
    </>
  );
}

function Stanley() {
  return (
    <>
      <Section>
        <Row>
          <Column align="center">
            <Img
              alt="Meta logo"
              height="48"
              src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/meta.png"
              style={{
                border: '1px solid #d4d4d8',
                borderRadius: '50%',
              }}
              width="48"
            />
            <EmailsParagraph
              color="secondary"
              style={{
                marginTop: 16,
              }}>
              <EmailsStrong>Stanley</EmailsStrong> Senior Software Engineer,
              Seattle, WA, US
            </EmailsParagraph>
          </Column>
        </Row>
      </Section>
      <Section style={{ marginTop: 40 }}>
        <div className="responsive-col">
          <Card
            logos={[
              {
                logoUrl:
                  'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/meta.png',
                name: 'Meta',
              },
            ]}
            subtitle="Received after using GreatFrontEnd"
            title="1 Senior-level Offer"
          />
        </div>
        <div className="responsive-col responsive-col--not-first-child">
          <Card subtitle="Total compensation" title="550,000 USD" />
        </div>
      </Section>
      <Section>
        <EmailsParagraph color="subtitle" defaultMargins={true}>
          "I felt comfortable with my UI skills, so I skipped all the UI related
          questions and focused only on the utility ones. I think I answered
          about <EmailsStrong>90% of all of them</EmailsStrong> and I tried to{' '}
          <EmailsStrong>answer 10-20 questions per day</EmailsStrong>. If any of
          my answers mismatched with the recommended answers, I would put extra
          focus on those, study them and{' '}
          <EmailsStrong>solved them a couple times</EmailsStrong>.
        </EmailsParagraph>
        <EmailsParagraph
          color="subtitle"
          defaultMargins={true}
          style={{
            marginTop: 24,
          }}>
          As far as system design goes, I studied in-depth about{' '}
          <EmailsStrong>2-3 per week</EmailsStrong>
          and <EmailsStrong>did a one page cheatsheet</EmailsStrong> of all of
          them with the highlights and topics I should address if asked in an
          interview. I{' '}
          <EmailsStrong>
            studied some of the system design cases multiple times
          </EmailsStrong>
          , such as: “newsfeed” and “pinterest”; based on how complete and how
          much ground those covered. I took note of concepts and techniques I
          wasn't familiar with and{' '}
          <EmailsStrong>
            dove into the w3 specs to learn more about it
          </EmailsStrong>
          "
        </EmailsParagraph>
      </Section>
      <WhatYouCanDoSection
        items={[
          {
            href: new URL(
              '/questions/user-interface',
              getSiteOrigin(),
            ).toString(),
            subtitle: (
              <EmailsParagraph>
                If you're not confident in your UI skills, start by solving our{' '}
                <EmailsStrong>UI Coding questions</EmailsStrong>. For a
                prioritized list of UI questions, focus on those from the{' '}
                <EmailsStrong>UI-related focus areas</EmailsStrong>.
              </EmailsParagraph>
            ),
            title: 'User Interface Coding questions',
          },
          {
            href: new URL('/questions', getSiteOrigin()).toString(),
            subtitle: (
              <EmailsParagraph>
                Afterward, solve as many{' '}
                <EmailsStrong>JavaScript Coding questions</EmailsStrong> as you
                can. For a prioritized list, solve those from the{' '}
                <EmailsStrong>JS coding-related focus areas</EmailsStrong>.
              </EmailsParagraph>
            ),
            title: 'JavaScript Coding questions',
          },
          {
            href: new URL(
              '/front-end-system-design-playbook',
              getSiteOrigin(),
            ).toString(),
            subtitle:
              'Master System Design through the most comprehensive resource available.',
            title: 'Front End System Design Playbook',
          },
        ]}
      />
      <Section style={{ ...yellowCard, marginTop: 40 }}>
        <EmailsParagraph weight="medium">
          💡 Additional tips from this experience
        </EmailsParagraph>
        <ol
          style={{
            marginTop: 16,
            paddingLeft: 20,
          }}>
          <li>
            <EmailsParagraph color="subtitle">
              Try to do regular coding practice daily e.g. 10-20 questions.
            </EmailsParagraph>
          </li>
          <li>
            <EmailsParagraph color="subtitle">
              For those questions that mismatch with the recommended answer, pen
              them down and solve them a couple of times.
            </EmailsParagraph>
          </li>
          <li>
            <EmailsParagraph color="subtitle">
              For system design, study 2-3 questions in-depth per week.
            </EmailsParagraph>
          </li>
          <li>
            <EmailsParagraph color="subtitle">
              Do up a System design cheatsheet to summarize highlights and
              topics that should be addressed if asked in an interview.
            </EmailsParagraph>
          </li>
          <li>
            <EmailsParagraph color="subtitle">
              Take note of the concepts and techniques you're not familiar with
              and use resources like w3 to learn more.
            </EmailsParagraph>
          </li>
        </ol>
      </Section>
    </>
  );
}

function ShoaibAhmed() {
  return (
    <>
      <Section>
        <Row>
          <Column align="center">
            <Img
              alt="Shoaib Ahmed"
              height="48"
              src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/users/shoaib-ahmed.jpg"
              style={{
                borderRadius: '50%',
              }}
              width="48"
            />
            <EmailsParagraph
              color="secondary"
              style={{
                marginTop: 16,
              }}>
              <EmailsStrong>Shoaib Ahmed</EmailsStrong> Front End Engineer,
              Bengaluru, India
            </EmailsParagraph>
          </Column>
        </Row>
      </Section>
      <Section style={{ marginTop: 40 }}>
        <div className="responsive-col">
          <Card
            logos={[
              {
                logoUrl:
                  'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/twilio.png',
                name: 'Twilio',
              },
              {
                logoUrl:
                  'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/mpokket.png',
                name: 'mPokket',
              },
            ]}
            subtitle="Received after using GreatFrontEnd"
            title="2 Offers"
          />
        </div>
        <div className="responsive-col responsive-col--not-first-child">
          <Card subtitle="Increase in total compensation" title="2.2x" />
        </div>
      </Section>
      <Section style={{ marginTop: 24 }}>
        <EmailsParagraph color="subtitle">
          "Picked up <EmailsStrong>1 Month plan</EmailsStrong> and went at
          everything. Coding, quiz and system design. I found quiz to be really
          helpful to ended up{' '}
          <EmailsStrong>
            going through the ones that are not in the 1 month plan as well
          </EmailsStrong>
          . Before interviews, I used to{' '}
          <EmailsStrong>
            come back to quiz and coding sections for refreshers
          </EmailsStrong>
          ."
        </EmailsParagraph>
      </Section>
      <WhatYouCanDoSection
        items={[
          {
            href: new URL(
              '/interviews/study-plans',
              getSiteOrigin(),
            ).toString(),
            subtitle: (
              <>
                Leverage our <EmailsStrong>Study plans</EmailsStrong>, which
                provide prioritized lists of questions to help you prepare
                within various time frames.
              </>
            ),
            title: 'Study plans',
          },
          {
            href: new URL(
              '/front-end-system-design-playbook',
              getSiteOrigin(),
            ).toString(),
            subtitle: (
              <>
                With extra time, do a couple of{' '}
                <EmailsStrong>Quiz</EmailsStrong> and{' '}
                <EmailsStrong>Coding</EmailsStrong> questions daily as
                refreshers.
              </>
            ),
            title: 'Quiz and Coding questions',
          },
        ]}
      />
    </>
  );
}

export default function EmailsTemplateWelcomeSeriesAfter24Hours(
  _props: Record<string, never>,
) {
  return (
    <Html lang="en">
      <Head>
        <style>
          {`
            .responsive-col {
              display: inline-block;
              vertical-align: top;
            }
            @media only screen and (max-width: 600px) {
              .responsive-col {
                width: 100%;
              }
              .responsive-col--not-first-child {
                margin-top: 12px;
              }
            }
            @media only screen and (min-width: 601px) {
              .responsive-col {
                width: calc((100% - 12px) / 2);
              }
              .responsive-col--not-first-child {
                margin-left: 12px;
              }
            }
          `}
        </style>
      </Head>
      <Preview>
        How our users used GFE to clinch multiple high-paying offers
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsHeading as="h1" level="heading1">
              Proven prep strategies
            </EmailsHeading>
            <EmailsParagraph size="body1" style={{ marginTop: 8 }}>
              Actual strategies used by users to clinch multiple high paying
              offers.
            </EmailsParagraph>
          </Section>
          <Section style={{ marginTop: 40 }}>
            <ChenweiZhang />
          </Section>
          <Section style={{ marginTop: 64 }}>
            <ShrinivasKangal />
          </Section>
          <Section style={{ marginTop: 64 }}>
            <Stanley />
          </Section>
          <Section style={{ marginTop: 64 }}>
            <ShoaibAhmed />
          </Section>
          <EmailsFooter />
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
  paddingBottom: 16,
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 16,
};

const yellowCard = {
  background: 'rgba(255, 231, 20, 0.06)',
  border: '1px solid #ffe714',
  borderRadius: 8,
  display: 'block',
  padding: 24,
  width: '100%',
};
