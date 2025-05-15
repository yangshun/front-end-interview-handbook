import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { RiArrowDownSLine, RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useGuidesData } from '~/data/Guides';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Chip from '~/components/ui/Chip';
import Popover from '~/components/ui/Popover';
import Text from '~/components/ui/Text';
import {
  themeBorderElementColor,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { getGuideCompletionCount } from '~/db/guides/GuidesUtils';
import type { QuestionProgress } from '~/db/QuestionsProgressTypes';
import { categorizeQuestionsProgress } from '~/db/QuestionsUtils';
import { useI18nPathname } from '~/next-i18nostic/src';

function InterviewsRecommendedPrepStrategyPopoverContents({
  overallProgress,
}: Readonly<{
  overallProgress: ReadonlyArray<QuestionProgress>;
}>) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionSessions.getActive.useQuery(undefined, {
      enabled: !!user,
    });
  const { data: guideProgress } = trpc.guideProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const { data: recommendedPrepData } =
    trpc.questionLists.getRecommendedStudyList.useQuery();

  const sessions = questionListSessions ?? [];
  const gfe75session = sessions.find(
    (session) =>
      recommendedPrepData &&
      session.key === recommendedPrepData.gfe75.studyListKey,
  );
  const blind75session = sessions.find(
    (session) =>
      recommendedPrepData &&
      session.key === recommendedPrepData.blind75.studyListKey,
  );
  const { frontEndInterviewPlaybook, systemDesignPlaybook } =
    getGuideCompletionCount(guideProgress);
  const questionsProgressAll = categorizeQuestionsProgress(overallProgress);

  const guidesData = useGuidesData();

  const items = [
    {
      href: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.href,
      isCompleted:
        frontEndInterviewPlaybook.total === frontEndInterviewPlaybook.completed,
      label: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.name,
    },
    {
      href: '/interviews/gfe75',
      isCompleted:
        recommendedPrepData &&
        gfe75session?._count.progress ===
          recommendedPrepData.gfe75.questionCount,
      label: 'GFE 75',
    },
    {
      href: '/interviews/blind75',
      isCompleted:
        recommendedPrepData &&
        blind75session?._count.progress ===
          recommendedPrepData.blind75.questionCount,
      label: 'Blind 75',
    },
    {
      href: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.href,
      isCompleted:
        recommendedPrepData &&
        questionsProgressAll['system-design'].size +
          systemDesignPlaybook.completed ===
          systemDesignPlaybook.total +
            recommendedPrepData.systemDesignQuestionCount,
      label: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.shortName,
    },
  ];

  const { pathname } = useI18nPathname();

  return (
    <>
      <Text className="block" color="secondary" size="body3" weight="medium">
        <FormattedMessage
          defaultMessage="Recommended prep strategy"
          description="Recommended interview preparation strategy"
          id="jCBp3Z"
        />
      </Text>
      <div className="flex flex-col gap-6">
        {items.map(({ href, isCompleted, label }, index) => {
          const isSelected = pathname ? href.startsWith(pathname) : false;

          return (
            <div key={label} className="flex w-full gap-4">
              <div
                className={clsx(
                  'relative flex flex-col justify-center self-stretch',
                )}>
                {isCompleted ? (
                  <Chip
                    icon={FaCheck}
                    iconClassName="size-4"
                    isLabelHidden={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Completed',
                      description: 'Entity completion status',
                      id: 'NZntPO',
                    })}
                    size="sm"
                    variant="success"
                  />
                ) : (
                  <Chip
                    label={(index + 1).toString()}
                    size="sm"
                    variant={isSelected ? 'neutral-active' : 'neutral'}
                  />
                )}
                {index < items.length - 1 && (
                  <div
                    className={clsx(
                      'absolute top-full h-4 w-px translate-y-1 self-center border-l',
                      themeBorderElementColor,
                    )}
                  />
                )}
              </div>
              <Anchor
                className={clsx(
                  'flex grow items-center justify-between gap-4',
                  'group',
                  'transition-colors',
                )}
                href={href}
                variant="unstyled">
                <Text
                  className={clsx(
                    'block group-hover:text-neutral-900 dark:group-hover:text-neutral-100',
                  )}
                  color={isSelected ? 'default' : 'secondary'}
                  size="body2"
                  weight={isSelected ? 'bold' : 'normal'}>
                  {label}
                </Text>
                {!isSelected && (
                  <RiArrowRightLine
                    className={clsx(
                      'size-4 shrink-0',
                      themeTextSubtleColor,
                      themeTextBrandColor_GroupHover,
                    )}
                  />
                )}
              </Anchor>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function InterviewsRecommendedPrepStrategyPopover({
  overallProgress,
}: Readonly<{
  overallProgress: ReadonlyArray<QuestionProgress>;
}>) {
  return (
    <Popover
      className="flex flex-col gap-6 !p-6"
      side="bottom"
      trigger={
        <button
          className={clsx(themeOutlineElementBrandColor_FocusVisible)}
          type="button">
          <Tooltip
            asChild={true}
            label={
              <FormattedMessage
                defaultMessage="Explore other items from our recommended preparation strategy."
                description="Tooltip for other recommended preparation strategy"
                id="/7J8Gp"
              />
            }>
            <div className="flex items-center gap-1">
              <Text
                className="line-clamp-1 text-ellipsis text-left"
                size="body3"
                weight="medium">
                <FormattedMessage
                  defaultMessage="{count} other items"
                  description="Trigger label for other items"
                  id="59u5/i"
                  values={{
                    count: 3,
                  }}
                />
              </Text>
              <RiArrowDownSLine
                aria-hidden={true}
                className={clsx('size-4 shrink-0', themeTextSubtleColor)}
              />
            </div>
          </Tooltip>
        </button>
      }>
      <InterviewsRecommendedPrepStrategyPopoverContents
        overallProgress={overallProgress}
      />
    </Popover>
  );
}
