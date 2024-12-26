import {
  EmailsFooter,
  EmailsHeader,
  EmailsHeading,
  EmailsNumberedPairText,
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
  Text,
} from '@react-email/components';

export default function EmailsTemplateWelcomeSeriesAfter24Hours(
  _props: Record<string, never>,
) {
  return (
    <Html lang="en">
      <Head>
        <style>
          {`
            @media only screen and (max-width: 600px) {
              .offers-card__mobile {
                display: table;
              }
              .offers-card__desktop {
                display: none;
              }
            }
            @media only screen and (min-width: 601px) {
              .offers-card__mobile {
                display: none;
              }
              .offers-card__desktop {
                display: table;
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
            <Text style={{ ...textBody0, marginTop: 8 }}>
              Actual strategies used by users to clinch multiple high paying
              offers.
            </Text>
          </Section>
          <Section style={{ marginTop: 40 }}>
            <Row>
              <Column align="center">
                <Img
                  alt="Chenwei Zhang's image"
                  height="48"
                  src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/ChenweiZhang.png"
                  style={{
                    borderRadius: '50%',
                  }}
                  width="48"
                />
                <Text
                  style={{
                    ...paragraph,
                    color: '#52525B',
                    marginTop: 16,
                  }}>
                  <EmailsStrong>Chenwei Zhang</EmailsStrong> Front End Engineer,
                  San Francisco, US
                </Text>
              </Column>
            </Row>
          </Section>
          <Section className="offers-card__mobile" style={{ marginTop: 40 }}>
            <Row>
              <Column>
                <Card
                  logos={[
                    {
                      logoUrl:
                        'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/meta.png',
                      name: 'Meta',
                    },
                  ]}
                  subtitle="Received after using GreatFrontEnd"
                  title="1 Mid-Level Offer"
                />
              </Column>
            </Row>
            <Row style={{ marginTop: 16 }}>
              <Column>
                <Card subtitle="Increase in total compensation" title="+30%" />
              </Column>
            </Row>
          </Section>
          <Section className="offers-card__desktop" style={{ marginTop: 40 }}>
            <Row>
              <Column style={{ width: '49%' }}>
                <Card
                  logos={[
                    {
                      logoUrl:
                        'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/meta.png',
                      name: 'Meta',
                    },
                  ]}
                  subtitle="Received after using GreatFrontEnd"
                  title="1 Mid-Level Offer"
                />
              </Column>
              <Column style={{ width: '2%' }} />
              <Column style={{ width: '49%' }}>
                <Card subtitle="Increase in total compensation" title="+30%" />
              </Column>
            </Row>
          </Section>
          <Section style={{ marginTop: 24 }}>
            <Text
              style={{
                ...paragraph,
                color: '#3F3F46',
              }}>
              "I did a lot of <EmailsStrong>DSA coding</EmailsStrong> before I
              joined GFE so I did not spend too much time on it.
            </Text>
            <Text
              style={{
                ...paragraph,
                color: '#3F3F46',
                marginTop: 24,
              }}>
              Instead I put my focus on practicing system design and behavioral
              questions with help of guidebooks. I went over{' '}
              <EmailsStrong>
                all system design questions at least once
              </EmailsStrong>{' '}
              and then practice the most frequently asked ones on Excalidraw to
              strengthen my understanding.
            </Text>
            <Text
              style={{
                ...paragraph,
                color: '#3F3F46',
                marginTop: 24,
              }}>
              For behavioral questions, I{' '}
              <EmailsStrong>
                prepare at least one story for each evaluation category
              </EmailsStrong>{' '}
              and mock answering it in front of a couple friends to collect
              feedback and improve the answers.”
            </Text>
          </Section>
          <Section style={{ marginTop: 40 }}>
            <Text style={{ ...textBody0, fontWeight: 500, marginBottom: 32 }}>
              What you can do
            </Text>
            <Section>
              {ITEM1.map((item, index) => (
                <EmailsNumberedPairText
                  key={item.title}
                  {...item}
                  index={index}
                />
              ))}
            </Section>
          </Section>
          <Section style={{ marginTop: 40 }}>
            <Row>
              <Column align="center">
                <Img
                  alt="Samsung's logo"
                  height="48"
                  src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/samsung.png"
                  style={{
                    borderRadius: '50%',
                  }}
                  width="48"
                />
                <Text
                  style={{
                    ...paragraph,
                    color: '#52525B',
                    marginTop: 16,
                  }}>
                  <EmailsStrong>Lokhand Manus</EmailsStrong> Staff Engineer, San
                  Francisco, US
                </Text>
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
                    'https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/company/samsung2.png',
                  name: 'Samsung',
                },
              ]}
              subtitle="Received after using GreatFrontEnd"
              title="3 Staff-Level Offers"
            />
          </Section>
          <Section style={{ marginTop: 24 }}>
            <Text
              style={{
                ...paragraph,
                color: '#3F3F46',
              }}>
              "My initial strategy was to focus on Leetcode for a month or so
              and solve as many questions I could and{' '}
              <EmailsStrong>
                get familiar with all the different DSA concepts
              </EmailsStrong>
              . I wanted to get that out of the way and prepare Frontend
              Specific questions closer to the interviews.
            </Text>
            <Text
              style={{
                ...paragraph,
                color: '#3F3F46',
                marginTop: 24,
              }}>
              For Frontend I luckily came across GFE at the start of the prep so
              that helped a lot. I initially focused on{' '}
              <EmailsStrong>
                solving all the questions listed without any help
              </EmailsStrong>
              , I was able to get most of them done with an exception of a few
              Hard ones. Once I was done with it, I made sure to{' '}
              <EmailsStrong>
                revise the questions every day for a couple of hours
              </EmailsStrong>{' '}
              to keep myself fresh.”
            </Text>
          </Section>
          <Section style={{ marginTop: 40 }}>
            <Text style={{ ...textBody0, fontWeight: 500, marginBottom: 32 }}>
              What you can do
            </Text>
            <Section>
              {ITEM2.map((item, index) => (
                <EmailsNumberedPairText
                  key={item.title}
                  {...item}
                  index={index}
                />
              ))}
            </Section>
          </Section>
          <Section style={{ ...yellowCard, marginTop: 40 }}>
            <Text style={{ ...paragraph, fontWeight: 500 }}>💡 Pro tip!</Text>
            <Text
              style={{
                ...paragraph,
                color: '#3F3F46',
                marginTop: 16,
              }}>
              1. Revise questions everyday for a couple of hours to keep
              yourself fresh.
            </Text>
            <Text style={{ ...paragraph, color: '#3F3F46' }}>
              2. Be sure to repeatedly review those you couldn't solve without
              help.
            </Text>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}

type CardProps = Readonly<{
  logos?: ReadonlyArray<{
    logoUrl: string;
    name: string;
  }>;
  subtitle: string;
  title: string;
}>;

function Card({ title, subtitle, logos }: CardProps) {
  return (
    <Section style={grayCard}>
      <div>
        <Text
          style={{
            ...textBody0,
            display: 'inline-block',
            fontWeight: 500,
            margin: 0,
            verticalAlign: 'middle',
          }}>
          {title}
        </Text>
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
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginLeft: index > 0 ? 6 : 0,
                }}
                width="24"
              />
            ))}
          </div>
        )}
      </div>
      <Text
        style={{
          ...paragraph,
          color: '#3F3F46',
          marginTop: 8,
        }}>
        {subtitle}
      </Text>
    </Section>
  );
}

const textBody0 = {
  color: '#18181B',
  fontSize: 18,
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
  padding: 16,
  width: '100%',
};

const yellowCard = {
  background: 'rgba(255, 231, 20, 0.06)',
  border: '1px solid #FFE714',
  borderRadius: 8,
  display: 'block',
  padding: 24,
  width: '100%',
};

const ITEM1 = [
  {
    href: new URL('/interviews/blind75', getSiteOrigin()).toString(),
    subtitle:
      'Explore our new list of Blind 75 questions, written conveniently for frontenders in JavaScript / TypeScript.',
    title: 'Blind 75 questions →',
  },
  {
    href: new URL(
      '/front-end-system-design-playbook',
      getSiteOrigin(),
    ).toString(),
    subtitle:
      'Read through the Front End System Design guidebook at least once and test your understanding by drawing it out on paper or with an online tool.',
    title: 'Front End System Design Guidebook →',
  },
  {
    href: new URL(
      '/front-end-system-design-playbook',
      getSiteOrigin(),
    ).toString(),
    subtitle:
      'Read through the Behavioral Interview Guidebook at least once and test your understanding with mock interviews with your friends.',
    title: 'Behavioral Interview Guidebook →',
  },
];

const ITEM2 = [
  {
    href: new URL('/interviews/blind75', getSiteOrigin()).toString(),
    subtitle:
      'Earlier in your interview preparation, practice the Blind 75—a list of 75 of the most important data structure and algorithm questions. We have conveniently solved them in JavaScript/TypeScript for front end engineers.',
    title: 'Blind 75 →',
  },
  {
    href: new URL('/questions', getSiteOrigin()).toString(),
    subtitle: (
      <div>
        <Text style={paragraph}>
          As your interview date approaches, focus on solving questions across
          the question formats—Coding, Quiz, and System Design questions.
        </Text>
        <Text style={{ ...paragraph, marginTop: 24 }}>
          If you need a prioritized list, we recommend starting with GFE 75 or
          one of our Study plans.
        </Text>
      </div>
    ),
    title: 'Coding, Quiz, System Design, GFE 75 and Study plans →',
  },
];
