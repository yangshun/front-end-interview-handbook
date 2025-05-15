'use client';

import type { GuidebookItem } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { clsx } from 'clsx';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiListCheck,
} from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import {
  useMutationGuideProgressAdd,
  useQueryGuideProgress,
} from '~/db/guides/GuidesProgressClient';
import { useI18nPathname } from '~/next-i18nostic/src';

import QuestionReportIssueButton from '../interviews/questions/common/QuestionReportIssueButton';
import type { InterviewsQuestionMetadata } from '../interviews/questions/common/QuestionsTypes';
import { useGuidesContext } from './GuidesLayout';
import GuidesProgressAction from './GuidesProgressAction';
import type { GuideMetadata, GuideNavigation } from './types';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';
import { useGuidesAutoMarkAsComplete } from './useGuidesAutoMarkAsComplete';

type PaginationItem = Readonly<{
  href?: string;
  label: string;
  slug?: string;
}>;

type Props<GuideSlug extends string> = Readonly<{
  guide: GuidebookItem;
  navigation: GuideNavigation<GuideSlug>;
  questionMetadata?: InterviewsQuestionMetadata;
  studyListKey?: string;
}>;

export default function GuidesPagination<GuideSlug extends string>({
  guide,
  navigation,
  questionMetadata,
  studyListKey,
}: Props<GuideSlug>) {
  const intl = useIntl();
  const user = useUser();
  const { pathname } = useI18nPathname();
  const guidesData = useGuidesData();
  const { isMobileGuideMenuOpen, setIsMobileGuideMenuOpen } =
    useGuidesContext();
  const [autoMarkAsComplete] = useGuidesAutoMarkAsComplete();
  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  // Loop through list to get next, prev and current question number vs total question list.
  let prevArticle: PaginationItem | null = null;
  let nextArticle: PaginationItem | null = null;
  let currentArticlePosition = 0;
  const totalNumArticles = flatNavigationItems.length;

  for (let i = 0; i < flatNavigationItems.length; i++) {
    currentArticlePosition++;
    if (
      flatNavigationItems[i]?.href !== pathname &&
      flatNavigationItems[i].slug !== pathname
    ) {
      continue;
    }
    // We have found the active item.
    if (i > 0) {
      prevArticle = flatNavigationItems[i - 1];
    }
    if (i + 1 < flatNavigationItems.length) {
      nextArticle = flatNavigationItems[i + 1];
    }
    break;
  }

  const guideMetadata: GuideMetadata = {
    book: guide,
    id: currentItem.id,
  };

  const { data: guideProgress, isLoading } =
    useQueryGuideProgress(guideMetadata);

  const addGuideProgressMutation = useMutationGuideProgressAdd();

  function onNext() {
    if (
      user == null ||
      !autoMarkAsComplete ||
      guideMetadata == null ||
      guideProgress?.status === 'COMPLETED'
    ) {
      return;
    }

    addGuideProgressMutation.mutate({
      book: guideMetadata.book,
      slug: guideMetadata.id,
      studyListKey,
      title: currentItem.label,
    });
  }

  return (
    <nav
      aria-label={intl.formatMessage({
        defaultMessage: 'Pagination',
        description: 'Screenreader text for the pagination component',
        id: 'C8/0hU',
      })}
      className={clsx(
        'sticky inset-x-0 bottom-0',
        'flex items-center justify-between gap-2',
        'px-4 sm:px-6',
        'h-12',
        ['border-t', themeBorderColor],
        themeBackgroundColor,
      )}>
      <div className="flex shrink-0 justify-center sm:order-2 sm:flex-1">
        <div className="hidden lg:flex">
          <Button
            addonPosition="start"
            href={prevArticle?.href}
            icon={RiArrowLeftSLine}
            isDisabled={!prevArticle?.href}
            label={intl.formatMessage({
              defaultMessage: 'Prev',
              description: 'Label for button leading to the previous page',
              id: 'frl+Af',
            })}
            size="xs"
            tooltip={prevArticle ? prevArticle.label : undefined}
            variant="secondary"
          />
          <div className="flex items-center gap-2 px-5">
            <RiListCheck className={clsx('size-4', themeTextSubtitleColor)} />
            <Text className="whitespace-nowrap" size="body3" weight="medium">
              {guidesData[guide].shortName}
            </Text>
            <Badge
              label={`${currentArticlePosition}/${totalNumArticles}`}
              size="xs"
              variant="neutral"
            />
          </div>
          <Button
            href={nextArticle?.href}
            icon={RiArrowRightSLine}
            isDisabled={!nextArticle?.href}
            label={intl.formatMessage({
              defaultMessage: 'Next',
              description: 'Label for button leading to the next page',
              id: 'b2csyI',
            })}
            size="xs"
            tooltip={nextArticle ? nextArticle.label : undefined}
            variant="secondary"
            onClick={onNext}
          />
        </div>
        <div className="flex lg:hidden">
          <Button
            addonPosition="start"
            href={prevArticle?.href}
            icon={RiArrowLeftSLine}
            isDisabled={!prevArticle?.href}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Prev',
              description: 'Label for button leading to the previous page',
              id: 'frl+Af',
            })}
            size="xs"
            tooltip={prevArticle ? prevArticle.label : undefined}
            variant="tertiary"
          />
          {/* Button for tablet */}
          <Button
            addonPosition="start"
            className="mx-3.5 hidden sm:flex"
            icon={RiListCheck}
            label={guidesData[guide].shortName}
            size="xs"
            variant="secondary"
            onClick={() => setIsMobileGuideMenuOpen(!isMobileGuideMenuOpen)}>
            <div className="flex items-center gap-2">
              <Text
                className="line-clamp-1 sm:line-clamp-none sm:whitespace-nowrap"
                size="body3"
                weight="medium">
                {guidesData[guide].shortName}
              </Text>
              <Badge
                label={`${currentArticlePosition}/${totalNumArticles}`}
                size="xs"
                variant="neutral"
              />
            </div>
          </Button>
          {/* Button for mobile */}
          <Button
            addonPosition="start"
            className="mx-3.5 flex sm:hidden"
            icon={RiListCheck}
            isLabelHidden={true}
            label={guidesData[guide].shortName}
            size="xs"
            variant="secondary"
            onClick={() => setIsMobileGuideMenuOpen(!isMobileGuideMenuOpen)}
          />
          <Button
            href={nextArticle?.href}
            icon={RiArrowRightSLine}
            isDisabled={!nextArticle?.href}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Next',
              description: 'Label for button leading to the next page',
              id: 'b2csyI',
            })}
            size="xs"
            tooltip={nextArticle ? nextArticle.label : undefined}
            variant="tertiary"
            onClick={onNext}
          />
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1">
        {questionMetadata ? (
          <QuestionReportIssueButton
            entity="question"
            format={questionMetadata.format}
            slug={questionMetadata.slug}
          />
        ) : (
          <QuestionReportIssueButton
            book={guide}
            entity="article"
            slug={currentItem.id}
          />
        )}
      </div>
      <div
        className={clsx(
          'flex justify-end sm:order-3 sm:flex-1',
          'transition-colors',
          isLoading && user != null ? 'opacity-0' : 'opacity-100',
        )}>
        {questionMetadata ? (
          <QuestionReportIssueButton
            className="mr-2 sm:hidden"
            entity="question"
            format={questionMetadata.format}
            slug={questionMetadata.slug}
          />
        ) : (
          <QuestionReportIssueButton
            book={guide}
            className="mr-2 sm:hidden"
            entity="article"
            slug={currentItem.id}
          />
        )}
        {questionMetadata ? (
          <QuestionProgressAction
            metadata={questionMetadata}
            studyListKey={studyListKey}
          />
        ) : (
          <GuidesProgressAction
            guideName={currentItem.label}
            guideProgress={guideProgress}
            metadata={guideMetadata}
            studyListKey={studyListKey}
          />
        )}
      </div>
    </nav>
  );
}
