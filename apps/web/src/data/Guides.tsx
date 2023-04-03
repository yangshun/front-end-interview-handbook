import { useIntl } from 'react-intl';

import { basePath as behavioralInterviewGuidebookBasePath } from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import { basePath as frontEndInterviewGuidebookBasePath } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';

import {
  BookOpenIcon,
  ChatBubbleLeftIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';

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
      icon: ChatBubbleLeftIcon,
      key: 'big',
      name: intl.formatMessage({
        defaultMessage: 'Behavioral Interview Guidebook',
        description: 'Title for behavioral interview guidebook',
        id: '6fAxyB',
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
      icon: BookOpenIcon,
      key: 'feig',
      name: intl.formatMessage({
        defaultMessage: 'Front End Interview Guidebook',
        description: 'Front End Interview Guidebook title',
        id: 'w0Gmne',
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
      icon: CubeIcon,
      key: 'fesdg',
      name: intl.formatMessage({
        defaultMessage: 'Front End System Design Guidebook',
        description: 'Front end system design guidebook title',
        id: 'NdDD5W',
      }),
    },
  };

  return items;
}
