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
  const items: Record<GuideType, GuideData> = {
    'behavioral-interview-guidebook': {
      description:
        'Efficient strategies to prepare and ace behavioral interviews.',
      href: behavioralInterviewGuidebookBasePath,
      icon: ChatBubbleLeftIcon,
      key: 'big',
      name: 'Behavioral Interview Guidebook',
    },
    'front-end-interview-guidebook': {
      description:
        'The definitive guide to front end / web developer interviews.',
      href: frontEndInterviewGuidebookBasePath,
      icon: BookOpenIcon,
      key: 'feig',
      name: 'Front End Interview Guidebook',
    },
    'front-end-system-design-guidebook': {
      description:
        'Guide to preparing for Front End-focused System Design questions in front end / web developer interviews',
      href: '/system-design',
      icon: CubeIcon,
      key: 'fesdg',
      name: 'Front End System Design Guidebook',
    },
  };

  return items;
}
