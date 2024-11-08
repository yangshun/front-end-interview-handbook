import {
  BiLogoAngular,
  BiLogoCss3,
  BiLogoHtml5,
  BiLogoJavascript,
  BiLogoReact,
  BiLogoTypescript,
  BiLogoVuejs,
} from 'react-icons/bi';
import {
  RiCodeBoxFill,
  RiFlowChart,
  RiJavascriptFill,
  RiQuestionnaireLine,
  RiTerminalWindowLine,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';

import SvelteLogo from '~/components/icons/SvelteLogo';
import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
  QuestionUserFacingFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import {
  themeGradientGreenYellow,
  themeGradientPinkPurple,
  themeGradientPurpleGreen,
} from '~/components/ui/theme';

type QuestionListLink<C> = Readonly<{
  description: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  id: C;
  label: string;
  longName: string;
  searchPlaceholder: string;
  themeGradient?: string;
}>;

type QuestionFormatLists<C extends string> = Record<C, QuestionListLink<C>>;

type QuestionCategoryLists<C extends string> = Record<
  C,
  QuestionListLink<C> &
    Readonly<{
      href: `/questions/${C}`;
    }>
>;

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

export function useQuestionLanguagesData(): QuestionCategoryLists<QuestionLanguage> {
  const intl = useIntl();

  return {
    css: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice CSS interview questions, including quiz-style knowledge questions and CSS coding questions.',
        description: 'Subtitle for CSS questions list page',
        id: 'BaJrKW',
      }),
      href: '/questions/css',
      icon: BiLogoCss3,
      id: 'css',
      label: intl.formatMessage({
        defaultMessage: 'CSS',
        description: 'CSS questions category short title',
        id: 'LnzTdG',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'CSS Interview Questions',
        description: 'CSS questions category long title',
        id: 'S2GzJi',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search CSS interview questions',
        description: 'Placeholder for search input of CSS question list',
        id: 'gLZ11S',
      }),
    },
    html: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice HTML interview questions, including quiz-style knowledge questions and HTML coding questions.',
        description: 'Subtitle for HTML questions list page',
        id: 'fjna4j',
      }),
      href: '/questions/html',
      icon: BiLogoHtml5,
      id: 'html',
      label: intl.formatMessage({
        defaultMessage: 'HTML',
        description: 'CSS questions category short title',
        id: 'k964KU',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'HTML Interview Questions',
        description: 'HTML questions category long title',
        id: 'oIJgRa',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search HTML interview questions',
        description: 'Placeholder for search input of HTML question list',
        id: 'fPftCJ',
      }),
    },
    js: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice JavaScript and TypeScript interview questions, from implementing common library APIs, utility functions, algorithms, to building UI components and more.',
        description: 'Subtitle for JavaScript questions list page',
        id: 'JAEdbj',
      }),
      href: '/questions/js',
      icon: BiLogoJavascript,
      id: 'js',
      label: intl.formatMessage({
        defaultMessage: 'JavaScript',
        description: 'JavaScript questions category long title',
        id: 'au4m82',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'JavaScript Interview Questions',
        description: 'JavaScript questions category long title',
        id: 'GeN7OJ',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search JavaScript interview questions',
        description: 'Placeholder for search input of JavaScript question list',
        id: 'w3mqdJ',
      }),
    },
    ts: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice TypeScript interview questions, from implementing common library APIs, utility functions, algorithms, to building UI components and more.',
        description: 'Subtitle for questions list page',
        id: '7JUoIp',
      }),
      href: '/questions/ts',
      icon: BiLogoTypescript,
      id: 'ts',
      label: intl.formatMessage({
        defaultMessage: 'TypeScript',
        description: 'TypeScript questions category long title',
        id: '66j+4g',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'TypeScript Interview Questions',
        description: 'TypeScript questions category long title',
        id: 'zGDMkS',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search TypeScript interview questions',
        description: 'Placeholder for search input of TypeScript question list',
        id: 'SoNXJL',
      }),
    },
  };
}

export function useQuestionFrameworksData(): QuestionCategoryLists<QuestionFramework> {
  const intl = useIntl();

  return {
    angular: {
      description: intl.formatMessage({
        defaultMessage: 'Practice top Angular interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'I2gPuj',
      }),
      href: '/questions/angular',
      icon: BiLogoAngular,
      id: 'angular',
      label: intl.formatMessage({
        defaultMessage: 'Angular',
        description: 'Angular questions category short title',
        id: 'O+NT3M',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'Angular Interview Questions',
        description: 'Angular questions category long title',
        id: 'hW1w8e',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search Angular interview questions',
        description: 'Placeholder for search input of Angular question list',
        id: '3VdP4W',
      }),
    },
    react: {
      description: intl.formatMessage({
        defaultMessage: 'Practice top React interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'bjGLO9',
      }),
      href: '/questions/react',
      icon: BiLogoReact,
      id: 'react',
      label: intl.formatMessage({
        defaultMessage: 'React',
        description: 'React questions category short title',
        id: '2OmfN2',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'React Interview Questions',
        description: 'React questions category long title',
        id: '+bg08+',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search React interview questions',
        description: 'Placeholder for search input of React question list',
        id: 'qSO2uW',
      }),
    },
    svelte: {
      description: intl.formatMessage({
        defaultMessage: 'Practice top Svelte interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'NvnkrI',
      }),
      href: '/questions/svelte',
      icon: SvelteLogo,
      id: 'svelte',
      label: intl.formatMessage({
        defaultMessage: 'Svelte',
        description: 'Svelte questions category short title',
        id: 'y1y4Uh',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'Svelte Interview Questions',
        description: 'Svelte questions category long title',
        id: 'jGPKlz',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search Svelte interview questions',
        description: 'Placeholder for search input of Svelte question list',
        id: 'tmTNK0',
      }),
    },
    vanilla: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice top Vanilla JavaScript interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'IE+oUR',
      }),
      href: '/questions/vanilla',
      icon: BiLogoHtml5,
      id: 'vanilla',
      label: intl.formatMessage({
        defaultMessage: 'Vanilla JS',
        description: 'Vanilla JS questions category short title',
        id: 'Js4axe',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'Vanilla JS Interview Questions',
        description: 'Vanilla JS questions category long title',
        id: '3hQg9K',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search Vanilla JS interview questions',
        description: 'Placeholder for search input of Vanilla JS question list',
        id: 'oLO2pr',
      }),
    },
    vue: {
      description: intl.formatMessage({
        defaultMessage: 'Practice top Vue interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'K7BZAc',
      }),
      href: '/questions/vue',
      icon: BiLogoVuejs,
      id: 'vue',
      label: intl.formatMessage({
        defaultMessage: 'Vue',
        description: 'Vue questions category short title',
        id: 'JPbOCy',
      }),
      longName: intl.formatMessage({
        defaultMessage: 'Vue Interview Questions',
        description: 'Vue questions category long title',
        id: 'BFqThO',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search Vue interview questions',
        description: 'Placeholder for search input of Vue question list',
        id: 'XAuXdM',
      }),
    },
  };
}
