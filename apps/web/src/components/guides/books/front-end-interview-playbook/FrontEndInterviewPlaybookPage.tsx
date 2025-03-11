'use client';

import {
  RiBookOpenLine,
  RiFlowChart,
  RiQuestionnaireLine,
  RiShiningLine,
} from 'react-icons/ri';

import { useFrontEndInterviewPlaybookNavigation } from '~/components/guides/books/front-end-interview-playbook/FrontEndInterviewPlaybookNavigation';
import GuidesCoverLayout from '~/components/guides/cover/GuidesCoverLayout';
import GuidesListWithCategory from '~/components/guides/cover/GuidesListWithCategory';
import type { GuideCardMetadata } from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';
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

export default function FrontEndInterviewPlaybookPage({
  allGuides,
  metadata,
}: Props) {
  const intl = useIntl();

  const guidesWithCompletionStatus = useGuidesWithCompletionStatus(allGuides);
  const navigation = useFrontEndInterviewPlaybookNavigation();
  const guideItems = processForGuidesCover(
    navigation,
    guidesWithCompletionStatus,
  );

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
        <GuidesListWithCategory guideItems={guideItems} />
      </Section>
    </GuidesCoverLayout>
  );
}
