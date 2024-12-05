import type { Metadata } from 'next';

import MarketingCommunitySection from '~/components/marketing/contact/MarketingCommunitySection';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage({
    defaultMessage: 'Join the community',
    description: 'Title of community page',
    id: 'TO74hd',
  });

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Be part of our large community of passionate Front End Engineers across the world',
      description: 'Description of community page',
      id: 'CUTtb7',
    }),
    locale,
    ogImageProduct: null,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Join the community',
      description: 'Title of community page',
      id: 'TO74hd',
    }),
    pathname: '/community',
    title,
  });
}

export default function CommunityPage() {
  return (
    <div className="py-12 md:py-16 xl:py-24">
      <MarketingCommunitySection />
    </div>
  );
}
