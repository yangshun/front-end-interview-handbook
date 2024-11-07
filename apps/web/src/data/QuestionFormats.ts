import {
  RiCodeBoxFill,
  RiFlowChart,
  RiJavascriptFill,
  RiQuestionnaireLine,
  RiTerminalWindowLine,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';

import AngularLogoMonochrome from '~/components/icons/AngularLogoMonochrome';
import CSS3LogoMonochrome from '~/components/icons/CSS3LogoMonochrome';
import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogoMonochrome from '~/components/icons/JavaScriptLogoMonochrome';
import ReactLogo from '~/components/icons/ReactLogo';
import SvelteLogo from '~/components/icons/SvelteLogo';
import VueLogoMonochrome from '~/components/icons/VueLogoMonochrome';
import type {
  QuestionFormat,
  QuestionUserFacingFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import {
  themeGradientGreenYellow,
  themeGradientPinkPurple,
  themeGradientPurpleGreen,
} from '~/components/ui/theme';

type QuestionListLink = Readonly<{
  description?: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  id: string;
  label: string;
  longName: string;
  searchPlaceholder: string;
  themeGradient?: string;
}>;
type QuestionFormatLists<C extends string> = Record<C, QuestionListLink>;

type QuestionFormatData = Record<
  QuestionFormat,
  {
    href: `/questions/${QuestionFormat}`;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    id: QuestionFormat;
    label: string;
    shortLabel: string;
    tooltip: string;
  }
>;

export function useQuestionFormatsData(): QuestionFormatData {
  const intl = useIntl();

  return {
    algo: {
      href: '/questions/algo',
      icon: TbBinaryTree,
      id: 'algo',
      label: intl.formatMessage({
        defaultMessage: 'Algorithmic coding',
        description: 'Data structures and algorithm questions',
        id: 'RQzpcq',
      }),
      shortLabel: intl.formatMessage({
        defaultMessage: 'Algo coding',
        description: 'Data structures and algorithm questions',
        id: 'qvT5Mx',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Coding questions focused on testing your understanding of data structures and algorithms. May be asked in larger companies even for front end engineers. Examples include solving problems related to array manipulation, string processing, or implementing common algorithms like sorting or searching',
        description: 'Description of data structures and algorithm questions',
        id: 'VjJtDL',
      }),
    },
    javascript: {
      href: '/questions/javascript',
      icon: RiJavascriptFill,
      id: 'javascript',
      label: intl.formatMessage({
        defaultMessage: 'JavaScript coding',
        description: 'Front end JavaScript utility functions',
        id: 'EQXg+W',
      }),
      shortLabel: intl.formatMessage({
        defaultMessage: 'JS coding',
        description: 'Front end JavaScript utility functions',
        id: '5W8dPJ',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Coding questions focused on testing your understanding of JavaScript, including concepts like closures, event handling, asynchronous programming, and manipulating the DOM',
        description: 'Description of JavaScript function questions',
        id: 'Aqyo8Q',
      }),
    },
    quiz: {
      href: '/questions/quiz',
      icon: RiQuestionnaireLine,
      id: 'quiz',
      label: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Front end quiz questions',
        id: 'L2l9WA',
      }),
      shortLabel: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Front end quiz questions',
        id: 'L2l9WA',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          "Short answer questions aimed at quickly assessing a candidate's knowledge of specific front-end topics. These can cover a wide range of areas, including HTML/CSS best practices, JavaScript nuances, browser APIs, web performance, and security. Frequently asked in recruiter screens or companies without technical coding rounds",
        description: 'Description of data structures and algorithm questions',
        id: 'aK5rZ5',
      }),
    },
    'system-design': {
      href: '/questions/system-design',
      icon: RiFlowChart,
      id: 'system-design',
      label: intl.formatMessage({
        defaultMessage: 'System design',
        description: 'Front end system design questions',
        id: '5n/TXe',
      }),
      shortLabel: intl.formatMessage({
        defaultMessage: 'System design',
        description: 'Front end system design questions',
        id: '5n/TXe',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          "System design questions in front-end interviews evaluate a candidate's ability to architect large-scale, maintainable, and scalable web applications. Unlike backend system design, these questions focus more on designing the client-side architecture, managing state, ensuring performance, and integrating with APIs or backend services. Candidates may be asked to design complex UI systems, plan for accessibility, or discuss strategies for handling large volumes of user interactions or data. Asked in mid-level to senior level interviews",
        description: 'Description of data structures and algorithm questions',
        id: 'Rz6MDM',
      }),
    },
    'user-interface': {
      href: '/questions/user-interface',
      icon: RiTerminalWindowLine,
      id: 'user-interface',
      label: intl.formatMessage({
        defaultMessage: 'User interface coding',
        description: 'Front end user interface questions',
        id: 'Iq5gAi',
      }),
      shortLabel: intl.formatMessage({
        defaultMessage: 'UI coding',
        description: 'Front end user interface questions',
        id: 'bo7Qat',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Coding questions focused on building user interfaces. Candidates are expected to build components, style elements, and ensure the UI behaves correctly across different devices and screen sizes',
        description: 'Description of front end user interface questions',
        id: 'zVBgBc',
      }),
    },
  };
}

