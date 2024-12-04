import type { BlogPost, BlogSeries } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogArticleMainLayout from '~/components/blog/articles/BlogArticleMainLayout';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import {
  readBlogPostsAll,
  readBlogSeries,
  readBlogSeriesAll,
  readBlogSubseriesAndPosts,
} from '~/components/blog/data/BlogReader';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogSeriesLayout from '~/components/blog/series/BlogSeriesLayout';
import BlogSubseriesSection from '~/components/blog/subseries/BlogSubseriesSection';

import { getIntlServerOnly } from '~/i18n';
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
    readBlogSeriesAll().map((series) => ({
      slug: series.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const series = readBlogSeries(slug || '');
  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage(
    {
      defaultMessage: '{seriesName} | GreatFrontEnd Series',
      description: 'Social title for series page',
      id: 'ex2Jkb',
    },
    {
      seriesName: series?.title,
    },
  );

  return defaultMetadata({
    description: series?.description,
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'OG blog category',
      id: 'QZDp3f',
    }),
    ogImageTitle: series?.title,
    pathname: series?.href || '',
    socialTitle: title,
    title,
  });
}

function getBlogContent(slug: string) {
  const series = readBlogSeries(slug || '');

  if (series) {
    const subseriesData = readBlogSubseriesAndPosts(series as BlogSeries, {
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

    const posts = readBlogPostsAll({ ascending: true }).filter(
      (postItem) =>
        (postItem as BlogPost).series === (series as BlogSeries).source,
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
