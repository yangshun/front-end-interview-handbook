import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';

import getProgressBarGradient from '~/components/interviews/common/utils';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import GradientProgressBar from '~/components/ui/GradientProgressBar/GradientProgressBar';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundCardWhiteOnLightColor,
  themeBorderElementColor,
  themeBorderEmphasizeColor,
  themeDivideEmphasizeColor,
  themeTextColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import InterviewsEntityProgress from '../common/InterviewsEntityProgress';

import type { LearningSession } from '@prisma/client';

type SessionProgress = ReadonlyArray<{
  articleProgress?: {
    completed: number;
    total: number;
  };
  href: string;
  questionProgress?: {
    completed: number;
    total: number;
  };
  title: string;
  updatedAt: Date | null;
}>;

type Props = Readonly<{
  hideHeading?: boolean;
  playbookProgress: SessionProgress;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
  studyListsMap: Record<
    string,
    InterviewsStudyList & Readonly<{ questionCount?: number }>
  >;
  variant?: 'combined' | 'normal';
}>;

const SHOW_MAX_PROGRESS = 8;

export default function InterviewsDashboardContinueLearningSection({
  questionListSessions,
  studyListsMap,
  playbookProgress,
  variant = 'normal',
  hideHeading = false,
}: Props) {
  const intl = useIntl();

  const items: SessionProgress = questionListSessions
    .filter(({ key, _count }) => {
      const studyList = studyListsMap[key];

      if (!studyList) {
        return false;
      }

      const { questionHashes, questionCount } = studyList;

      // Remove completed session
      return (
        (_count.progress !== questionCount || _count.progress) !==
        questionHashes?.length
      );
    })
    .map(({ key, _count, updatedAt }) => {
      const { href, longName, questionHashes, questionCount } =
        studyListsMap[key];

      return {
        href,
        questionProgress: {
          completed: _count.progress,
          total: questionCount ?? questionHashes?.length ?? 0,
        },
        title: longName,
        updatedAt,
      };
    });

  const sessionsProgress = [...items, ...playbookProgress]
    .sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;

      return dateB - dateA;
    })
    .slice(0, SHOW_MAX_PROGRESS);

  return (
    <div className="flex flex-col gap-6">
      {!hideHeading && (
        <Heading className={themeTextColor} color="custom" level="heading6">
          <FormattedMessage
            defaultMessage="Continue learning"
            description="Title for continue learning section"
            id="wvGU2J"
          />
        </Heading>
      )}
      <div
        className={clsx(
          variant === 'normal'
            ? 'grid gap-4 md:grid-cols-2 xl:gap-6'
            : [
                'flex flex-col divide-y overflow-hidden rounded-2xl',
                themeDivideEmphasizeColor,
                themeBackgroundCardColor,
                themeBorderEmphasizeColor,
              ],
        )}>
        {sessionsProgress.map(
          ({ href, title, questionProgress, articleProgress }) => {
            const totalCount =
              (questionProgress?.total ?? 0) + (articleProgress?.total ?? 0);
            const completedCount =
              (questionProgress?.completed ?? 0) +
              (articleProgress?.completed ?? 0);
            const progressPercentage =
              Math.min(completedCount / Math.max(totalCount, 1), 1) * 100;

            return (
              <div
                key={href}
                className={clsx(
                  'group relative',
                  'flex items-center justify-between',
                  variant === 'normal'
                    ? [
                        'gap-6',
                        'p-6',
                        'rounded-lg',
                        themeBackgroundCardWhiteOnLightColor,
                        ['border', themeBorderElementColor],
                      ]
                    : ['gap-4', 'px-5 py-4'],
                )}>
                <div className="flex items-center gap-4">
                  <GradientProgressBar
                    className="size-12"
                    gradient={getProgressBarGradient({
                      total: totalCount,
                      value: completedCount,
                    })}
                    progressPercentage={progressPercentage}
                    reverseGradient={false}>
                    <Tooltip
                      asChild={true}
                      label={
                        <FormattedMessage
                          defaultMessage="You have completed {percent}% of this study list."
                          description="Tooltip for learning list progress percent"
                          id="L36Hrm"
                          values={{
                            percent: intl.formatNumber(progressPercentage, {
                              maximumFractionDigits: 0,
                              style: 'decimal',
                            }),
                          }}
                        />
                      }>
                      <Text color="inherit" size="body3">
                        <FormattedMessage
                          defaultMessage="<percent>{percentage}</percent>%"
                          description="Progress percentage in Continue Learning section in preparation dashboard"
                          id="lDlJyX"
                          values={{
                            percent: (chunks) => (
                              <Text
                                className="font-bold"
                                color="inherit"
                                size="body2"
                                weight="inherit">
                                {chunks}
                              </Text>
                            ),
                            percentage: intl.formatNumber(progressPercentage, {
                              maximumFractionDigits: 0,
                              style: 'decimal',
                            }),
                          }}
                        />
                      </Text>
                    </Tooltip>
                  </GradientProgressBar>
                  <div className="flex flex-col gap-1.5">
                    <Text size="body1" weight="medium">
                      {title}
                    </Text>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      {questionProgress && (
                        <InterviewsEntityProgress
                          completed={questionProgress.completed}
                          entity="question"
                          showProgressBar={false}
                          title={title}
                          total={questionProgress.total}
                        />
                      )}
                      {articleProgress && (
                        <InterviewsEntityProgress
                          completed={articleProgress.completed}
                          entity="article"
                          showProgressBar={false}
                          title={title}
                          total={articleProgress.total}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  className="group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/70"
                  href={href}
                  label={intl.formatMessage({
                    defaultMessage: 'Resume',
                    description: 'Resume the study session',
                    id: 'HH+Rb8',
                  })}
                  variant="secondary"
                />
                <Anchor
                  aria-label={title}
                  className="absolute inset-0"
                  href={href}
                />
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
