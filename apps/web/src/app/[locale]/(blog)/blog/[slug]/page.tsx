import type { Post, Series } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogArticleLayout from '~/components/blog/BlogArticleLayout';
import BlogArticleMainLayout from '~/components/blog/BlogArticleMainLayout';
import BlogMdx from '~/components/blog/BlogMdx';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogSubseriesSection from '~/components/blog/subseries/BlogSubseriesSection';

import {
  getAllPosts,
  getPostFromSlug,
  getSeriesFromSlug,
  getSeriesPostNavigation,
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
  const post = getPostFromSlug(slug || '');

  return defaultMetadata({
    description: (post || series)?.description,
    locale,
    pathname: (post || series)?.href || '',
    title: (post || series)?.title || '',
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

  const post = getPostFromSlug(slug || '');

  if (post) {
    let seriesArticleNavigation = null;

    if ((post as Post).series) {
      seriesArticleNavigation = getSeriesPostNavigation(post as Post);
    }

    return {
      blogMetadata: {
        ...post,
        isSeriesArticle: !!(post as Post).series,
      } as BlogMetadata,
      seriesArticleNavigation,
    };
  }

  notFound();
}

export default function Page({ params }: Props) {
  const { slug } = params;
  const {
    subseriesData,
    blogMetadata,
    seriesMetadata,
    seriesBlogs,
    seriesArticleNavigation,
  } = useBlogContent(slug || '');

  return (
    <BlogArticleLayout
      metadata={blogMetadata || seriesMetadata}
      navigation={
        (blogMetadata as Post)?.series ? seriesArticleNavigation : undefined
      }>
      <BlogArticleMainLayout metadata={blogMetadata || seriesMetadata}>
        {!seriesMetadata ? (
          <BlogMdx code={(blogMetadata as Post)?.body.code || ''} />
        ) : seriesMetadata.hasSubseries && subseriesData ? (
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
