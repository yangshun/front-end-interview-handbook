'use client';

import {
  RiBookOpenLine,
  RiFlowChart,
  RiQuestionnaireLine,
  RiShiningLine,
} from 'react-icons/ri';

import GuidesCoverLayout from '~/components/guides/cover/GuidesCoverLayout';
import GuidesListWithCategory from '~/components/guides/cover/GuidesListWithCategory';
import type {
  FrontEndInterviewSlugType,
  GuideCardMetadata,
} from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import { useIntl } from '~/components/intl';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { categorizeGuides } from '~/db/guides/GuidesUtils';

type Props = Readonly<{
  allGuides: ReadonlyArray<GuideCardMetadata>;
}>;

export default function FrontEndInterviewPlaybookPage({
  allGuides,
}: Props) {
  const intl = useIntl();

  const categorizedGuideSlugs: Record<
    'coding' | 'introduction' | 'quiz' | 'resume' | 'system-design' | 'ui',
    ReadonlyArray<FrontEndInterviewSlugType>
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
        defaultMessage: 'Tips  for all questions types',
        description: 'Features for frontend interviews playbook page',
        id: 'CmOrKy',
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
          questionCount: 200, // TODO(interviews): need to re-look into this value
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
      longDescription={
        <div className="flex flex-col gap-4">
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                "Front end interviews are notoriously unpredictable, with no universal standard across companies. Each interview can vary greatly in focus, from coding challenges to quizzes about the inner workings of React. Recognizing this, we've organized a preparation guide that reflects the most common practices in front end interviews today.",
              description:
                'Long description of frontend interview playbook page',
              id: 'Qr0tcR',
            })}
          </Text>
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                'Written by the author of Front End Interview Handbook, our guide offers valuable insights into what you should be ready for, covering key areas most likely to come up during your interview. From understanding the types of questions you might face to strategic tips on how to prepare for them, we distill the best advice and preparation strategies so you can confidently approach your next interview.',
              description:
                'Long description of frontend interview playbook page',
              id: 'gRSa2L',
            })}
          </Text>
        </div>
      }
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
