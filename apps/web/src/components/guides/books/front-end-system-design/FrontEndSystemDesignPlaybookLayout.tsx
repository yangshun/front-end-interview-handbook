'use client';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import { useQueryGuideProgress } from '~/db/guides/GuidesProgressClient';
import { useI18nPathname } from '~/next-i18nostic/src';

import { useFrontEndSystemDesignPlaybookNavigation } from './FrontEndSystemDesignPlaybookNavigation';
import GuidesArticle from '../../GuidesArticle';
import GuidesArticleJsonLd from '../../GuidesArticleJsonLd';
import GuidesMainLayout from '../../GuidesMainLayout';
import type { TableOfContents } from '../../GuidesTableOfContents';
import type { GuideMetadata } from '../../types';
import useFlattenedNavigationItems from '../../useFlattenedNavigationItems';
import InterviewsQuestionsSystemDesignPaywall from '../../../interviews/questions/content/system-design/InterviewsQuestionsSystemDesignPaywall';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  isAccessibleForFree?: boolean;
  questions: ReadonlyArray<QuestionMetadata>;
  tableOfContents?: TableOfContents;
  title: string;
}>;

const guide = 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK';

export default function FrontEndSystemDesignPlaybookLayout({
  children,
  description,
  tableOfContents,
  title,
  isAccessibleForFree = true,
  questions,
}: Props) {
  const navigation = useFrontEndSystemDesignPlaybookNavigation(questions);
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
        guideMetadata={guideMetadata}
        guideProgress={guideProgress}
        isGuideProgressLoaded={isSuccess}
        navigation={navigation}
        tableOfContents={tableOfContents}>
        <InterviewsQuestionsSystemDesignPaywall isPremium={currentItem.premium}>
          <GuidesArticle
            description={description}
            metadata={guideMetadata}
            title={title}>
            {children}
          </GuidesArticle>
        </InterviewsQuestionsSystemDesignPaywall>
      </GuidesMainLayout>
    </>
  );
}
