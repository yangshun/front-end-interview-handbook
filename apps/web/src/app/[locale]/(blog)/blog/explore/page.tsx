import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import BlogExplorePage from './BlogExplorePage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        "Here you'll find a curated collection of our most insightful and engaging blog content, neatly organized into series for your convenience. Each series focuses on a unique theme or topic providing a deep dive subject.",
      description: 'Description of GreatFrontEnd blog explore series page',
      id: 'fiHpIm',
    }),
    locale,
    pathname: '/blog/explore',
    title: intl.formatMessage({
      defaultMessage: 'Explore Series',
      description: 'Title of GreatFrontEnd blog explore series page',
      id: 'XqU8Op',
    }),
  });
}

export default function Page() {
  return <BlogExplorePage />;
}