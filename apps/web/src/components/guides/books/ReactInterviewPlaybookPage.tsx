'use client';

import {
  RiFlowChart,
  RiQuestionnaireLine,
  RiReactjsFill,
  RiShiningLine,
} from 'react-icons/ri';

import { useReactInterviewPlaybookNavigation } from '~/components/guides/books/ReactInterviewPlaybookNavigation';
import GuidesCoverLayout from '~/components/guides/cover/GuidesCoverLayout';
import GuidesListWithCategory from '~/components/guides/cover/GuidesListWithCategory';
import type { GuideCardMetadata } from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import { QuestionCountReact } from '~/components/interviews/questions/listings/stats/QuestionCount';
import { useIntl } from '~/components/intl';
import Section from '~/components/ui/Heading/HeadingContext';

import { processForGuidesCover } from '~/db/guides/GuidesUtils';

type Props = Readonly<{
  allGuides: ReadonlyArray<GuideCardMetadata>;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
}>;

export default function ReactInterviewPlaybookPage({
  allGuides,
  metadata,
}: Props) {
  const intl = useIntl();

  const guidesWithCompletionStatus = useGuidesWithCompletionStatus(allGuides);
  const navigation = useReactInterviewPlaybookNavigation();
  const guidesData = processForGuidesCover(
    navigation,
    guidesWithCompletionStatus,
  );

  const features = [
    {
      icon: RiFlowChart,
      label: intl.formatMessage({
        defaultMessage: 'End-to-end guide',
        description: 'Features for React interviews playbook page',
        id: 'Y5Ba+S',
      }),
    },
    {
      icon: RiShiningLine,
      label: intl.formatMessage({
        defaultMessage: 'Tips for all questions types',
        description: 'Features for React interviews playbook page',
        id: 'bTfNOy',
      }),
    },
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount}+ practice questions',
          description: 'Features for React interviews playbook page',
          id: '8Ix7Fe',
        },
        {
          questionCount: QuestionCountReact,
        },
      ),
    },
  ];

  return (
    <GuidesCoverLayout
      description={intl.formatMessage({
        defaultMessage: 'The definitive guide to React interviews.',
        description: 'Description of React interview playbook page',
        id: 'Td0UNU',
      })}
      features={features}
      icon={RiReactjsFill}
      longDescription={intl.formatMessage({
        defaultMessage:
          "Tackle your next interview with confidence using this focused, no-nonsense front end prep guide. Created by the author of the Front End Interview Handbook, it's filled with practical strategies and insider tips you won't find anywhere else.",
        description: 'Long description of React interview playbook page',
        id: 'y29cTt',
      })}
      metadata={metadata}
      title={intl.formatMessage({
        defaultMessage: 'React Interview Playbook',
        description: 'Title of React interview playbook page',
        id: '9TEFrN',
      })}>
      <Section>
        <GuidesListWithCategory guides={guidesData} />
      </Section>
    </GuidesCoverLayout>
  );
}
