import {
  RiBookOpenLine,
  RiFlowChart,
  RiQuestionAnswerLine,
} from 'react-icons/ri';

import { basePath as behavioralInterviewPlaybookBasePath } from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import { basePath as frontEndInterviewPlaybookBasePath } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import { basePath as frontEndSystemDesignPlaybookBasePath } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';
import { useIntl } from '~/components/intl';

type GuideType =
  | 'behavioral-interview-playbook'
  | 'front-end-interview-playbook'
  | 'front-end-system-design-playbook';

type GuideData = Readonly<{
  description: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  name: string;
  shortName: string;
}>;

export function useGuidesData() {
  const intl = useIntl();

  const items: Record<GuideType, GuideData> = {
    'behavioral-interview-playbook': {
      description: intl.formatMessage({
        defaultMessage:
          'The only behavioral interview guide written specifically for front end engineers.',
        description: 'Behavioral interview guidebook description',
        id: 'MV8xp3',
      }),
      href: behavioralInterviewPlaybookBasePath,
      icon: RiQuestionAnswerLine,
      key: 'big',
      name: intl.formatMessage({
        defaultMessage: 'Behavioral Interview Playbook',
        description: 'Title for behavioral interview guide',
        id: 'eWWazl',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Behavioral Interview',
        description: 'Short title for behavioral interview playbook',
        id: 'xBNYLl',
      }),
    },
    'front-end-interview-playbook': {
      description: intl.formatMessage({
        defaultMessage:
          'The definitive guide to preparing for Front End Interviews, written by the author of Front End Interview Handbook.',
        description: 'Front end interview guidebook description',
        id: 'XtKx03',
      }),
      href: frontEndInterviewPlaybookBasePath,
      icon: RiBookOpenLine,
      key: 'feig',
      name: intl.formatMessage({
        defaultMessage: 'Front End Interview Playbook',
        description: 'Front End Interview guide title',
        id: 'PqBXo4',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Front End Interview',
        description: 'Short title for Front End Interview Playbook',
        id: '5DLanP',
      }),
    },
    'front-end-system-design-playbook': {
      description: intl.formatMessage({
        defaultMessage:
          'The most comprehensive guide to Front End System Design Interviews you can find.',
        description: 'Front end system design guidebook description',
        id: 'jm+fR2',
      }),
      href: frontEndSystemDesignPlaybookBasePath,
      icon: RiFlowChart,
      key: 'fesdg',
      name: intl.formatMessage({
        defaultMessage: 'Front End System Design Playbook',
        description: 'Front end system design guidebook title',
        id: 'FyfO1X',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Front End System Design',
        description: 'Short title of front end system design playbook',
        id: 'owQqZY',
      }),
    },
  };

  return items;
}
