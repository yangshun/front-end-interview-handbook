'use client';

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
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { useIntl } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

import type { QuestionMetadata } from '../questions/common/QuestionsTypes';

type Props = Readonly<{
  allGuides: ReadonlyArray<GuideCardMetadata>;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function FrontEndSystemDesignPlaybookPage({
  allGuides,
  questions,
  questionCompletionCount,
}: Props) {
  const intl = useIntl();

  const guidesWithCompletionStatus = useGuidesWithCompletionStatus(allGuides);

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
                "System design interviews are typically conducted for mid-level to senior positions. These interviews assess a candidate's ability to design complex, scalable, and maintainable systems.",
              description:
                'Long description of frontend system design playbook page',
              id: 'uZk0CY',
            })}
          </Text>
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                "There are currently very few resources available for front-end system design. To address this issue, we've invested significant effort into creating the most comprehensive guide on the market - the Front-End System Design Guide.",
              description:
                'Long description of frontend system design playbook page',
              id: 'OCgyrM',
            })}
          </Text>
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                "This guide is structured into two parts. First, you will gain a deeper understanding of what to expect in these interviews. Then, you will learn a robust framework that you can reliably use to solve most problems, and you'll apply it to real case studies.",
              description:
                'Long description of frontend system design playbook page',
              id: 'L6yVhS',
            })}
          </Text>
        </div>
      }
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
                filterNamespace="system-design-format"
                questionCompletionCount={questionCompletionCount}
                questions={questions}
              />
            </div>
          </Section>
        </div>
      </Section>
    </GuidesCoverLayout>
  );
}
