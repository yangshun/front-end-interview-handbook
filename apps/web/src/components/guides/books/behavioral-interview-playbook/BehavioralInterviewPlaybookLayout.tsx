'use client';

import { useQueryGuideProgress } from '~/db/guides/GuidesProgressClient';
import { useI18nPathname } from '~/next-i18nostic/src';

import { useBehavioralInterviewPlaybookNavigation } from './BehavioralInterviewPlaybookNavigation';
import GuidesArticle from '../../GuidesArticle';
import GuidesArticleJsonLd from '../../GuidesArticleJsonLd';
import GuidesMainLayout from '../../GuidesMainLayout';
import type { TableOfContents } from '../../GuidesTableOfContents';
import type { GuideMetadata } from '../../types';
import useFlattenedNavigationItems from '../../useFlattenedNavigationItems';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  tableOfContents?: TableOfContents;
  title: string;
}>;

const guide = 'BEHAVIORAL_INTERVIEW_PLAYBOOK';

export default function BehavioralInterviewPlaybookLayout({
  children,
  description,
  title,
  tableOfContents,
}: Props) {
  const navigation = useBehavioralInterviewPlaybookNavigation();
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
        isAccessibleForFree={true}
        pathname={pathname}
        title={title}
      />
      <GuidesMainLayout
        guide={guide}
        guideMetadata={guideMetadata}
        guideProgress={guideProgress}
        isGuideProgressLoaded={isSuccess}
        navigation={navigation}
        tableOfContents={tableOfContents}>
        <GuidesArticle
          description={description}
          metadata={guideMetadata}
          title={title}>
          {children}
        </GuidesArticle>
      </GuidesMainLayout>
    </>
  );
}
