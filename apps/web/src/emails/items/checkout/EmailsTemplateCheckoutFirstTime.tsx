import countryNames from '~/data/countryCodesToNames.json';

import { Body, Html } from '@react-email/components';

type Props = Readonly<{
  countryCode: string | null;
  name: string | null;
}>;

const popularCountries = ['US', 'IN', 'CA', 'SG', 'GB', 'DE', 'TW'];

export default function EmailsTemplateCheckoutFirstTime({
  countryCode,
  name,
}: Props) {
  return (
    <Html lang="en">
      <Body>
        <p>Hi {name ?? 'there'},</p>
        <p>How is it going? Thank you for your interest in GreatFrontEnd!</p>
        <p>
          I'm Yangshun, co-founder at GreatFrontEnd and an ex-Staff Eng at Meta.
          I love front end engineering and have spent over 5 years at Meta
          leading teams to build products such as{' '}
          <a href="https://www.meta.com">meta.com</a> and{' '}
          <a href="https://docusaurus.io">Docusaurus</a>. Outside of work, I
          also created the{' '}
          <a href="https://www.techinterviewhandbook.org/">
            Tech Interview Handbook
          </a>
          ,{' '}
          <a href="https://www.frontendinterviewhandbook.com/">
            Front End Interview Handbook
          </a>
          , and Blind 75.
        </p>
        <p>
          In 2017, I cracked front end interview roles at Facebook, Google,
          Airbnb, Dropbox, Lyft, Palantir, etc. I eventually joined Facebook
          (now Meta) as a Front End Engineer. Through the process, I realized
          that preparation resources available in the front end interviews space
          were very lacking.
        </p>
        <p>
          Hence, I left Meta a few years ago and started GreatFrontEnd to tackle
          this problem. At GreatFrontEnd, we are on a mission to build great
          products for Front End Engineers, and we're just getting started.
        </p>
        <p>
          I'm thrilled that you're considering purchasing GreatFrontEnd. Do let
          me know if there are any questions you might have, I'd be happy to
          answer them. I'd also love to hear what you're looking for in your
          interview preparation journey and how we can help you better.
        </p>
        <p>
          Your reply goes directly into my inbox, looking forward to hearing
          from you!
        </p>
        <p>
          <a href="https://www.linkedin.com/in/yangshun">
            Follow/connect with me on LinkedIn
          </a>{' '}
          for front end nuggets and software engineering content.
        </p>
        {countryCode != null && popularCountries.includes(countryCode) && (
          <p>
            P.S. Many of our users are also from{' '}
            {countryNames[countryCode as keyof typeof countryNames]} and have
            benefitted greatly from our products.
          </p>
        )}
        <p>
          Regards,
          <br />
          Yangshun from GreatFrontEnd
        </p>
      </Body>
    </Html>
  );
}
