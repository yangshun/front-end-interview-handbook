'use client';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesArticle from './GuidesArticle';
import GuidesArticleJsonLd from './GuidesArticleJsonLd';
import GuidesMainLayout from './GuidesMainLayout';
import type { TableOfContents } from './GuidesTableOfContents';
import { useFrontEndInterviewGuidebookNavigation } from './useFrontEndInterviewGuidebookNavigation';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  tableOfContents?: TableOfContents;
  title: string;
}>;

export default function FrontEndInterviewGuidebookLayout({
  children,
  description,
  tableOfContents,
  title,
}: Props) {
  const navigation = useFrontEndInterviewGuidebookNavigation();
  const { pathname } = useI18nPathname();

  return (
    <>
      <GuidesArticleJsonLd
        description={description}
        isAccessibleForFree={true}
        pathname={pathname}
        title={title}
      />
      <GuidesMainLayout
        navigation={navigation}
        tableOfContents={tableOfContents}>
        <GuidesArticle description={description} title={title}>
          {children}
        </GuidesArticle>
      </GuidesMainLayout>
    </>
  );
}
