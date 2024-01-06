import type React from 'react';
import {
  RiNodeTree,
  RiParentLine,
  RiQuestionLine,
  RiRocketLine,
  RiSparklingLine,
  RiStarLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type {
  MotivationReasonOption,
  MotivationReasonValue,
} from '~/components/projects/types';

export default function useProjectsMotivationReasonOptions(
  bold?: (chunks: Array<React.ReactNode>) => React.ReactNode | undefined,
) {
  const intl = useIntl();
  const reasons: Record<MotivationReasonValue, string> = {
    beginner: intl.formatMessage({
      defaultMessage:
        'Want to learn skills for practical front end development',
      description: 'Motivation label for beginner reason',
      id: 'nvBKGE',
    }),
    experienced: intl.formatMessage({
      defaultMessage:
        'Want to bridge some skill gaps in modern front end or full stack',
      description: 'Motivation level for experienced reason',
      id: 'C0dq+J',
    }),
    'mentor-others': intl.formatMessage({
      defaultMessage: 'Want to help mentor others',
      description: 'Motivation level for mentor others reason',
      id: 'r14As6',
    }),
    other: intl.formatMessage({
      defaultMessage: 'Other',
      description: 'Motivation level for other reason',
      id: 'A/9dZ7',
    }),
    portfolio: intl.formatMessage({
      defaultMessage: 'Want to build my portfolio',
      description: 'Motivation level for portfolio reason',
      id: '4Q3JMg',
    }),
    'side-projects': intl.formatMessage({
      defaultMessage: 'Want to build my side projects',
      description: 'Motivation level for side projects reason',
      id: 'LLsMT8',
    }),
  };
  const reasonOptions: Array<MotivationReasonOption> = [
    {
      content: bold
        ? intl.formatMessage(
            {
              defaultMessage:
                "I'm a <bold>beginner</bold> and want to learn skills for practical front end development",
              description: 'Label for "Beginner" onboarding option in Projects',
              id: 'cJY5Ir',
            },
            { bold },
          )
        : intl.formatMessage({
            defaultMessage:
              "I'm a beginner and want to learn skills for practical front end development",
            description: 'Label for "Beginner" onboarding option in Projects',
            id: 'C70QCF',
          }),
      icon: RiRocketLine,
      id: 'beginner',
      label: reasons.beginner,
    },
    {
      content: bold
        ? intl.formatMessage(
            {
              defaultMessage:
                "I'm <bold>experienced</bold> and here to bridge some skill gaps in modern front end or full stack",
              description:
                'Label for "Experienced" onboarding option in Projects',
              id: 'uCyL/V',
            },
            { bold },
          )
        : intl.formatMessage({
            defaultMessage:
              "I'm experienced and here to bridge some skill gaps in modern front end or full stack",
            description:
              'Label for "Experienced" onboarding option in Projects',
            id: 'R22hcT',
          }),
      icon: RiNodeTree,
      id: 'experienced',
      label: reasons.experienced,
    },
    {
      content: bold
        ? intl.formatMessage(
            {
              defaultMessage: "I'm here to build my <bold>portfolio</bold>",
              description:
                'Label for "Portfolio" onboarding option in Projects',
              id: 'k08Rfb',
            },
            { bold },
          )
        : intl.formatMessage({
            defaultMessage: "I'm here to build my portfolio",
            description: 'Label for "Portfolio" onboarding option in Projects',
            id: 'IQEeSq',
          }),
      icon: RiSparklingLine,
      id: 'portfolio',
      label: reasons.portfolio,
    },
    {
      content: bold
        ? intl.formatMessage(
            {
              defaultMessage: "I'm here to build my <bold>side projects</bold>",
              description:
                'Label for "Side projects" onboarding option in Projects',
              id: '6nt/n6',
            },
            { bold },
          )
        : intl.formatMessage({
            defaultMessage: "I'm here to build my side projects",
            description:
              'Label for "Side projects" onboarding option in Projects',
            id: 'jeWrES',
          }),
      icon: RiStarLine,
      id: 'side-projects',
      label: reasons['side-projects'],
    },
    {
      content: bold
        ? intl.formatMessage(
            {
              defaultMessage: 'I want to help <bold>mentor others</bold>',
              description:
                'Label for "Mentor others" onboarding option in Projects',
              id: '13CKZ1',
            },
            { bold },
          )
        : intl.formatMessage({
            defaultMessage: 'I want to help mentor others',
            description:
              'Label for "Mentor others" onboarding option in Projects',
            id: 'c9nv1K',
          }),
      icon: RiParentLine,
      id: 'mentor-others',
      label: reasons['mentor-others'],
    },
    {
      content: intl.formatMessage({
        defaultMessage: 'Other',
        description: 'Label for "Other" onboarding option in Projects',
        id: 'Zdojj9',
      }),
      icon: RiQuestionLine,
      id: 'other',
      label: reasons.other,
    },
  ];

  return { reasonOptions, reasons };
}
