'use client';

import { useQueryGuideProgress } from '~/db/guides/GuidesProgressClient';
import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesArticle from './GuidesArticle';
import GuidesArticleJsonLd from './GuidesArticleJsonLd';
import GuidesMainLayout from './GuidesMainLayout';
import type { TableOfContents } from './GuidesTableOfContents';
import type { GuideMetadata } from './types';
import useBehavioralInterviewGuidebookNavigation from './useBehavioralInterviewGuidebookNavigation';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  tableOfContents?: TableOfContents;
  title: string;
}>;

export default function BehavioralInterviewGuidebookLayout({
  children,
  description,
  title,
  tableOfContents,
}: Props) {
  const navigation = useBehavioralInterviewGuidebookNavigation();
  const { pathname } = useI18nPathname();

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  const guideMetadata: GuideMetadata = {
    book: 'BEHAVIORAL_INTERVIEW_PLAYBOOK',
    slug: currentItem.slug,
  };

  const { data: guideProgress, isSuccess } =
    useQueryGuideProgress(guideMetadata);

  return (
    <>
      <GuidesArticleJsonLd
        description={description}
        isAccessibleForFree={true}
        pathname={pathname}
        title={title}
      />
      <GuidesMainLayout
        guideProgress={guideProgress}
        isGuideProgressLoaded={isSuccess}
        metadata={guideMetadata}
        navigation={navigation}
        showMarkAsComplete={true}
        tableOfContents={tableOfContents}>
        <GuidesArticle description={description} title={title}>
          {children}
        </GuidesArticle>
      </GuidesMainLayout>
    </>
  );
}
