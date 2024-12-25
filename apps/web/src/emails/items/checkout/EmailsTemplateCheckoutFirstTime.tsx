import countryNames from '~/data/countryCodesToNames.json';

import EmailFooter from '~/emails/components/EmailFooter';

import {
  Body,
  Container,
  Html,
  Link,
  Section,
  Text,
} from '@react-email/components';

type Props = Readonly<{
  countryCode: string | null;
  name: string | null;
}>;

const popularCountries = ['US', 'IN', 'CA', 'SG', 'GB', 'DE', 'TW'];

export default function EmailsTemplateCheckoutFirstTime({
  name,
  countryCode,
}: Props) {
  return (
    <Html lang="en">
      <Body style={main}>
        <Container style={container}>
          <Section style={body}>
            <Section>
              <Text style={paragraph}>Hi {name ?? 'there'},</Text>
              <Text style={{ ...paragraph, margin: '16px 0 0 0' }}>
                How is it going? Thank you for your interest in GreatFrontEnd!
              </Text>
              <Text style={{ ...paragraph, margin: '16px 0 0 0' }}>
                I'm Yangshun, co-founder at GreatFrontEnd. I spent over 5 years
                at Meta leading teams and building front end products such as{' '}
                <Link
                  href="https://www.meta.com"
                  style={{
                    ...paragraph,
                    textDecoration: 'underline',
                  }}>
                  meta.com
                </Link>{' '}
                and{' '}
                <Link
                  href="https://docusaurus.io"
                  style={{
                    ...paragraph,
                    textDecoration: 'underline',
                  }}>
                  Docusaurus
                </Link>
                , and I'm very passionate about front end engineering.
              </Text>
              <Text style={paragraph}>
                I always felt that preparation resources available in the front
                end interviews space were very lacking. Hence I left Meta to
                work on GreatFrontEnd. At GreatFrontEnd, we are on a mission to
                build great products for Front End Engineers, and we're just
                getting started.
              </Text>
              <Text style={paragraph}>
                I'm thrilled that you're considering purchasing GreatFrontEnd.
                Do let me know if there are any questions you might have, I'd be
                happy to answer them. I'd also love to hear what you're looking
                for in your interview preparation journey and how we can help
                you better.
              </Text>
              <Text style={paragraph}>
                <Link
                  href="https://www.linkedin.com/in/yangshun"
                  style={{
                    ...paragraph,
                    textDecoration: 'underline',
                  }}>
                  Do connect with me on LinkedIn
                </Link>{' '}
                for front end nuggets and software engineering content.
              </Text>
              <Text style={paragraph}>
                Your reply goes directly into my inbox, looking forward to
                hearing from you!
              </Text>
              {countryCode != null &&
                popularCountries.includes(countryCode) && (
                  <Text style={paragraph}>
                    P.S. Many of our users are also from{' '}
                    {countryNames[countryCode as keyof typeof countryNames]} and
                    have benefitted greatly from our products.
                  </Text>
                )}
              <br />
              <Text style={paragraph}>
                Regards,
                <br />
                Yangshun from GreatFrontEnd
              </Text>
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
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  marginTop: '30px',
  maxWidth: '600px',
};

const body = {
  margin: '40px 0 0 0',
};

const paragraph = {
  color: '#3F3F46',
  fontSize: 16,
  lineHeight: '24px',
};
