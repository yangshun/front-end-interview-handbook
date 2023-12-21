import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getBlogTags } from '~/data/blog/Tag';

import type { BlogTagType } from '~/components/blog/BlogTypes';

import { getAllPosts, getAllSeries } from '~/contentlayer/utils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import BlogExploreTagPage from './BlogExploreTagPage';

type Props = Readonly<{
  params: {
    locale: string;
    tag: BlogTagType;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = params;
  const intl = await getIntlServerOnly(locale);

  const blogTags = getBlogTags();
  const blogTag = blogTags[tag];

  if (!blogTag) {
    return redirect('/not-found');
  }

  return defaultMetadata({
    description: blogTag.description,
    locale,
    pathname: blogTag.href,
    title: intl.formatMessage(
      {
        defaultMessage: 'Explore Series and Articles by {name} tag',
        description: 'Title of GreatFrontEnd blog explore series page',
        id: 'R/FCLM',
      },
      { name: blogTag.name },
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
    return redirect('/not-found');
  }

  return (
    <BlogExploreTagPage articles={articles} blogTag={blogTag} series={series} />
  );
}