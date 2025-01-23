'use client';

import { useQueryGuideProgress } from '~/db/guides/GuidesProgressClient';
import { useI18nPathname } from '~/next-i18nostic/src';

import { useSystemDesignNavigation } from './SystemDesignGuidebookNavigation';
import GuidesArticle from '../GuidesArticle';
import GuidesArticleJsonLd from '../GuidesArticleJsonLd';
import GuidesMainLayout from '../GuidesMainLayout';
import type { TableOfContents } from '../GuidesTableOfContents';
import type { GuideMetadata } from '../types';
import useFlattenedNavigationItems from '../useFlattenedNavigationItems';
import SystemDesignPaywall from '../../interviews/questions/content/system-design/SystemDesignPaywall';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  isAccessibleForFree?: boolean;
  tableOfContents?: TableOfContents;
  title: string;
}>;

const guide = 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK';

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

  const guideMetadata: GuideMetadata = {
    book: guide,
    id: currentItem.id,
  };

  const { data: guideProgress, isSuccess } =
    useQueryGuideProgress(guideMetadata);

  return (
    <>
      <GuidesArticleJsonLd
        description={description}
        isAccessibleForFree={isAccessibleForFree}
        pathname={pathname}
        // TODO: i18n
        title={`Front End System Design: ${title}`}
      />
      <GuidesMainLayout
        guide={guide}
        guideProgress={guideProgress}
        isGuideProgressLoaded={isSuccess}
        metadata={guideMetadata}
        navigation={navigation}
        showMarkAsComplete={true}
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
