import {
  RiCodeBoxFill,
  RiFlowChart,
  RiQuestionnaireFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import AngularLogo from '~/components/icons/AngularLogo';
import CSS3LogoMonochrome from '~/components/icons/CSS3LogoMonochrome';
import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogoMonochrome from '~/components/icons/JavaScriptLogoMonochrome';
import ReactLogo from '~/components/icons/ReactLogo';
import VueLogoMonochrome from '~/components/icons/VueLogoMonochrome';
import type { QuestionUserFacingFormat } from '~/components/questions/common/QuestionsTypes';
import {
  themeGradientBlueGreen,
  themeGradientGreenYellow,
  themeGradientPinkPurple,
} from '~/components/ui/theme';

type QuestionListLink = Readonly<{
  description?: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  longName: string;
  name: string;
  searchPlaceholder: string;
  themeGradient?: string;
}>;
type QuestionFormatLists<C extends string> = Record<C, QuestionListLink>;

export function useQuestionFormatLists() {
  const intl = useIntl();
  const questionFormatLists: QuestionFormatLists<QuestionUserFacingFormat> = {
    coding: {
      description: intl.formatMessage({
        defaultMessage: 'JS functions, algorithms, building components, etc.',
        description: 'Description of coding questions',
        id: 'uDUEmN',
      }),
      href: '/prepare/coding',
      icon: RiCodeBoxFill,
      key: 'coding',
      longName: intl.formatMessage({
        defaultMessage: 'Coding Questions',
        description: 'Coding questions long title',
        id: 'UCt/lF',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Coding',
        description: 'Coding questions short title',
        id: 'VQfbK1',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search coding questions',
        description: 'Placeholder for search input of coding question list',
        id: 'jGQnYd',
      }),
      themeGradient: themeGradientBlueGreen.className,
    },
    quiz: {
      description: intl.formatMessage({
        defaultMessage:
          'Trivia-style questions on essential front end know-how',
        description: 'Description of quiz questions',
        id: 'HDsjyG',
      }),
      href: '/prepare/quiz',
      icon: RiQuestionnaireFill,
      key: 'quiz',
      longName: intl.formatMessage({
        defaultMessage: 'Quiz Questions',
        description: 'Quiz questions long title',
        id: 'JhZ/aF',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Quiz questions short title',
        id: '7Wsapt',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search quiz questions',
        description: 'Placeholder for search input of quiz question list',
        id: 'YbRLG7',
      }),
      themeGradient: themeGradientGreenYellow.className,
    },
    'system-design': {
      description: intl.formatMessage({
        defaultMessage: 'Design patterns and architecture of front end apps',
        description: 'Description of system design questions',
        id: 'vqKJ0D',
      }),
      href: '/prepare/system-design',
      icon: RiFlowChart,
      key: 'system-design',
      longName: intl.formatMessage({
        defaultMessage: 'System Design Questions',
        description: 'System design questions long title',
        id: 'sa8B3r',
      }),
      name: intl.formatMessage({
        defaultMessage: 'System Design',
        description: 'System design questions short title',
        id: 'MF21p5',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search system design questions',
        description:
          'Placeholder for search input of system design question list',
        id: 'BgJTSk',
      }),
      themeGradient: themeGradientPinkPurple.className,
    },
  };

  return questionFormatLists;
}
export function useQuestionTechnologyLists() {
  const intl = useIntl();
  const questionTechnologyLists: QuestionFormatLists<
    'angular' | 'css' | 'html' | 'js' | 'react' | 'vanilla' | 'vue'
  > = {
    angular: {
      href: '/questions/angular',
      icon: AngularLogo,
      key: 'angular',
      longName: intl.formatMessage({
        defaultMessage: 'Angular Questions',
        description: 'Angular questions category long title',
        id: 'kGgqDu',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Angular',
        description: 'Angular questions category short title',
        id: 'O+NT3M',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search Angular questions',
        description: 'Placeholder for search input of Angular question list',
        id: '0ivjRp',
      }),
    },
    css: {
      href: '/questions/css',
      icon: CSS3LogoMonochrome,
      key: 'css',
      longName: intl.formatMessage({
        defaultMessage: 'CSS Questions',
        description: 'CSS questions category long title',
        id: 'jKk5c3',
      }),
      name: intl.formatMessage({
        defaultMessage: 'CSS',
        description: 'CSS questions category short title',
        id: 'LnzTdG',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search CSS questions',
        description: 'Placeholder for search input of CSS question list',
        id: 'trXVQB',
      }),
    },
    html: {
      href: '/questions/html',
      icon: HTML5LogoMonochrome,
      key: 'html',
      longName: intl.formatMessage({
        defaultMessage: 'HTML Questions',
        description: 'HTML questions category long title',
        id: 'Q7EpE5',
      }),
      name: intl.formatMessage({
        defaultMessage: 'HTML',
        description: 'CSS questions category short title',
        id: 'k964KU',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search HTML questions',
        description: 'Placeholder for search input of HTML question list',
        id: 'hxKyEy',
      }),
    },
    js: {
      href: '/questions/js',
      icon: JavaScriptLogoMonochrome,
      key: 'js',
      longName: intl.formatMessage({
        defaultMessage: 'JavaScript Questions',
        description: 'JavaScript questions category long title',
        id: 'tNAIsO',
      }),
      name: intl.formatMessage({
        defaultMessage: 'JavaScript',
        description: 'JavaScript questions category long title',
        id: 'au4m82',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search JavaScript questions',
        description: 'Placeholder for search input of JavaScript question list',
        id: 'OGvytR',
      }),
    },
    react: {
      href: '/questions/react',
      icon: ReactLogo,
      key: 'react',
      longName: intl.formatMessage({
        defaultMessage: 'React Questions',
        description: 'React questions category long title',
        id: '5usorl',
      }),
      name: intl.formatMessage({
        defaultMessage: 'React',
        description: 'React questions category short title',
        id: '2OmfN2',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search React questions',
        description: 'Placeholder for search input of React question list',
        id: '+xshpk',
      }),
    },
    vanilla: {
      href: '/questions/vanilla',
      icon: HTML5LogoMonochrome,
      key: 'vanilla',
      longName: intl.formatMessage({
        defaultMessage: 'Vanilla JS Questions',
        description: 'Vanilla JS questions category long title',
        id: '680b8U',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Vanilla JS',
        description: 'Vanilla JS questions category short title',
        id: 'Js4axe',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search Vanilla JS questions',
        description: 'Placeholder for search input of Vanilla JS question list',
        id: 'IhvVOB',
      }),
    },
    vue: {
      href: '/questions/vue',
      icon: VueLogoMonochrome,
      key: 'vue',
      longName: intl.formatMessage({
        defaultMessage: 'Vue Questions',
        description: 'Vue questions category long title',
        id: 'V3Zz1V',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Vue',
        description: 'Vue questions category short title',
        id: 'JPbOCy',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search Vue questions',
        description: 'Placeholder for search input of Vue question list',
        id: 'N9hGOq',
      }),
    },
  };

  return questionTechnologyLists;
}
