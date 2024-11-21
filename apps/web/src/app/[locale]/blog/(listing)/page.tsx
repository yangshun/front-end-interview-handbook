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
        'Stay updated with the latest trends, tips, and resources for front-end engineers. Explore expert advice, tutorials, and guides to level up your skills and career.',
      description: 'Description of GreatFrontEnd blog homepage',
      id: '0vJviS',
    }),
    locale,
    pathname: '/blog',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Blog | GreatFrontEnd',
      description: 'Title of GreatFrontEnd blog homepage',
      id: 'Q7apLT',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'GreatFrontEnd Blog - News and insights for Front End Engineers',
      description: 'Title of GreatFrontEnd blog homepage',
      id: 'ePTKHr',
    }),
  });
}

export default async function Page() {
  const allSeries = getAllBlogSeries();

  return <BlogHomePage allSeries={allSeries} />;
}
