import type { GuideNavigation } from './GuidesLayoutSidebar';

export const basePath = '/behavioral-interview-guidebook';

export default function useBehavioralInterviewGuidebookNavigation() {
  const navigation: GuideNavigation = {
    items: [
      {
        links: [
          {
            description: 'What to expect and how to prepare most efficiently',
            href: basePath,
            slug: 'introduction',
            title: 'Intro to Behavioral Round',
          },
          {
            description:
              'Top 20+ common behavioral interview questions for SWE',
            href: `${basePath}/questions`,
            slug: 'common-interview-questions',
            title: 'Most Common Questions',
          },
        ],
        title: 'Overview',
      },
      {
        links: [
          {
            description:
              'Tips for making a strong first impression in your self introduction',
            href: `${basePath}/self-introduction`,
            slug: 'self-introduction',
            title: 'Answering "Tell Me About Yourself"',
          },
          {
            description:
              'Tips for answering questions on your motivation to join the role',
            href: `${basePath}/why-work-here`,
            slug: 'why-work-here',
            title: 'Answering "Why Work Here"',
          },
          {
            description:
              'Learn to ask insightful questions at the end of the interview',
            href: `${basePath}/questions-to-ask`,
            slug: 'questions-to-ask',
            title: 'Questions to Ask (End of Interview)',
          },
          {
            description:
              'Learn to answer "Tell me about a time.." problem-solving questions',
            href: `${basePath}/problem-solving`,
            slug: 'problem-solving',
            title: 'Problem Solving Questions',
          },
          {
            description:
              'Learn to answer "Tell me about a time.." collaboration questions',
            href: `${basePath}/collaboration`,
            slug: 'collaboration',
            title: 'Collaboration Questions',
          },
          {
            description:
              'Learn to answer "Tell me about a time.." growth mindset questions',
            href: `${basePath}/growth-mindset`,
            slug: 'growth-mindset',
            title: 'Growth Mindset Questions',
          },
        ],
        title: 'Solving Common Questions',
      },
    ],
    title: 'Behavioral Interview Guidebook',
  };

  return navigation;
}
