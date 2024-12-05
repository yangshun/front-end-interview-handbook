import type { Metadata } from 'next';

import BlogExplorePage from '~/components/blog/explore/BlogExplorePage';

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
    defaultMessage:
      'Explore Series - Curated content series for Front End Engineers',
    description: 'Title of GreatFrontEnd blog explore series page',
    id: '55EU+L',
  });

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Browse curated content series on front end development. Explore structured guides, tutorials, and expert insights to deepen your knowledge and boost your skills.',
      description: 'Description of GreatFrontEnd blog explore series page',
      id: 'nkhVnD',
    }),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'OG blog category',
      id: 'QZDp3f',
    }),
    ogImageProduct: null,
    ogImageTitle: title,
    pathname: '/blog/explore',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Explore Front End Series | GreatFrontEnd',
      description: 'Social title of GreatFrontEnd blog explore series page',
      id: 'FIKuOh',
    }),
    title,
  });
}

export default async function Page() {
  return <BlogExplorePage />;
}
