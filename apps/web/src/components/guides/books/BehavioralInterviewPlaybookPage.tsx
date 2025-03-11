'use client';

import {
  RiFlowChart,
  RiQuestionAnswerLine,
  RiShiningLine,
} from 'react-icons/ri';

import { useBehavioralInterviewPlaybookNavigation } from '~/components/guides/books/BehavioralInterviewPlaybookNavigation';
import GuidesCoverLayout from '~/components/guides/cover/GuidesCoverLayout';
import GuidesListWithCategory from '~/components/guides/cover/GuidesListWithCategory';
import type { GuideCardMetadata } from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import { useIntl } from '~/components/intl';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { processForGuidesCover } from '~/db/guides/GuidesUtils';

type Props = Readonly<{
  guides: ReadonlyArray<GuideCardMetadata>;
}>;

export default function BehavioralInterviewPlaybookPage({ guides }: Props) {
  const intl = useIntl();

  const guidesWithCompletionStatus = useGuidesWithCompletionStatus(guides);
  const navigation = useBehavioralInterviewPlaybookNavigation();
  const guideItems = processForGuidesCover(
    navigation,
    guidesWithCompletionStatus,
  );

  const features = [
    {
      icon: RiFlowChart,
      label: intl.formatMessage({
        defaultMessage: 'Tips specific to front end',
        description: 'Features for behavioral playbook page',
        id: 'mwgF3L',
      }),
    },
    {
      icon: RiShiningLine,
      label: intl.formatMessage({
        defaultMessage: 'Behavioral question deep-dives',
        description: 'Features for frontend interviews playbook page',
        id: 'nJ9Le/',
      }),
    },
  ];

  return (
    <GuidesCoverLayout
      description={intl.formatMessage({
        defaultMessage:
          'The only behavioral interview guide written for front end engineers.',
        description: 'Description of behavioral interview playbook page',
        id: 'qUwhFM',
      })}
      features={features}
      icon={RiQuestionAnswerLine}
      longDescription={
        <>
          <Text color="inherit" size="inherit">
            {intl.formatMessage({
              defaultMessage:
                "Are you preparing for a front end engineering interview and feeling overwhelmed by the behavioral round? You're not alone. While coding skills are essential, companies are equally interested in how you think, communicate, and collaborate.",
              description:
                'Long description of behavioral interview playbook page',
              id: '/17ryO',
            })}
          </Text>
          <Text color="inherit" size="inherit">
            {intl.formatMessage({
              defaultMessage:
                "This guide is the only resource designed specifically for front end engineers, offering you an insider's look at the unique behavioral challenges you'll face in interviews. From nailing your self introduction to effectively working with cross-functional teams, this guide equips you with the tools, tips, and strategies you need to shine.",
              description:
                'Long description of behavioral interview playbook page',
              id: 'l9EqMY',
            })}
          </Text>
        </>
      }
      title={intl.formatMessage({
        defaultMessage: 'Behavioral Interview Playbook',
        description: 'Title of behavioral interview playbook page',
        id: '8Eo8Y5',
      })}>
      <Section>
        <GuidesListWithCategory guideItems={guideItems} />
      </Section>
    </GuidesCoverLayout>
  );
}
