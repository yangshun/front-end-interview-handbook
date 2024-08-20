import {
  RiBriefcase2Line,
  RiLightbulbLine,
  RiLineChartLine,
  RiPlayFill,
  RiQuestionAnswerLine,
  RiQuestionnaireLine,
  RiShakeHandsLine,
  RiUserSmileLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { GuideNavigation } from './types';

export const basePath = '/behavioral-interview-guidebook';

export default function useBehavioralInterviewGuidebookNavigation() {
  const intl = useIntl();
  const navigation: GuideNavigation = {
    items: [
      {
        links: [
          {
            description: intl.formatMessage({
              defaultMessage:
                'What to expect and how to prepare most efficiently',
              description: 'What to expect in behavioral interviews',
              id: 'hESyRg',
            }),
            href: basePath,
            icon: RiPlayFill,
            slug: 'introduction',
            title: intl.formatMessage({
              defaultMessage: 'Intro to Behavioral Round',
              description: 'Introduction to behavioral interviews',
              id: 'jTXr+7',
            }),
          },
          {
            description: intl.formatMessage({
              defaultMessage:
                'Top 20+ common behavioral interview questions for SWE',
              description:
                'Most common behavioral interview questions for software engineers',
              id: 'RQRPBv',
            }),
            href: `${basePath}/questions`,
            icon: RiQuestionAnswerLine,
            slug: 'common-interview-questions',
            title: intl.formatMessage({
              defaultMessage: 'Most Common Questions',
              description: 'Most common behavioral interview questions',
              id: '8yQk1V',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Overview',
          description: 'Overview of behavioral interview',
          id: 'OWKf+S',
        }),
      },
      {
        links: [
          {
            description: intl.formatMessage({
              defaultMessage:
                'Tips for making a strong first impression in your self introduction',
              description:
                'How to make strong first impressions during self introductions',
              id: 'GZnl60',
            }),
            href: `${basePath}/self-introduction`,
            icon: RiUserSmileLine,
            slug: 'self-introduction',
            title: intl.formatMessage({
              defaultMessage: 'Answering "Tell Me About Yourself"',
              description:
                'How to answer the self introduction question in behavioral interviews',
              id: 'oNbAS2',
            }),
          },
          {
            description: intl.formatMessage({
              defaultMessage:
                'Tips for answering questions on your motivation to join the role',
              description:
                'How to answer motivation questions in behavioral interviews',
              id: 'MWe9uf',
            }),
            href: `${basePath}/why-work-here`,
            icon: RiBriefcase2Line,
            slug: 'why-work-here',
            title: intl.formatMessage({
              defaultMessage: 'Answering "Why Work Here"',
              description:
                'How to answer the "why work here" question in behavioral interviews',
              id: 'iCRUOb',
            }),
          },
          {
            description: intl.formatMessage({
              defaultMessage:
                'Learn to ask insightful questions at the end of the interview',
              description:
                'How to ask insightful questions during behavioral interviews',
              id: 'U9XHwD',
            }),
            href: `${basePath}/questions-to-ask`,
            icon: RiQuestionnaireLine,
            slug: 'questions-to-ask',
            title: intl.formatMessage({
              defaultMessage: 'Questions to Ask (End of Interview)',
              description:
                'Best questions to ask at the end of a behavioral interviews',
              id: '+59/34',
            }),
          },
          {
            description: intl.formatMessage({
              defaultMessage:
                'Learn to answer "Tell me about a time.." problem solving questions',
              description:
                'How to answer problem solving situation questions in behavioral interviews',
              id: 'q0mkGb',
            }),
            href: `${basePath}/problem-solving`,
            icon: RiLightbulbLine,
            slug: 'problem-solving',
            title: intl.formatMessage({
              defaultMessage: 'Problem Solving Questions',
              description:
                'Title for sidebar on problem solving situation questions in behavioral interviews',
              id: 'D5IZKC',
            }),
          },
          {
            description: intl.formatMessage({
              defaultMessage:
                'Learn to answer "Tell me about a time.." collaboration questions',
              description:
                'How to answer collaboration situation questions in behavioral interviews',
              id: 'HcBvYZ',
            }),
            href: `${basePath}/collaboration`,
            icon: RiShakeHandsLine,
            slug: 'collaboration',
            title: intl.formatMessage({
              defaultMessage: 'Collaboration Questions',
              description:
                'Title for sidebar on collaboration situation questions in behavioral interviews',
              id: '0GjR/X',
            }),
          },
          {
            description: intl.formatMessage({
              defaultMessage:
                'Learn to answer "Tell me about a time.." growth mindset questions',
              description:
                'How to answer growth mindset collaboration questions',
              id: 'Ldysd3',
            }),
            href: `${basePath}/growth-mindset`,
            icon: RiLineChartLine,
            slug: 'growth-mindset',
            title: intl.formatMessage({
              defaultMessage: 'Growth Mindset Questions',
              description: 'Title for growth mindset collaboration questions',
              id: '7Korc4',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Solving Common Questions',
          description: 'Title for solving common behavioral questions section',
          id: 'EHPx/Z',
        }),
      },
    ],
    title: intl.formatMessage({
      defaultMessage: 'Behavioral Interview Guidebook',
      description: 'Title for behavioral interview guidebook',
      id: '6fAxyB',
    }),
  };

  return navigation;
}
