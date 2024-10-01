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
          'Efficient strategies to prepare and ace behavioral interviews.',
        description: 'Behavioral interview guidebook description',
        id: 'drvlbZ',
      }),
      href: behavioralInterviewGuidebookBasePath,
      icon: RiQuestionAnswerLine,
      key: 'big',
      name: intl.formatMessage({
        defaultMessage: 'Behavioral Interview Guidebook',
        description: 'Title for behavioral interview guidebook',
        id: '6fAxyB',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Behavioral Interview',
        description: 'Short title for behavioral interview guidebook',
        id: 'DP3Y2U',
      }),
    },
    'front-end-interview-guidebook': {
      description: intl.formatMessage({
        defaultMessage:
          'The definitive guide to front end / web developer interviews.',
        description: 'Front end interview guidebook description',
        id: 'ee862n',
      }),
      href: frontEndInterviewGuidebookBasePath,
      icon: RiBookOpenLine,
      key: 'feig',
      name: intl.formatMessage({
        defaultMessage: 'Front End Interview Guidebook',
        description: 'Front End Interview Guidebook title',
        id: 'w0Gmne',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Front End Interview',
        description: 'Short title for Front End Interview Guidebook',
        id: '9wRhlQ',
      }),
    },
    'front-end-system-design-guidebook': {
      description: intl.formatMessage({
        defaultMessage:
          'Guide to preparing for Front End-focused System Design questions in front end / web developer interviews',
        description: 'Front end system design guidebook description',
        id: 'bWymcE',
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
