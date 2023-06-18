import Marquee from '../ui/Marquee/Marquee';

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

export default function MarketingCompaniesMarquee() {
  return (
    <Marquee periodSeconds={30} startEndGap={64}>
      <div className="flex h-12 items-center gap-16">
        {logos.map((logo) => (
          <div
            key={logo.src}
            className="flex items-center invert dark:invert-0"
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
  );
}
