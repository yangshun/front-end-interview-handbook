import { ArticleJsonLd } from 'next-seo';

import { GFEArticleAuthor } from '~/seo/SEOArticleAuthor';

type Props = Readonly<{
  description: string;
  isAccessibleForFree?: boolean;
  pathname: string | null;
  title: string;
}>;

export default function GuidesArticleJsonLd({
  description,
  isAccessibleForFree = true,
  pathname,
  title,
}: Props) {
  return (
    <ArticleJsonLd
      authorName={GFEArticleAuthor}
      datePublished="2022-11-01T08:00:00+08:00"
      description={description}
      images={[]}
      isAccessibleForFree={isAccessibleForFree}
      title={title}
      url={`https://www.greatfrontend.com${pathname}`}
      useAppDir={true}
    />
  );
}
