import { RiEyeLine, RiNodeTree } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type {
  MotivationReasonValue,
  RecommendedAction,
} from '~/components/projects/types';

export default function useProjectsRecommendedActions() {
  const intl = useIntl();

  const actions: Record<MotivationReasonValue, Array<RecommendedAction>> = {
    beginner: [
      {
        cta: intl.formatMessage({
          defaultMessage: 'Explore skill tree',
          description: 'CTA for beginner motivation',
          id: 'rByL/3',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'Build projects to train every front end skill from beginner to advanced',
          description: 'Description for beginner motivation',
          id: 'QPEzBY',
        }),
        icon: RiNodeTree,
        title: intl.formatMessage({
          defaultMessage: 'Build to learn',
          description: 'Title for beginner motivation',
          id: 'YmW2e9',
        }),
      },
      {
        cta: intl.formatMessage({
          defaultMessage: 'Explore community submissions',
          description: 'CTA for beginner motivation',
          id: 'NLxYcq',
        }),
        description: intl.formatMessage({
          defaultMessage: "View other's code and learn from their approach",
          description: 'Description for beginner motivation',
          id: 'TKf16+',
        }),
        icon: RiEyeLine,
        title: intl.formatMessage({
          defaultMessage: 'Learn from others',
          description: 'Title for beginner motivation',
          id: 'sBrxhD',
        }),
      },
    ],
    experienced: [
      {
        cta: intl.formatMessage({
          defaultMessage: 'Explore skills tree',
          description: 'CTA for experienced motivation',
          id: 'UAo3R9',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'Choose any modern stack and find recommended projects to practice',
          description: 'Description for experienced motivation',
          id: 'RoPJ/d',
        }),
        icon: RiNodeTree,
        title: intl.formatMessage({
          defaultMessage: 'Learn modern stacks',
          description: 'Title for experienced motivation',
          id: 'ZzACxp',
        }),
      },
      {
        cta: intl.formatMessage({
          defaultMessage: 'Explore community submissions',
          description: 'CTA for experienced motivation',
          id: 'Cyg2+o',
        }),
        description: intl.formatMessage({
          defaultMessage: "View other's code and learn from their approach",
          description: 'Description for experienced motivation',
          id: '/ZlhXN',
        }),
        icon: RiEyeLine,
        title: intl.formatMessage({
          defaultMessage: 'Learn from others',
          description: 'Title for experienced motivation',
          id: 'ufq3kp',
        }),
      },
    ],
    'mentor-others': [
      {
        cta: intl.formatMessage({
          defaultMessage: 'Review community submissions',
          description: 'CTA for mentor others motivation',
          id: 'CuAsoP',
        }),
        description: intl.formatMessage({
          defaultMessage: "Review other's project code and help them improve",
          description: 'Description for mentor others motivation',
          id: '6Xb3Kz',
        }),
        icon: RiNodeTree,
        title: intl.formatMessage({
          defaultMessage: 'Help others improve',
          description: 'Title for mentor others motivation',
          id: 'yIseuh',
        }),
      },
    ],
    other: [],
    portfolio: [
      {
        cta: intl.formatMessage({
          defaultMessage: 'Explore component tracks',
          description: 'CTA for portfolio motivation',
          id: 'B8VBwl',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'Build a whole component library or design system for your portfolio',
          description: 'Description for portfolio motivation',
          id: 'XlQVtN',
        }),
        icon: RiNodeTree,
        title: intl.formatMessage({
          defaultMessage: 'Component libraries for your portfolio',
          description: 'Title for portfolio motivation',
          id: 'cKaROL',
        }),
      },
      {
        cta: intl.formatMessage({
          defaultMessage: 'Explore community submissions',
          description: 'CTA for portfolio motivation',
          id: 'zPd3X5',
        }),
        description: intl.formatMessage({
          defaultMessage: "View other's code and learn from their approach",
          description: 'Description for portfolio motivation',
          id: 'h8R3U6',
        }),
        icon: RiEyeLine,
        title: intl.formatMessage({
          defaultMessage: 'Learn from others',
          description: 'Title for portfolio motivation',
          id: 'Vg4BgA',
        }),
      },
    ],
    'side-projects': [
      {
        cta: intl.formatMessage({
          defaultMessage: 'Explore component tracks',
          description: 'CTA for side projects motivation',
          id: 'qEn6fF',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'Speed up your side projects by building design systems or component libraries',
          description: 'Description for side projects motivation',
          id: 'mMJ7Dy',
        }),
        icon: RiNodeTree,
        title: intl.formatMessage({
          defaultMessage: 'Component libraries for your projects',
          description: 'Title for side projects motivation',
          id: '/YoEBO',
        }),
      },
      {
        cta: intl.formatMessage({
          defaultMessage: 'Explore community submissions',
          description: 'CTA for side projects motivation',
          id: '+pCFHL',
        }),
        description: intl.formatMessage({
          defaultMessage: "View other's code and learn from their approach",
          description: 'Description for side projects motivation',
          id: 'IK9Jmh',
        }),
        icon: RiNodeTree,
        title: intl.formatMessage({
          defaultMessage: 'Learn from others',
          description: 'Title for side projects motivation',
          id: 'SYA6jA',
        }),
      },
    ],
  };

  return actions;
}
