import { ArticleJsonLd } from 'next-seo';

import { GFEArticleAuthor } from '~/seo/SEOArticleAuthor';
import { getSiteOrigin } from '~/seo/siteUrl';

import type { QuestionMetadata } from './QuestionsTypes';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

export default function QuestionJsonLd({ metadata }: Props) {
  return (
    <ArticleJsonLd
      authorName={GFEArticleAuthor}
      datePublished={new Date(metadata.created * 1000).toISOString()}
      description={metadata.excerpt!}
      images={[]}
      isAccessibleForFree={metadata.access !== 'premium'}
      title={`Front End Interview Question: ${metadata.title}`}
      url={new URL(metadata.href, getSiteOrigin()).toString()}
      useAppDir={true}
    />
  );
}
