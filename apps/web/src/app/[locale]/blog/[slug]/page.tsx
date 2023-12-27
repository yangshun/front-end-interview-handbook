import type { Post } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogArticleLayout from '~/components/blog/articles/BlogArticleLayout';
import BlogArticleMainLayout from '~/components/blog/articles/BlogArticleMainLayout';
import BlogMdx from '~/components/blog/articles/BlogMdx';
import type { BlogMetadata } from '~/components/blog/BlogTypes';

import {
  getAllPosts,
  getPostFromSlug,
  getSeriesPostNavigation,
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
    getAllPosts().map((post) => ({
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const post = getPostFromSlug(slug || '');

  return defaultMetadata({
    description: post?.description,
    locale,
    pathname: post?.href || '',
    title: `${post?.title} | Blog`,
  });
}

function getBlogContent(slug: string) {
  const post = getPostFromSlug(slug || '');

  if (post) {
    let seriesArticleNavigation = null;

    if ((post as Post).series) {
      seriesArticleNavigation = getSeriesPostNavigation(post as Post, {
        ascending: true,
      });
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
  const { blogMetadata, seriesArticleNavigation } = getBlogContent(slug || '');

  return (
    <BlogArticleLayout
      metadata={blogMetadata}
      navigation={seriesArticleNavigation}>
      <BlogArticleMainLayout metadata={blogMetadata}>
        <BlogMdx code={(blogMetadata as Post)?.body.code || ''} />
      </BlogArticleMainLayout>
    </BlogArticleLayout>
  );
}
