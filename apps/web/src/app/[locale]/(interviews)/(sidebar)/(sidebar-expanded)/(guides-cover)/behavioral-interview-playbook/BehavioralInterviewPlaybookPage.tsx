'use client';

import {
  RiFlowChart,
  RiQuestionAnswerLine,
  RiShiningLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import GuidesCoverLayout from '~/components/guides/cover/GuidesCoverLayout';
import GuidesListWithCategory from '~/components/guides/cover/GuidesListWithCategory';
import type {
  BehavioralSlugType,
  GuideCardMetadata,
} from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { categorizeGuides } from '~/db/guides/GuidesUtils';

type Props = Readonly<{
  allGuides: ReadonlyArray<GuideCardMetadata>;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
}>;

export default function BehavioralInterviewPlaybookPage({
  metadata,
  allGuides,
}: Props) {
  const intl = useIntl();

  const categorizedGuideSlugs: Record<
    'common-questions' | 'overview',
    ReadonlyArray<BehavioralSlugType>
  > = {
    'common-questions': [
      'self-introduction',
      'why-work-here',
      'questions-to-ask',
      'problem-solving',
      'collaboration',
      'growth-mindset',
    ],
    overview: ['introduction', 'questions'],
  };

  const guidesWithCompletionStatus = useGuidesWithCompletionStatus(allGuides);

  const categorizedGuides = categorizeGuides({
    categorizedSlugs: categorizedGuideSlugs,
    guides: guidesWithCompletionStatus,
  });

  const guidesData = [
    {
      articles: categorizedGuides.overview.articles,
      title: intl.formatMessage({
        defaultMessage: 'Overview',
        description:
          'Title for overview category of behavioral playbook cover page',
        id: 'd4LSzo',
      }),
      totalReadingTime: categorizedGuides.overview.totalReadingTime,
    },
    {
      articles: categorizedGuides['common-questions'].articles,
      title: intl.formatMessage({
        defaultMessage: 'Answering common questions',
        description:
          'Title for Answering common questions category of behavioral playbook cover page',
        id: '/Ig2Nh',
      }),
      totalReadingTime: categorizedGuides['common-questions'].totalReadingTime,
    },
  ];

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
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} question deep-dives',
          description: 'Features for frontend interviews playbook page',
          id: 'okguyM',
        },
        {
          questionCount: categorizedGuides['common-questions'].articles.length,
        },
      ),
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
        <div className="flex flex-col gap-4">
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                "Are you preparing for a front end engineering interview and feeling overwhelmed by the behavioral round? You're not alone. While coding skills are essential, companies are equally interested in how you think, communicate, and collaborate.",
              description:
                'Long description of behavioral interview playbook page',
              id: '/17ryO',
            })}
          </Text>
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                "This guide is the only resource designed specifically for front end engineers, offering you an insider's look at the unique behavioral challenges you’ll face in interviews. From nailing your self introduction to effectively working with cross-functional teams, this guide equips you with the tools, tips, and strategies you need to shine.",
              description:
                'Long description of behavioral interview playbook page',
              id: 'y7V401',
            })}
          </Text>
        </div>
      }
      metadata={metadata}
      showRecommendedItemsDropdown={false}
      title={intl.formatMessage({
        defaultMessage: 'Behavioral Interview Playbook',
        description: 'Title of behavioral interview playbook page',
        id: '8Eo8Y5',
      })}>
      <Section>
        <GuidesListWithCategory guides={guidesData} />
      </Section>
    </GuidesCoverLayout>
  );
}
