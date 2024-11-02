'use client';

import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Marquee from '~/components/ui/Marquee';
import Text from '~/components/ui/Text';

const logos = [
  {
    alt: 'Amazon logo',
    height: 48,
    src: '/img/company-logos/amazon-logo.svg',
    width: 110,
  },
  {
    alt: 'Meta logo',
    height: 48,
    src: '/img/company-logos/meta-logo.svg',
    width: 120,
  },
  {
    alt: 'Airbnb logo',
    height: 48,
    src: '/img/company-logos/airbnb-logo.svg',
    width: 130,
  },
  {
    alt: 'eBay logo',
    height: 48,
    src: '/img/company-logos/ebay-logo.svg',
    width: 110,
  },
  {
    alt: 'Datadog logo',
    height: 48,
    src: '/img/company-logos/datadog-logo.svg',
    width: 130,
  },
  {
    alt: 'Bloomberg logo',
    height: 48,
    src: '/img/company-logos/bloomberg-logo.svg',
    width: 130,
  },
  {
    alt: 'JPMorgan logo',
    height: 48,
    src: '/img/company-logos/jpmorgan-logo.svg',
    width: 130,
  },
  {
    alt: 'Mailchimp logo',
    height: 48,
    src: '/img/company-logos/mailchimp-logo.svg',
    width: 130,
  },
  {
    alt: 'Expedia logo',
    height: 48,
    src: '/img/company-logos/expedia-logo.svg',
    width: 130,
  },
  {
    alt: 'Credit Karma logo',
    className: 'lg:block hidden',
    height: 48,
    src: '/img/company-logos/credit-karma-logo.svg',
    width: 130,
  },
];

export default function ResumeReviewLogoWall() {
  return (
    <Container className="flex flex-col gap-y-12 py-12 lg:py-16" width="6xl">
      <Text
        className="block text-center"
        color="secondary"
        size="body1"
        weight="bold">
        <FormattedMessage
          defaultMessage="Our users now work in these companies"
          description="Title of company logos section"
          id="jROOlG"
        />
      </Text>
      <Marquee periodSeconds={30} startEndGap={64}>
        <div
          className={clsx(
            'flex h-12 items-center gap-16 invert dark:invert-0',
          )}>
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="user-select-none flex items-center"
              style={{
                height: logo.height,
                width: logo.width,
              }}>
              <img
                alt={logo.alt}
                className={logo.className}
                height={logo.height}
                src={logo.src}
                width={logo.width}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </Container>
  );
}
