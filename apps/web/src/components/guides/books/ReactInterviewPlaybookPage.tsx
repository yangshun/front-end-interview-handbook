'use client';

import {
  RiFlowChart,
  RiQuestionnaireLine,
  RiReactjsFill,
  RiShiningLine,
} from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

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
  const guideItems = processForGuidesCover(
    navigation,
    guidesWithCompletionStatus,
  );
  const guidesData = useGuidesData();

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
      description={guidesData.REACT_INTERVIEW_PLAYBOOK.description}
      features={features}
      icon={RiReactjsFill}
      longDescription={intl.formatMessage({
        defaultMessage:
          'Ace your React interviews with confidence with this comprehensive guide. Created by the author of the Front End Interview Handbook, the guide emphasizes on the concepts that are important for interviews using plenty of code examples. For each concept, learn the best practices and practice a variety of questions to help you truly master it.',
        description: 'Long description of React interview playbook page',
        id: 'HI42cv',
      })}
      metadata={metadata}
      title={intl.formatMessage({
        defaultMessage: 'React Interview Playbook',
        description: 'Title of React interview playbook page',
        id: '9TEFrN',
      })}>
      <Section>
        <GuidesListWithCategory guideItems={guideItems} />
      </Section>
    </GuidesCoverLayout>
  );
}
