import countryNames from '~/data/countryCodesToNames.json';

import { EmailsFooter, EmailsLink } from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';

import { Body, Container, Html, Section, Text } from '@react-email/components';

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
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Section>
            <Text style={paragraph}>Hi {name ?? 'there'},</Text>
            <Text style={{ ...paragraph, marginTop: 16 }}>
              How is it going? Thank you for your interest in GreatFrontEnd!
            </Text>
            <Text style={{ ...paragraph, marginTop: 16 }}>
              I'm Yangshun, co-founder at GreatFrontEnd. I love front end
              engineering and have spent over 5 years at Meta leading teams to
              build products such as{' '}
              <EmailsLink href="https://www.meta.com">meta.com</EmailsLink> and{' '}
              <EmailsLink href="https://docusaurus.io">Docusaurus</EmailsLink>.
            </Text>
            <Text style={paragraph}>
              In 2017, I cracked front end interview roles at Facebook, Google,
              Airbnb, Dropbox, Lyft, etc, and eventually joined Facebook (now
              Meta). Through that process, I came to realize that preparation
              resources available in the front end interviews space were very
              lacking.
            </Text>
            <Text style={paragraph}>
              Fast forward a few years, I left Meta to solve that problem by
              starting GreatFrontEnd. At GreatFrontEnd, we are on a mission to
              build great products for Front End Engineers, and we're just
              getting started.
            </Text>
            <Text style={paragraph}>
              I'm thrilled that you're considering purchasing GreatFrontEnd. Do
              let me know if there are any questions you might have, I'd be
              happy to answer them. I'd also love to hear what you're looking
              for in your interview preparation journey and how we can help you
              better.
            </Text>
            <Text style={paragraph}>
              Your reply goes directly into my inbox, looking forward to hearing
              from you!
            </Text>
            <Text style={paragraph}>
              <EmailsLink href="https://www.linkedin.com/in/yangshun">
                Connect with me on LinkedIn
              </EmailsLink>{' '}
              for front end nuggets and software engineering content.
            </Text>
            {countryCode != null && popularCountries.includes(countryCode) && (
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
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}

const paragraph = {
  color: '#3F3F46',
  fontSize: 16,
  lineHeight: '24px',
};
