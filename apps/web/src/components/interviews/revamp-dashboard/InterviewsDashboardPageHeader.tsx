import clsx from 'clsx';
import {
  RiFlashlightFill,
  RiQuestionnaireLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';

import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';
import { FormattedMessage, useIntl } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGlassyBorder, themeTextColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { findMaxConsecutiveDays } from './progress-glance/utils';
import InterviewsDashboardCreateAccountCard from '../dashboard/InterviewsDashboardCreateAccountCard';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  contributions?: Record<string, number>;
}>;

export default function InterviewsDashboardPageHeader({
  contributions,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const isLoggedIn = user != null;

  const maxConsecutiveDays = findMaxConsecutiveDays(contributions);

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
          count: QuestionCount,
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

  return (
    <Section>
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Heading level="heading5">
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
                    days: maxConsecutiveDays,
                  }}
                />
              }>
              <div
                className={clsx(
                  'flex items-center justify-center',
                  'size-5 rounded-full',
                  themeGlassyBorder,
                )}>
                <RiFlashlightFill
                  className={clsx('size-3 shrink-0', themeTextColor)}
                />
              </div>
            </Tooltip>
            <Text color="secondary" size="body3">
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
                  days: maxConsecutiveDays,
                }}
              />
            </Text>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={clsx(
              'grid grid-cols-1 items-stretch justify-between gap-x-2 gap-y-6 sm:flex sm:flex-row',
            )}>
            <div className="flex flex-col gap-3">
              <Heading level="heading5">
                <FormattedMessage
                  defaultMessage="Get started"
                  description="Label for dashboard title for guest"
                  id="mYn2DH"
                />
              </Heading>
              <Text color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="The one-stop page to prepare fully for your front end interviews."
                  description="Description for get started in dashboard"
                  id="DgT+f8"
                />
              </Text>
            </div>
            <InterviewsDashboardCreateAccountCard />
          </div>

          <div className="mb-12 mt-10">
            <InterviewsPageFeatures features={features} />
          </div>

          <Divider />
        </div>
      )}
    </Section>
  );
}
