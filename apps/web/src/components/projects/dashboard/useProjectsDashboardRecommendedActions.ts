import { RiEyeLine, RiNodeTree } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type {
  ProjectsMotivationReasonValue,
  ProjectsRecommendedAction,
} from '~/components/projects/types';

export default function useProjectsDashboardRecommendedActions() {
  const intl = useIntl();

  const exploreSkillsRoadmapAction = {
    cta: intl.formatMessage({
      defaultMessage: 'Explore skills roadmap',
      description: 'Recommended action for new projects platform user',
      id: 'Dzv5LY',
    }),
    description: intl.formatMessage({
      defaultMessage:
        'Build projects to train every front end skill from beginner to advanced',
      description:
        'Description for recommended action for new projects platform user',
      id: 'QjQj5L',
    }),
    href: '/projects/skills',
    icon: RiNodeTree,
    title: intl.formatMessage({
      defaultMessage: 'Build to learn',
      description:
        'Title for recommended action for new projects platform user',
      id: 'dHaRPA',
    }),
  };
  const exploreCommunitySubmissionsAction = {
    cta: intl.formatMessage({
      defaultMessage: 'Explore community submissions',
      description: 'Recommended action for new projects platform user',
      id: 'H/xTN5',
    }),
    description: intl.formatMessage({
      defaultMessage: "View other's code and learn from their approach",
      description:
        'Description for recommended action for new projects platform user',
      id: 'vLdUUt',
    }),
    href: '/projects/submissions',
    icon: RiEyeLine,
    title: intl.formatMessage({
      defaultMessage: 'Learn from others',
      description:
        'Title for recommended action for new projects platform user',
      id: 'rR79ua',
    }),
  };
  const reviewCommunitySubmissionsAction = {
    cta: intl.formatMessage({
      defaultMessage: 'Review community submissions',
      description: 'Recommended action for new projects platform user',
      id: '9RYs96',
    }),
    description: intl.formatMessage({
      defaultMessage: "Review other's project code and help them improve",
      description:
        'Description for recommended action for new projects platform user',
      id: 'Z3Z5Fp',
    }),
    href: '/projects/submissions/mentor',
    icon: RiNodeTree,
    title: intl.formatMessage({
      defaultMessage: 'Help others improve',
      description:
        'Title for recommended action for new projects platform user',
      id: 'ub441I',
    }),
  };
  const exploreComponentTracksAction = {
    cta: intl.formatMessage({
      defaultMessage: 'Explore component tracks',
      description: 'Recommended action for new projects platform user',
      id: 'QeQWqZ',
    }),
    description: intl.formatMessage({
      defaultMessage:
        'Build a whole component library or design system for your portfolio',
      description:
        'Description for recommended action for new projects platform user',
      id: 'kj9QHG',
    }),
    href: '/projects/tracks',
    icon: RiNodeTree,
    title: intl.formatMessage({
      defaultMessage: 'Component libraries for your portfolio',
      description:
        'Title for recommended action for new projects platform user',
      id: 'jYsoqB',
    }),
  };

  const actions: Record<
    ProjectsMotivationReasonValue,
    Array<ProjectsRecommendedAction>
  > = {
    beginner: [exploreSkillsRoadmapAction, exploreCommunitySubmissionsAction],
    'mentor-others': [reviewCommunitySubmissionsAction],
    other: [],
    portfolio: [
      exploreComponentTracksAction,
      exploreCommunitySubmissionsAction,
    ],
    'side-projects': [
      exploreComponentTracksAction,
      exploreCommunitySubmissionsAction,
    ],
    skill: [exploreSkillsRoadmapAction, exploreCommunitySubmissionsAction],
  };

  return actions;
}
