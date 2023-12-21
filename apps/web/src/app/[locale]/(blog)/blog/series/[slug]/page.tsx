import type { Post, Series } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogArticleLayout from '~/components/blog/articles/BlogArticleLayout';
import BlogArticleMainLayout from '~/components/blog/articles/BlogArticleMainLayout';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogSubseriesSection from '~/components/blog/subseries/BlogSubseriesSection';

import {
  getAllPosts,
  getSeriesFromSlug,
  getSubseriesAndPosts,
} from '~/contentlayer/utils';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    slug?: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const series = getSeriesFromSlug(slug || '');

  return defaultMetadata({
    description: series?.description,
    locale,
    pathname: series?.href || '',
    title: series?.title || '',
  });
}

function useBlogContent(slug: string) {
  const series = getSeriesFromSlug(slug || '');

  if (series) {
    const subseriesData = getSubseriesAndPosts(series as Series);

    if (subseriesData.length > 0) {
      return {
        seriesMetadata: {
          ...series,
          hasSubseries: true,
          isSeries: true,
        } as BlogMetadata,
        subseriesData,
      };
    }

    const seriesBlogs = getAllPosts({ sort: true }).filter(
      (_) => (_ as Post).series === (series as Series).source,
    );

    return {
      seriesBlogs,
      seriesMetadata: {
        ...series,
        hasSubseries: false,
        isSeries: true,
      } as BlogMetadata,
    };
  }
  notFound();
}

export default function Page({ params }: Props) {
  const { slug } = params;
  const { subseriesData, seriesMetadata, seriesBlogs } = useBlogContent(
    slug || '',
  );

  return (
    <BlogArticleLayout metadata={seriesMetadata}>
      <BlogArticleMainLayout metadata={seriesMetadata}>
        {seriesMetadata.hasSubseries && subseriesData ? (
          <BlogSubseriesSection subseriesData={subseriesData} />
        ) : (
          <div className="!list-none">
            <BlogList blogs={seriesBlogs || []} />
          </div>
        )}
      </BlogArticleMainLayout>
    </BlogArticleLayout>
  );
}
