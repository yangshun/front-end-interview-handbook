import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBlogTags } from '~/data/blog/Tag';

import type { BlogTagType } from '~/components/blog/BlogTypes';

import { getAllPosts, getAllSeries } from '~/contentlayer/utils';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

import BlogExploreTagPage from './BlogExploreTagPage';

type Props = Readonly<{
  params: {
    locale: string;
    tag: BlogTagType;
  };
}>;

export async function generateStaticParams() {
  return generateStaticParamsWithLocale(
    Object.keys(getBlogTags()).map((tag) => ({ tag })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = params;
  const intl = await getIntlServerOnly(locale);

  const blogTags = getBlogTags();
  const blogTag = blogTags[tag];

  if (!blogTag) {
    notFound();
  }

  return defaultMetadata({
    description: blogTag.description,
    locale,
    pathname: blogTag.href,
    title: intl.formatMessage(
      {
        defaultMessage: '{tagName} | Blog',
        description: 'Title of GreatFrontEnd blog explore series page',
        id: 'qS3yTj',
      },
      { tagName: blogTag.name },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { tag } = params;

  const blogTags = getBlogTags();
  const blogTag = blogTags[tag];
  const articles = getAllPosts({ sort: true });
  const series = getAllSeries();

  if (!blogTag) {
    notFound();
  }

  return (
    <BlogExploreTagPage articles={articles} blogTag={blogTag} series={series} />
  );
}
