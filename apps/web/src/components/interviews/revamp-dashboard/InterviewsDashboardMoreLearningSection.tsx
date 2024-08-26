import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import InterviewsDashboardPrepareByCompanySection from './InterviewsDashboardPrepareByCompanySection';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
}>;

export default function InterviewsDashboardMoreLearningSection({
  companyGuides,
}: Props) {
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const sessions = questionListSessions ?? [];

  return (
    <Section>
      <div className={clsx('flex flex-col gap-12')}>
        <Text color="subtitle" size="body2" weight="medium">
          <FormattedMessage
            defaultMessage="With extra time, continue working on the lists below depending on your needs!"
            description="Label for more learning section"
            id="gTOYrn"
          />
        </Text>
        <Divider />
        <div className="flex flex-col gap-3">
          <Heading className={themeTextColor} color="custom" level="heading5">
            <FormattedMessage
              defaultMessage="More time-savers"
              description="Label for more time savers"
              id="DK7QZb"
            />
          </Heading>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Some 'shortcuts' you might take if you're short on time."
              description="Description for time savers"
              id="TkHQtk"
            />
          </Text>
        </div>
        <InterviewsDashboardPrepareByCompanySection
          companyGuides={companyGuides}
          questionListSessions={sessions}
        />
      </div>
    </Section>
  );
}
