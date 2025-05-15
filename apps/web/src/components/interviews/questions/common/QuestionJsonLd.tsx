import { ArticleJsonLd } from 'next-seo';

import { GFEArticleAuthor } from '~/seo/SEOArticleAuthor';
import { getSiteOrigin } from '~/seo/siteUrl';

import type {
  InterviewsQuestionInfo,
  InterviewsQuestionMetadata,
} from './QuestionsTypes';

type Props = Readonly<{
  info: InterviewsQuestionInfo;
  metadata: InterviewsQuestionMetadata;
}>;

export default function QuestionJsonLd({ info, metadata }: Props) {
  return (
    <ArticleJsonLd
      authorName={GFEArticleAuthor}
      datePublished={new Date(metadata.created * 1000).toISOString()}
      description={info.excerpt!}
      images={[]}
      isAccessibleForFree={metadata.access !== 'premium'}
      title={`Front End Interview Question: ${info.title}`}
      url={new URL(metadata.href, getSiteOrigin()).toString()}
      useAppDir={true}
    />
  );
}
