import { Body, Html } from '@react-email/components';

import countryNames from '~/data/countryCodesToNames.json';

type Props = Readonly<{
  countryCode: string | null;
  hook: number;
  name: string | null;
}>;

const popularCountries = ['US', 'IN', 'CA', 'SG', 'GB', 'DE', 'TW'];

const hooks = [
  "What's harder: aligning a div without Flexbox or nailing a front end interview? (Spoiler: we can help with both!)",
  "Front end interviews can feel like trying to center a div in 2005—but don't worry, you've got this.",
  "Front end interviews are a huge pain in the ass, but not to worry, you've come to the right place.",
];

export default function EmailsTemplateCheckoutFirstTime({
  countryCode,
  hook,
  name,
}: Props) {
  const hookString = hooks[(hook + hooks.length) % hooks.length];

  return (
    <Html lang="en">
      <Body>
        <p>Hey {name ? name.split(/\s+/)[0] : 'there'},</p>
        <p>{hookString}</p>
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
