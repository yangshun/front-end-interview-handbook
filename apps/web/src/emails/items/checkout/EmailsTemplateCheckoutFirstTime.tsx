import countryNames from '~/data/countryCodesToNames.json';

import {
  EmailsFooter,
  EmailsLink,
  EmailsParagraph,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';
import type { EmailsUnsubscribeFields } from '~/emails/EmailsTypes';

import { Body, Container, Html, Section } from '@react-email/components';

type Props = Readonly<{
  countryCode: string | null;
  name: string | null;
  unsub: EmailsUnsubscribeFields;
}>;

const popularCountries = ['US', 'IN', 'CA', 'SG', 'GB', 'DE', 'TW'];

export default function EmailsTemplateCheckoutFirstTime({
  countryCode,
  name,
  unsub,
}: Props) {
  return (
    <Html lang="en">
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Section>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              Hi {name ?? 'there'},
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              How is it going? Thank you for your interest in GreatFrontEnd!
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              I'm Yangshun, co-founder at GreatFrontEnd. I love front end
              engineering and have spent over 5 years at Meta leading teams to
              build products such as{' '}
              <EmailsLink href="https://www.meta.com">meta.com</EmailsLink> and{' '}
              <EmailsLink href="https://docusaurus.io">Docusaurus</EmailsLink>.
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              In 2017, I cracked front end interview roles at Facebook, Google,
              Airbnb, Dropbox, Lyft, etc, and eventually joined Facebook (now
              Meta). Through that process, I came to realize that preparation
              resources available in the front end interviews space were very
              lacking.
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              Fast forward a few years, I left Meta to solve that problem by
              starting GreatFrontEnd. At GreatFrontEnd, we are on a mission to
              build great products for Front End Engineers, and we're just
              getting started.
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              I'm thrilled that you're considering purchasing GreatFrontEnd. Do
              let me know if there are any questions you might have, I'd be
              happy to answer them. I'd also love to hear what you're looking
              for in your interview preparation journey and how we can help you
              better.
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              Your reply goes directly into my inbox, looking forward to hearing
              from you!
            </EmailsParagraph>
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              <EmailsLink href="https://www.linkedin.com/in/yangshun">
                Connect with me on LinkedIn
              </EmailsLink>{' '}
              for front end nuggets and software engineering content.
            </EmailsParagraph>
            {countryCode != null && popularCountries.includes(countryCode) && (
              <EmailsParagraph color="subtitle" defaultMargins={true}>
                P.S. Many of our users are also from{' '}
                {countryNames[countryCode as keyof typeof countryNames]} and
                have benefitted greatly from our products.
              </EmailsParagraph>
            )}
            <br />
            <EmailsParagraph color="subtitle" defaultMargins={true}>
              Regards,
              <br />
              Yangshun from GreatFrontEnd
            </EmailsParagraph>
          </Section>
          <EmailsFooter unsub={unsub} />
        </Container>
      </Body>
    </Html>
  );
}
