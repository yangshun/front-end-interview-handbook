import { ArticleJsonLd } from 'next-seo';

type Props = Readonly<{
  description: string;
  isAccessibleForFree?: boolean;
  pathname: string | null;
  title: string;
}>;

export default function BlogArticleJsonLd({
  title,
  description,
  pathname,
  isAccessibleForFree = true,
}: Props) {
  return (
    <ArticleJsonLd
      authorName={[
        {
          name: 'GreatFrontEnd',
          url: 'https://twitter.com/greatfrontend',
        },
      ]}
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
