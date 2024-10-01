import type React from 'react';
import {
  RiNodeTree,
  RiParentLine,
  RiQuestionLine,
  RiRocketLine,
  RiSparklingLine,
  RiStarLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { ProjectsMotivationReasonOption } from '~/components/projects/types';

export default function useProjectsMotivationReasonOptions(
  keywords: (chunks: Array<React.ReactNode>) => React.ReactNode | undefined,
) {
  const intl = useIntl();

  const reasonOptions: Array<ProjectsMotivationReasonOption> = [
    {
      icon: RiRocketLine,
      id: 'beginner',
      label: intl.formatMessage(
        {
          defaultMessage: 'To learn <keywords>front end</keywords>',
          description: 'Onboarding motivation option',
          id: 'WZ5zPh',
        },
        { keywords },
      ),
    },
    {
      icon: RiNodeTree,
      id: 'skill',
      label: intl.formatMessage(
        {
          defaultMessage: 'To bridge <keywords>skill gaps</keywords>',
          description: 'Onboarding motivation option',
          id: 'z06VRE',
        },
        { keywords },
      ),
    },
    {
      icon: RiSparklingLine,
      id: 'portfolio',
      label: intl.formatMessage(
        {
          defaultMessage: 'To build my <keywords>portfolio</keywords>',
          description: 'Onboarding motivation option',
          id: 'snxYFd',
        },
        { keywords },
      ),
    },
    {
      icon: RiStarLine,
      id: 'side-projects',
      label: intl.formatMessage(
        {
          defaultMessage: 'To build <keywords>side projects</keywords>',
          description: 'Onboarding motivation option',
          id: 'MNAkQc',
        },
        { keywords },
      ),
    },
    {
      icon: RiParentLine,
      id: 'mentor-others',
      label: intl.formatMessage(
        {
          defaultMessage: 'To help <keywords>mentor others</keywords>',
          description:
            'Label for "Mentor others" onboarding option in Projects',
          id: '+kyQ/i',
        },
        { keywords },
      ),
    },
    {
      icon: RiQuestionLine,
      id: 'other',
      label: intl.formatMessage({
        defaultMessage: 'Other',
        description: 'Label for "Other" onboarding option in Projects',
        id: 'Zdojj9',
      }),
    },
  ];

  return reasonOptions;
}
