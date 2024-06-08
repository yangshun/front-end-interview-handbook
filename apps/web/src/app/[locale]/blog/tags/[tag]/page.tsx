import type { Metadata } from 'next';

import {
  readBlogPostsAll,
  readBlogSeriesAll,
} from '~/components/blog/data/BlogReader';

import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

import BlogExploreTagPage from './BlogExploreTagPage';

type Props = Readonly<{
  params: {
    locale: string;
    tag: string;
  };
}>;

export async function generateStaticParams() {
  const tagsSet = new Set(
    readBlogPostsAll()
      .map((post) => post.tags)
      .flat(),
  );

  return generateStaticParamsWithLocale(
    Array.from(tagsSet).map((tag) => ({ tag })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = params;
  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage: 'Explore articles related to "{tagName}"',
        description: 'Description of GreatFrontEnd blog tag page',
        id: 'YMPsHi',
      },
      { tagName: tag },
    ),
    locale,
    pathname: `/blog/tags/${tag}`,
    title: intl.formatMessage(
      {
        defaultMessage: '{tagName} | Blog',
        description: 'Title of GreatFrontEnd blog tag page',
        id: 'JWwqmr',
      },
      { tagName: tag },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { tag } = params;

  const articles = readBlogPostsAll();
  const series = readBlogSeriesAll();

  return <BlogExploreTagPage articles={articles} series={series} tag={tag} />;
}