import type { Metadata } from 'next';

import BlogHomePage from '~/components/blog/listing/BlogHomePage';

import { getAllBlogSeries } from '~/db/contentlayer/blog/BlogSeriesReader';
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

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Learn new skills, improve your techniques and stay updated on latest front end trends and developments.',
      description: 'Description of GreatFrontEnd blog homepage',
      id: 'saFHOR',
    }),
    locale,
    pathname: '/blog',
    title: intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'Title of GreatFrontEnd blog homepage',
      id: 'CtpuLZ',
    }),
  });
}

export default async function Page() {
  const allSeries = getAllBlogSeries();

  return <BlogHomePage allSeries={allSeries} />;
}
