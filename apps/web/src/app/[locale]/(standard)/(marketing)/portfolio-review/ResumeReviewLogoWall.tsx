'use client';

import Container from '~/components/ui/Container';

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
    <div className="relative isolate overflow-hidden bg-pink-600 py-16 lg:py-24 xl:py-32">
      <Container variant="narrow">
        <div className="mx-auto flex max-w-2xl flex-col bg-pink-500 px-6 pt-12 pb-16 ring-1 ring-white/10 sm:rounded-3xl sm:px-8 lg:mx-0 lg:max-w-none lg:items-center">
          <h2 className="text-center text-lg font-semibold leading-8 text-white">
            Our users now work at these amazing companies
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {logos.map((logo) => (
              <div
                key={logo.src}
                className="col-span-2 flex max-h-12 items-center justify-center lg:col-span-1">
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
        </div>
      </Container>
    </div>
  );
}
