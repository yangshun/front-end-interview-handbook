'use client';

import { clsx } from 'clsx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import {
  useMutationGuideProgressAdd,
  useQueryGuideProgress,
} from '~/db/guides/GuidesProgressClient';
import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesProgressAction from './GuidesProgressAction';
import type { GuideMetadata, GuideNavigation } from './types';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';
import { useGuidesAutoMarkAsComplete } from './useGuidesAutoMarkAsComplete';
import QuestionReportIssueButton from '../interviews/questions/common/QuestionReportIssueButton';
import Badge from '../ui/Badge';
import { themeBackgroundDarkColor } from '../ui/theme';

import type { GuidebookItem } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';

type PaginationItem = Readonly<{
  href?: string;
  label: string;
  slug?: string;
}>;

type Props = Readonly<{
  guide: GuidebookItem;
  navigation: GuideNavigation;
  studyListKey?: string;
}>;

export const GUIDES_BOTTOM_PAGINATION_HEIGHT = '48px';

export default function GuidesPagination({
  navigation,
  guide,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { pathname } = useI18nPathname();
  const guidesData = useGuidesData();
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

  const isSystemDesignQuestion =
    guide === 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK' &&
    currentItem?.kind === 'question';

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
        'px-4 py-2.5 sm:px-6',
        themeBackgroundDarkColor,
      )}>
      <div className="flex flex-1 shrink-0 justify-center sm:order-2">
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
          <div className="flex items-center gap-2 px-3">
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
          <div className="flex items-center gap-2 px-3">
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
        {isSystemDesignQuestion && (
          <QuestionReportIssueButton
            format="system-design"
            title={currentItem.label}
          />
        )}
      </div>
      <div
        className={clsx(
          'flex justify-end sm:order-3 sm:flex-1',
          'transition-colors',
          isLoading && user != null ? 'opacity-0' : 'opacity-100',
        )}>
        {isSystemDesignQuestion && (
          <QuestionReportIssueButton
            className="mr-2 sm:hidden"
            format="system-design"
            title={currentItem.label}
          />
        )}
        <GuidesProgressAction
          guideName={currentItem.label}
          guideProgress={guideProgress}
          metadata={guideMetadata}
          studyListKey={studyListKey}
        />
      </div>
    </nav>
  );
}
