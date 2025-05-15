'use client';

import GuidesArticle from '~/components/guides/GuidesArticle';
import GuidesArticleJsonLd from '~/components/guides/GuidesArticleJsonLd';
import GuidesMainLayout from '~/components/guides/GuidesMainLayout';
import type { TableOfContents } from '~/components/guides/GuidesTableOfContents';
import type { GuideMetadata } from '~/components/guides/types';
import useFlattenedNavigationItems from '~/components/guides/useFlattenedNavigationItems';
import type { InterviewsQuestionItemMinimal } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsSystemDesignPaywall from '~/components/interviews/questions/content/system-design/InterviewsQuestionsSystemDesignPaywall';
import { useIntl } from '~/components/intl';

import { useQueryGuideProgress } from '~/db/guides/GuidesProgressClient';
import { useI18nPathname } from '~/next-i18nostic/src';

import { useFrontEndSystemDesignPlaybookNavigation } from './FrontEndSystemDesignPlaybookNavigation';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  isAccessibleForFree?: boolean;
  questions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  tableOfContents?: TableOfContents;
  title: string;
}>;

const guide = 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK';

export default function FrontEndSystemDesignPlaybookLayout({
  children,
  description,
  isAccessibleForFree = true,
  questions,
  tableOfContents,
  title,
}: Props) {
  const intl = useIntl();
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
        title={intl.formatMessage(
          {
            defaultMessage: 'Front End System Design: {title}',
            description: 'Title for Front End System Design',
            id: 'B8s6N1',
          },
          {
            title,
          },
        )}
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
