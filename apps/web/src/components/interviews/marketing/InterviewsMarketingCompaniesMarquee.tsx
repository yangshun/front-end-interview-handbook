import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Marquee from '~/components/ui/Marquee';
import Text from '~/components/ui/Text';

const logos = [
  {
    alt: 'Meta logo',
    height: 48,
    src: '/img/company-logos/meta-logo.svg',
    width: 120,
  },
  {
    alt: 'TikTok logo',
    height: 60,
    src: '/img/company-logos/tiktok-logo.svg',
    width: 150,
  },
  {
    alt: 'Spotify logo',
    height: 48,
    src: '/img/company-logos/spotify-logo.png',
    width: 130,
  },
  {
    alt: 'Shopify logo',
    height: 48,
    src: '/img/company-logos/shopify-logo.svg',
    width: 130,
  },
  {
    alt: 'ByteDance logo',
    height: 48,
    src: '/img/company-logos/bytedance-logo.svg',
    width: 130,
  },
  {
    alt: 'Adobe logo',
    height: 48,
    src: '/img/company-logos/adobe-logo.svg',
    width: 130,
  },
  {
    alt: 'Retool logo',
    height: 36,
    src: '/img/company-logos/retool-logo.svg',
    width: 100,
  },
  {
    alt: 'Databricks logo',
    height: 48,
    src: '/img/company-logos/databricks-logo.svg',
    width: 130,
  },
  {
    alt: 'Brex logo',
    height: 36,
    src: '/img/company-logos/brex-logo.svg',
    width: 100,
  },
  {
    alt: 'DocuSign logo',
    className: 'mt-1',
    height: 36,
    src: '/img/company-logos/docusign-logo.svg',
    width: 100,
  },
  {
    alt: 'Seam logo',
    className: 'invert',
    height: 36,
    src: '/img/company-logos/seam-wordmark.webp',
    width: 100,
  },
];

export default function InterviewsMarketingCompaniesMarquee() {
  return (
    <Container
      className="flex flex-col gap-y-6 py-8 lg:gap-y-12 lg:py-16"
      width="6xl">
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
            'flex h-12 items-center gap-16 overflow-hidden invert dark:invert-0',
          )}>
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="flex select-none items-center"
              style={{
                height: logo.height,
                width: logo.width,
              }}>
              <img
                alt={logo.alt}
                className={logo.className}
                decoding="async"
                height={logo.height}
                loading="lazy"
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
