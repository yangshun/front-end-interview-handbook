import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';
import {
  RiFlashlightFill,
  RiQuestionnaireLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';

import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';
import { FormattedMessage, useIntl } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeGlassyBorder, themeTextColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { findCurrentMaxConsecutiveDays } from './progress/utils';
import InterviewsPageHeader from '../common/InterviewsPageHeader';
import InterviewsDashboardCreateAccountCard from '../dashboard/InterviewsDashboardCreateAccountCard';

type Props = Readonly<{
  contributions?: Record<string, number>;
  isContributionsLoading: boolean;
  isLoggedIn: boolean;
  studyListsMap: Record<string, InterviewsStudyList>;
}>;

export default function InterviewsDashboardPageHeader({
  contributions,
  isLoggedIn,
  isContributionsLoading,
  studyListsMap,
}: Props) {
  const intl = useIntl();
  const currentMaxConsecutiveDays =
    findCurrentMaxConsecutiveDays(contributions);
  const features = [
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{count}+ questions',
          description: 'Features for focus areas',
          id: '6S+H0W',
        },
        {
          count: QuestionCountTotal,
        },
      ),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Solutions & test from ex-interviewers',
        description: 'Features for dashboard',
        id: 'Ow7Mov',
      }),
    },
  ];

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <div className="flex items-center gap-4 lg:grow">
          <Heading level="heading4">
            <FormattedMessage
              defaultMessage="Dashboard"
              description="Label for dashboard title for logged in user"
              id="TW5R5d"
            />
          </Heading>
          <div className="flex items-center gap-2">
            <Tooltip
              label={
                <FormattedMessage
                  defaultMessage="You're on a roll! You've kept your streak going for {days, plural, =0 {0 consecutive days} =1 {1 consecutive day} other {# consecutive days}}, completing at least one question every day."
                  description="Tooltip for max consecutive days of contributions"
                  id="p1MoBS"
                  values={{
                    days: currentMaxConsecutiveDays,
                  }}
                />
              }>
              <div
                className={clsx(
                  'flex items-center justify-center',
                  'size-5 rounded-full',
                  themeGlassyBorder,
                  [
                    'transition-opacity duration-500',
                    isContributionsLoading ? 'opacity-0' : 'opacity-100',
                  ],
                  [
                    !isContributionsLoading &&
                      currentMaxConsecutiveDays === 0 &&
                      'hidden',
                  ],
                )}>
                <RiFlashlightFill
                  className={clsx('size-3 shrink-0', themeTextColor)}
                />
              </div>
            </Tooltip>
            <Text
              className={clsx(
                [
                  'transition-opacity duration-500',
                  isContributionsLoading ? 'opacity-0' : 'opacity-100',
                ],
                [
                  !isContributionsLoading &&
                    currentMaxConsecutiveDays === 0 &&
                    'hidden',
                ],
              )}
              color="secondary"
              size="body3">
              <FormattedMessage
                defaultMessage="{days, plural, =0 {<bold>0 days</bold>} =1 {<bold>1 day</bold>} other {<bold># days</bold>}} current streak"
                description="Label for max consecutive days"
                id="BzDeUP"
                values={{
                  bold: (chunk) => (
                    <Text size="body2" weight="medium">
                      {chunk}
                    </Text>
                  ),
                  days: currentMaxConsecutiveDays,
                }}
              />
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <InterviewsPageHeader
      className="lg:flex-row"
      description={intl.formatMessage({
        defaultMessage:
          'The one-stop page to prepare fully for your front end interviews.',
        description: 'Description for get started in dashboard',
        id: 'DgT+f8',
      })}
      features={features}
      sideElement={
        <div className="w-full lg:w-auto lg:max-w-[363px]">
          <InterviewsDashboardCreateAccountCard studyListsMap={studyListsMap} />
        </div>
      }
      title={intl.formatMessage({
        defaultMessage: 'Get started',
        description: 'Label for dashboard title for guest',
        id: 'mYn2DH',
      })}
    />
  );
}
