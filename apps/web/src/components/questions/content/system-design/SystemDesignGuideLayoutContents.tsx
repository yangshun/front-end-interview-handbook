'use client';

import { useI18nPathname } from 'next-i18nostic';
import { ArticleJsonLd } from 'next-seo';

import type { TableOfContents } from '~/components/guides/GuidesTableOfContents';
import SystemDesignLayoutContents from '~/components/questions/content/system-design/SystemDesignLayoutContents';
import Prose from '~/components/ui/Prose';
import Abstract from '~/components/ui/Prose/Abstract';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  shouldCheckPremium?: boolean;
  tableOfContents?: TableOfContents;
  title: string;
}>;

export default function SystemDesignGuideLayoutContents({
  children,
  tableOfContents,
  title,
  description,
}: Props) {
  const { pathname } = useI18nPathname();

  return (
    <SystemDesignLayoutContents tableOfContents={tableOfContents}>
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
        isAccessibleForFree={true}
        title={`Front End System Design: ${title}`}
        url={`https://www.greatfrontend.com${pathname}`}
        useAppDir={true}
      />
      <Prose textSize="xl">
        <h1>{title}</h1>
        <Abstract>{description}</Abstract>
        {children}
      </Prose>
    </SystemDesignLayoutContents>
  );
}
