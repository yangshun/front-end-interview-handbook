import {
  RiBookOpenLine,
  RiFlowChart,
  RiQuestionAnswerLine,
} from 'react-icons/ri';

import { basePath as behavioralInterviewGuidebookBasePath } from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import { basePath as frontEndInterviewGuidebookBasePath } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import { useIntl } from '~/components/intl';

type GuideType =
  | 'behavioral-interview-guidebook'
  | 'front-end-interview-guidebook'
  | 'front-end-system-design-guidebook';

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
    'behavioral-interview-guidebook': {
      description: intl.formatMessage({
        defaultMessage:
          'The only behavioral interview guide written specifically for front end engineers.',
        description: 'Behavioral interview guidebook description',
        id: 'MV8xp3',
      }),
      href: behavioralInterviewGuidebookBasePath,
      icon: RiQuestionAnswerLine,
      key: 'big',
      name: intl.formatMessage({
        defaultMessage: 'Behavioral Interview Playbook',
        description: 'Title for behavioral interview playbook',
        id: 'Y072iD',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Behavioral Interview',
        description: 'Short title for behavioral interview playbook',
        id: 'xBNYLl',
      }),
    },
    'front-end-interview-guidebook': {
      description: intl.formatMessage({
        defaultMessage:
          'The definitive guide to preparing for Front End Interviews, written by the author of Front End Interview Handbook.',
        description: 'Front end interview guidebook description',
        id: 'XtKx03',
      }),
      href: frontEndInterviewGuidebookBasePath,
      icon: RiBookOpenLine,
      key: 'feig',
      name: intl.formatMessage({
        defaultMessage: 'Front End Interview Playbook',
        description: 'Front End Interview Playbook title',
        id: 'd1mCvP',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Front End Interview',
        description: 'Short title for Front End Interview Playbook',
        id: '5DLanP',
      }),
    },
    'front-end-system-design-guidebook': {
      description: intl.formatMessage({
        defaultMessage:
          'The most comprehensive guide to Front End System Design Interviews you can find.',
        description: 'Front end system design guidebook description',
        id: 'jm+fR2',
      }),
      href: '/system-design',
      icon: RiFlowChart,
      key: 'fesdg',
      name: intl.formatMessage({
        defaultMessage: 'Front End System Design Guidebook',
        description: 'Front end system design guidebook title',
        id: 'NdDD5W',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Front End System Design',
        description: 'Short title of front end system design guidebook',
        id: 'TRWLN8',
      }),
    },
  };

  return items;
}
