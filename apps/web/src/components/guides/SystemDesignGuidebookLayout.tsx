'use client';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesArticle from './GuidesArticle';
import GuidesArticleJsonLd from './GuidesArticleJsonLd';
import GuidesMainLayout from './GuidesMainLayout';
import type { TableOfContents } from './GuidesTableOfContents';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';
import { useSystemDesignNavigation } from '../questions/content/system-design/SystemDesignNavigation';
import SystemDesignPaywall from '../questions/content/system-design/SystemDesignPaywall';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  isAccessibleForFree?: boolean;
  tableOfContents?: TableOfContents;
  title: string;
}>;

export default function SystemDesignGuidebookLayout({
  children,
  description,
  tableOfContents,
  title,
  isAccessibleForFree = true,
}: Props) {
  const navigation = useSystemDesignNavigation();
  const { pathname } = useI18nPathname();

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  return (
    <>
      <GuidesArticleJsonLd
        description={description}
        isAccessibleForFree={isAccessibleForFree}
        pathname={pathname}
        title={`Front End System Design: ${title}`}
      />
      <GuidesMainLayout
        navigation={navigation}
        tableOfContents={tableOfContents}>
        <SystemDesignPaywall isPremium={currentItem.premium}>
          <GuidesArticle description={description} title={title}>
            {children}
          </GuidesArticle>
        </SystemDesignPaywall>
      </GuidesMainLayout>
    </>
  );
}