export function useQuestionUserFacingFormatData() {
  const intl = useIntl();
  const questionUserFacingFormatData: QuestionFormatLists<QuestionUserFacingFormat> =
    {
      coding: {
        description: intl.formatMessage({
          defaultMessage: 'JS functions, algorithms, building components, etc.',
          description: 'Description of coding questions',
          id: 'uDUEmN',
        }),
        href: '/prepare/coding',
        icon: RiCodeBoxFill,
        id: 'coding',
        label: intl.formatMessage({
          defaultMessage: 'Coding',
          description: 'Coding questions short title',
          id: 'VQfbK1',
        }),
        longName: intl.formatMessage({
          defaultMessage: 'Coding Questions',
          description: 'Coding questions long title',
          id: 'UCt/lF',
        }),
        searchPlaceholder: intl.formatMessage({
          defaultMessage: 'Search coding questions',
          description: 'Placeholder for search input of coding question list',
          id: 'jGQnYd',
        }),
        themeGradient: themeGradientPurpleGreen.className,
      },
      quiz: {
        description: intl.formatMessage({
          defaultMessage:
            'Trivia-style questions on essential front end know-how',
          description: 'Description of quiz questions',
          id: 'HDsjyG',
        }),
        href: '/prepare/quiz',
        icon: RiQuestionnaireLine,
        id: 'quiz',
        label: intl.formatMessage({
          defaultMessage: 'Quiz',
          description: 'Quiz questions short title',
          id: '7Wsapt',
        }),
        longName: intl.formatMessage({
          defaultMessage: 'Quiz Questions',
          description: 'Quiz questions long title',
          id: 'JhZ/aF',
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
        id: 'system-design',
        label: intl.formatMessage({
          defaultMessage: 'System Design',
          description: 'System design questions short title',
          id: 'MF21p5',
        }),
        longName: intl.formatMessage({
          defaultMessage: 'System Design Questions',
          description: 'System design questions long title',
          id: 'sa8B3r',
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

  return questionUserFacingFormatData;
}

export function useQuestionTechnologyLists() {
  const intl = useIntl();
  const questionTechnologyLists: QuestionFormatLists<
    'angular' | 'css' | 'html' | 'js' | 'react' | 'svelte' | 'vanilla' | 'vue'
  > = {
    angular: {
      href: '/questions/angular',
      icon: AngularLogoMonochrome,
      id: 'angular',
      label: intl.formatMessage({
        defaultMessage: 'Angular',
        description: 'Angular questions category short title',
        id: 'O+NT3M',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'Angular Questions',
        description: 'Angular questions category long title',
        id: 'kGgqDu',
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
      id: 'css',
      label: intl.formatMessage({
        defaultMessage: 'CSS',
        description: 'CSS questions category short title',
        id: 'LnzTdG',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'CSS Questions',
        description: 'CSS questions category long title',
        id: 'jKk5c3',
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
      id: 'html',
      label: intl.formatMessage({
        defaultMessage: 'HTML',
        description: 'CSS questions category short title',
        id: 'k964KU',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'HTML Questions',
        description: 'HTML questions category long title',
        id: 'Q7EpE5',
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
      id: 'js',
      label: intl.formatMessage({
        defaultMessage: 'JavaScript',
        description: 'JavaScript questions category long title',
        id: 'au4m82',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'JavaScript Questions',
        description: 'JavaScript questions category long title',
        id: 'tNAIsO',
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
      id: 'react',
      label: intl.formatMessage({
        defaultMessage: 'React',
        description: 'React questions category short title',
        id: '2OmfN2',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'React Questions',
        description: 'React questions category long title',
        id: '5usorl',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search React questions',
        description: 'Placeholder for search input of React question list',
        id: '+xshpk',
      }),
    },
    svelte: {
      href: '/questions/svelte',
      icon: SvelteLogo,
      id: 'svelte',
      label: intl.formatMessage({
        defaultMessage: 'Svelte',
        description: 'Svelte questions category short title',
        id: 'y1y4Uh',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'Svelte Questions',
        description: 'Svelte questions category long title',
        id: '+ESKYF',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search Svelte questions',
        description: 'Placeholder for search input of Svelte question list',
        id: 'R68iHH',
      }),
    },
    vanilla: {
      href: '/questions/vanilla',
      icon: HTML5LogoMonochrome,
      id: 'vanilla',
      label: intl.formatMessage({
        defaultMessage: 'Vanilla JS',
        description: 'Vanilla JS questions category short title',
        id: 'Js4axe',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'Vanilla JS Questions',
        description: 'Vanilla JS questions category long title',
        id: '680b8U',
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
      id: 'vue',
      label: intl.formatMessage({
        defaultMessage: 'Vue',
        description: 'Vue questions category short title',
        id: 'JPbOCy',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'Vue Questions',
        description: 'Vue questions category long title',
        id: 'V3Zz1V',
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
