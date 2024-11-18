'use client';

import clsx from 'clsx';
import { sumBy } from 'lodash-es';
import {
  RiFlowChart,
  RiQuestionnaireLine,
  RiTerminalBoxLine,
  RiTerminalWindowLine,
} from 'react-icons/ri';

import GuidesCoverLayout from '~/components/guides/cover/GuidesCoverLayout';
import GuidesListWithCategory from '~/components/guides/cover/GuidesListWithCategory';
import type { GuideCardMetadata } from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsByAccess } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import QuestionListingAccessSummary from '~/components/interviews/questions/listings/stats/QuestionListingAccessSummary';
import { useIntl } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderEmphasizeColor } from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

type Props = Readonly<{
  allGuides: ReadonlyArray<GuideCardMetadata>;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function FrontEndSystemDesignPlaybookPage({
  allGuides,
  questions,
  questionCompletionCount,
  metadata,
}: Props) {
  const intl = useIntl();

  const guidesWithCompletionStatus = useGuidesWithCompletionStatus(allGuides);
  const questionsCount = countQuestionsByAccess(questions);

  const guidesData = [
    {
      articles: guidesWithCompletionStatus,
      title: intl.formatMessage({
        defaultMessage: 'Techniques and guides',
        description:
          'Title for introduction category of frontend system design playbook cover page',
        id: '5CaZLv',
      }),
      totalReadingTime: sumBy(guidesWithCompletionStatus, 'readingTime'),
    },
  ];

  const features = [
    {
      icon: RiTerminalBoxLine,
      label: intl.formatMessage({
        defaultMessage: 'Robust framework',
        description: 'Features for frontend system design playbook page',
        id: 'LpW2AE',
      }),
    },
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount}+ solved questions',
          description: 'Features for frontend system design playbook page',
          id: 'DmLCt5',
        },
        {
          questionCount: roundQuestionCountToNearestTen(questions.length),
        },
      ),
    },
    {
      icon: RiTerminalWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'Deep-dives into real-world applications',
        description: 'Features for frontend system design playbook page',
        id: 'K4JOjo',
      }),
    },
  ];

  return (
    <GuidesCoverLayout
      description={intl.formatMessage({
        defaultMessage:
          'The only guide you need for Front End System Design interviews',
        description: 'Description for frontend system design playbook page',
        id: 't+sX0U',
      })}
      features={features}
      icon={RiFlowChart}
      longDescription={
        <div className="flex flex-col gap-4">
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                "System design interviews are often reserved for mid-to-senior roles, focusing on your ability to design complex, scalable, and maintainable systems. With few resources out there specifically for front-end system design, we've crafted the Front-End System Design Guide—the most comprehensive resource available.",
              description:
                'Long description of frontend interview playbook page',
              id: '1ygaKJ',
            })}
          </Text>
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                "It's split into two parts: first, understanding what to expect in these interviews, and second, learning a reliable framework to tackle common challenges, complete with real case studies.",
              description:
                'Long description of frontend interview playbook page',
              id: 'Y9Lzdo',
            })}
          </Text>
        </div>
      }
      metadata={metadata}
      title={intl.formatMessage({
        defaultMessage: 'Front End System Design Playbook',
        description: 'Title of frontend system design playbook page',
        id: 'A0t3x6',
      })}>
      <Section>
        <div className="flex flex-col gap-10">
          <GuidesListWithCategory guides={guidesData} />
          <Divider />
          <Section>
            <div className="flex flex-col gap-6">
              <Heading level="heading5">
                {intl.formatMessage({
                  defaultMessage: 'Practice questions',
                  description:
                    'Title for questions section for frontend system design playbook page',
                  id: 'jQ6uOU',
                })}
              </Heading>
              <QuestionsUnifiedListWithFiltersAndProgress
                defaultSortField="difficulty"
                filterNamespace="system-design-format"
                questionCompletionCount={questionCompletionCount}
                questions={questions}
                sideColumnAddOn={
                  <div className="hidden lg:block">
                    <QuestionListingAccessSummary
                      {...questionsCount}
                      className={clsx('pb-10', [
                        'border-b',
                        themeBorderEmphasizeColor,
                      ])}
                    />
                  </div>
                }
              />
            </div>
          </Section>
        </div>
      </Section>
    </GuidesCoverLayout>
  );
}
