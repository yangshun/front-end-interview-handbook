import clsx from 'clsx';
import { RiQuestionnaireLine, RiVerifiedBadgeLine } from 'react-icons/ri';

import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';
import { FormattedMessage, useIntl } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import InterviewsDashboardCreateAccountCard from '../dashboard/InterviewsDashboardCreateAccountCard';

import { useUser } from '@supabase/auth-helpers-react';

export default function InterviewsDashboardPageHeader() {
  const intl = useIntl();
  const user = useUser();
  const isLoggedIn = user != null;

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
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Dashboard"
            description="Label for dashboard title for logged in user"
            id="TW5R5d"
          />
        </Heading>
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
