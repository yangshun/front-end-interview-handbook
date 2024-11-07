import type { BlogPost } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogArticleLayout from '~/components/blog/articles/BlogArticleLayout';
import BlogArticleMainLayout from '~/components/blog/articles/BlogArticleMainLayout';
import BlogMdx from '~/components/blog/articles/BlogMdx';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import {
  readBlogPost,
  readBlogPostsAll,
  readBlogSeriesPostNavigation,
} from '~/components/blog/data/BlogReader';

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
    readBlogPostsAll().map((post) => ({
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const post = readBlogPost(slug || '');

  return defaultMetadata({
    description: post?.description,
    imageUrl: post?.imageUrl,
    locale,
    pathname: post?.href || '',
    title: `${post?.title} | Blog`,
  });
}

function getBlogContent(slug: string) {
  const post = readBlogPost(slug || '');

  if (post) {
    let seriesArticleNavigation = null;

    if ((post as BlogPost).series) {
      seriesArticleNavigation = readBlogSeriesPostNavigation(post as BlogPost, {
        ascending: true,
      });
    }

    return {
      blogMetadata: {
        ...post,
        isSeriesArticle: !!(post as BlogPost).series,
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
      seriesContents={seriesArticleNavigation}>
      <BlogArticleMainLayout metadata={blogMetadata}>
        <BlogMdx code={(blogMetadata as BlogPost)?.body.code || ''} />
      </BlogArticleMainLayout>
    </BlogArticleLayout>
  );
}
