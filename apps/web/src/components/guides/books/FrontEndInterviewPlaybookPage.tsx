'use client';

import {
  RiBookOpenLine,
  RiFlowChart,
  RiQuestionnaireLine,
  RiShiningLine,
} from 'react-icons/ri';

import type { FrontEndInterviewPlaybookPathType } from '~/components/guides/books/FrontEndInterviewPlaybookNavigation';
import GuidesCoverLayout from '~/components/guides/cover/GuidesCoverLayout';
import GuidesListWithCategory from '~/components/guides/cover/GuidesListWithCategory';
import type { GuideCardMetadata } from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';
import { useIntl } from '~/components/intl';
import Section from '~/components/ui/Heading/HeadingContext';

import { categorizeGuides } from '~/db/guides/GuidesUtils';

type Props = Readonly<{
  allGuides: ReadonlyArray<GuideCardMetadata>;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
}>;

export default function FrontEndInterviewPlaybookPage({
  allGuides,
  metadata,
}: Props) {
  const intl = useIntl();

  const categorizedGuideSlugs: Record<
    'coding' | 'introduction' | 'quiz' | 'resume' | 'system-design' | 'ui',
    ReadonlyArray<FrontEndInterviewPlaybookPathType>
  > = {
    coding: ['coding', 'javascript', 'algorithms'],
    introduction: ['introduction'],
    quiz: ['quiz'],
    resume: ['resume'],
    'system-design': ['system-design'],
    ui: [
      'user-interface',
      'user-interface-questions-cheatsheet',
      'user-interface-components-api-design-principles',
    ],
  };

  const guidesWithCompletionStatus = useGuidesWithCompletionStatus(allGuides);

  const categorizedGuides = categorizeGuides({
    categorizedSlugs: categorizedGuideSlugs,
    guides: guidesWithCompletionStatus,
  });

  const guidesData = [
    {
      articles: categorizedGuides.introduction.articles,
      title: intl.formatMessage({
        defaultMessage: 'Introduction',
        description:
          'Title for introduction category of frontend interview playbook cover page',
        id: '1zLRKA',
      }),
      totalReadingTime: categorizedGuides.introduction.totalReadingTime,
    },
    {
      articles: categorizedGuides.coding.articles,
      title: intl.formatMessage({
        defaultMessage: 'Coding Interviews',
        description:
          'Title for Coding Interviews category of frontend interview playbook cover page',
        id: '5db7o8',
      }),
      totalReadingTime: categorizedGuides.coding.totalReadingTime,
    },
    {
      articles: categorizedGuides.ui.articles,
      title: intl.formatMessage({
        defaultMessage: 'User Interface Interviews',
        description:
          'Title for User Interface Interviews category of frontend interview playbook cover page',
        id: '3GRLIt',
      }),
      totalReadingTime: categorizedGuides.ui.totalReadingTime,
    },
    {
      articles: categorizedGuides['system-design'].articles,
      title: intl.formatMessage({
        defaultMessage: 'System Design Interviews',
        description:
          'Title for System Design Interviews category of frontend interview playbook cover page',
        id: 'oTMcbU',
      }),
      totalReadingTime: categorizedGuides['system-design'].totalReadingTime,
    },
    {
      articles: categorizedGuides.quiz.articles,
      title: intl.formatMessage({
        defaultMessage: 'Quiz Interviews',
        description:
          'Title for Quiz Interviews category of frontend interview playbook cover page',
        id: 'GAqip7',
      }),
      totalReadingTime: categorizedGuides.quiz.totalReadingTime,
    },
    {
      articles: categorizedGuides.resume.articles,
      title: intl.formatMessage({
        defaultMessage: 'Resume Preparation',
        description:
          'Title for Resume Preparation category of frontend interview playbook cover page',
        id: 'z3B/G3',
      }),
      totalReadingTime: categorizedGuides.resume.totalReadingTime,
    },
  ];

  const features = [
    {
      icon: RiFlowChart,
      label: intl.formatMessage({
        defaultMessage: 'End-to-end guide',
        description: 'Features for frontend interviews playbook page',
        id: 'nhMxxN',
      }),
    },
    {
      icon: RiShiningLine,
      label: intl.formatMessage({
        defaultMessage: 'Tips for all questions types',
        description: 'Features for frontend interviews playbook page',
        id: 'OBxxHX',
      }),
    },
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount}+ practice questions',
          description: 'Features for frontend interviews playbook page',
          id: '2NpESj',
        },
        {
          questionCount: QuestionCountTotal,
        },
      ),
    },
  ];

  return (
    <GuidesCoverLayout
      description={intl.formatMessage({
        defaultMessage: 'The definitive guide to front end interviews.',
        description: 'Description of frontend interview playbook page',
        id: 'M1ncAS',
      })}
      features={features}
      icon={RiBookOpenLine}
      longDescription={intl.formatMessage({
        defaultMessage:
          "Tackle your next interview with confidence using this focused, no-nonsense front end prep guide. Created by the author of the Front End Interview Handbook, it's filled with practical strategies and insider tips you won't find anywhere else.",
        description: 'Long description of frontend interview playbook page',
        id: 'ejhiw3',
      })}
      metadata={metadata}
      title={intl.formatMessage({
        defaultMessage: 'Front End Interview Playbook',
        description: 'Title of frontend interview playbook page',
        id: 'hclu+0',
      })}>
      <Section>
        <GuidesListWithCategory guides={guidesData} />
      </Section>
    </GuidesCoverLayout>
  );
}
