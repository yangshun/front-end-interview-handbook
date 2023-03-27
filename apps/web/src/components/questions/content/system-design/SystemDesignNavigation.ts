import type {
  BaseGuideNavigationLink,
  GuideNavigation,
} from '~/components/guides/GuidesLayoutSidebar';

import SystemDesignQuestionList from '~/__generated__/questions/system-design/list.en.json';

import type { QuestionMetadata } from '../../common/QuestionsTypes';

export type SystemDesignNavigationLink = BaseGuideNavigationLink<{
  premium: boolean;
  type: 'guide' | 'question';
}>;

type NavigationLinks = ReadonlyArray<SystemDesignNavigationLink>;

export const ReadyQuestions: ReadonlyArray<string> = [
  'autocomplete',
  'news-feed-facebook',
  'poll-widget',
  'image-carousel',
  'photo-sharing-instagram',
  'e-commerce-amazon',
  'chat-application-messenger',
  'travel-booking-airbnb',
  'email-client-outlook',
  'dropdown-menu',
  'modal-dialog',
];

export const allSystemDesignQuestions = (
  SystemDesignQuestionList as ReadonlyArray<QuestionMetadata>
)
  .slice()
  .sort((a, b) => a.ranking - b.ranking);
export const readySystemDesignQuestions = allSystemDesignQuestions.filter(
  (question) => ReadyQuestions.includes(question.slug),
);

function useSystemDesignIntroduction() {
  const systemDesignIntroduction: NavigationLinks = [
    {
      description: 'What to expect for Front End System Design interviews',
      href: '/system-design',
      premium: false,
      slug: 'introduction',
      title: 'Intro to System Design',
      type: 'guide',
    },
  ];

  return systemDesignIntroduction;
}

function useSystemDesignGuides() {
  const systemDesignGuides: NavigationLinks = [
    {
      description: 'Overview of various question formats',
      href: '/system-design/types-of-questions',
      premium: false,
      slug: 'types-of-questions',
      title: 'Types of Questions',
      type: 'guide',
    },
    {
      description: 'A structured way to approach system design questions',
      href: '/system-design/framework',
      premium: false,
      slug: 'framework',
      title: 'RADIO Framework',
      type: 'guide',
    },
    {
      description: 'What interviewers are looking for',
      href: '/system-design/evaluation-axes',
      premium: true,
      slug: 'evaluation-axes',
      title: 'Evaluation Axes',
      type: 'guide',
    },
    {
      description: '6 common mistakes you should avoid.',
      href: '/system-design/common-mistakes',
      premium: true,
      slug: 'common-mistakes',
      title: 'Common Mistakes',
      type: 'guide',
    },
    {
      description: 'Summary of all the important things in a one-pager',
      href: '/system-design/cheatsheet',
      premium: true,
      slug: 'cheatsheet',
      title: 'Cheatsheet',
      type: 'guide',
    },
  ];

  return systemDesignGuides;
}

export function useSystemDesignLearningContent() {
  const systemDesignIntroduction = useSystemDesignIntroduction();
  const systemDesignGuides = useSystemDesignGuides();

  const systemDesignLearningContent = [
    ...systemDesignIntroduction,
    ...systemDesignGuides,
  ];

  return systemDesignLearningContent;
}

export function useSystemDesignNavigation() {
  const systemDesignIntroduction = useSystemDesignIntroduction();
  const systemDesignGuides = useSystemDesignGuides();

  const navigation: GuideNavigation<SystemDesignNavigationLink> = {
    items: [
      {
        links: systemDesignIntroduction,
        title: 'Overview',
      },
      {
        links: systemDesignGuides,
        title: 'How to Prepare',
      },
      {
        links: readySystemDesignQuestions.map((question) => ({
          href: question.href,
          premium: question.premium,
          slug: question.slug,
          title: question.title,
          type: 'question',
        })),
        title: 'Questions',
      },
      {
        links: allSystemDesignQuestions
          .slice()
          .sort((a, b) => a.ranking - b.ranking)
          .filter((question) => !ReadyQuestions.includes(question.slug))
          .map((question) => ({
            href: question.href,
            premium: question.premium,
            slug: question.slug,
            title: question.title,
            type: 'question',
          })),
        title: 'Coming Soon',
      },
    ],
    title: 'Front End System Design Guidebook',
  };

  return navigation;
}
