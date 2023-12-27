import type { Post, Series } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogArticleMainLayout from '~/components/blog/articles/BlogArticleMainLayout';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogSeriesLayout from '~/components/blog/series/BlogSeriesLayout';
import BlogSubseriesSection from '~/components/blog/subseries/BlogSubseriesSection';

import {
  getAllPosts,
  getAllSeries,
  getSeriesFromSlug,
  getSubseriesAndPosts,
} from '~/contentlayer/utils';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    slug?: string;
  };
}>;

export async function generateStaticParams() {
  return generateStaticParamsWithLocale(
    getAllSeries().map((series) => ({
      slug: series.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const series = getSeriesFromSlug(slug || '');

  return defaultMetadata({
    description: series?.description,
    locale,
    pathname: series?.href || '',
    title: `${series?.title} | Blog`,
  });
}

function getBlogContent(slug: string) {
  const series = getSeriesFromSlug(slug || '');

  if (series) {
    const subseriesData = getSubseriesAndPosts(series as Series, {
      ascending: true,
    });

    if (subseriesData.length > 0) {
      return {
        metadata: {
          ...series,
          hasSubseries: true,
          isSeries: true,
        } as BlogMetadata,
        subseriesData,
      };
    }

    const posts = getAllPosts({ ascending: false }).filter(
      (postItem) => (postItem as Post).series === (series as Series).source,
    );

    return {
      metadata: {
        ...series,
        hasSubseries: false,
        isSeries: true,
      } as BlogMetadata,
      posts,
    };
  }

  notFound();
}

export default function Page({ params }: Props) {
  const { slug } = params;
  const { subseriesData, metadata, posts } = getBlogContent(slug || '');

  return (
    <BlogSeriesLayout metadata={metadata}>
      <BlogArticleMainLayout metadata={metadata}>
        {metadata.hasSubseries && subseriesData ? (
          <BlogSubseriesSection subseriesData={subseriesData} />
        ) : (
          <div>
            <BlogList posts={posts || []} />
          </div>
        )}
      </BlogArticleMainLayout>
    </BlogSeriesLayout>
  );
}
