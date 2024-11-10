import { BiLogoJavascript, BiLogoTypescript } from 'react-icons/bi';
import {
  RiAngularjsFill,
  RiCss3Fill,
  RiFlowChart,
  RiHtml5Fill,
  RiJavascriptFill,
  RiQuestionnaireLine,
  RiReactjsLine,
  RiSvelteFill,
  RiTerminalWindowLine,
  RiVuejsLine,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';

import SvelteLogo from '~/components/icons/SvelteLogo';
import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

type QuestionListLink<T> = Readonly<{
  description: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  longName: string;
  searchPlaceholder: string;
  themeGradient?: string;
  value: T;
}>;

type QuestionCategoryLists<T extends string> = Record<
  T,
  QuestionListLink<T> &
    Readonly<{
      href: `/questions/${T}`;
    }>
>;

type QuestionFormatData = Record<
  QuestionFormat,
  {
    briefName: string;
    href: `/questions/${QuestionFormat}`;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    listingDescription: string;
    listingName: string;
    searchPlaceholder: string;
    shortLabel: string;
    tooltip: string;
    topics?: Array<QuestionTopic>;
    value: QuestionFormat;
  }
>;

export function useQuestionFormatsData(): QuestionFormatData {
  const intl = useIntl();

  return {
    algo: {
      briefName: intl.formatMessage({
        defaultMessage: 'Algo coding',
        description: 'Data structures and algorithm questions',
        id: 'qvT5Mx',
      }),
      href: '/questions/algo',
      icon: TbBinaryTree,
      label: intl.formatMessage({
        defaultMessage: 'Algorithmic coding',
        description: 'Data structures and algorithm questions',
        id: 'RQzpcq',
      }),
      listingDescription: intl.formatMessage({
        defaultMessage:
          'LeetCode-style algorithmic coding questions which evaluate your core data structures and algorithms skills.',
        description: 'Description for ui coding questions',
        id: 'Hph7Vz',
      }),
      listingName: intl.formatMessage({
        defaultMessage: 'Data Structures and Algorithms Coding',
        description: 'Title for ui coding questions',
        id: 'xWBL/9',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search algorithmic coding questions',
        description: 'Search placeholder',
        id: 'BBf20X',
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
      value: 'algo',
    },
    javascript: {
      briefName: intl.formatMessage({
        defaultMessage: 'JavaScript coding',
        description: 'Question format',
        id: 'HCcf9D',
      }),
      href: '/questions/javascript',
      icon: RiJavascriptFill,
      label: intl.formatMessage({
        defaultMessage: 'JavaScript coding',
        description: 'Front end JavaScript utility functions',
        id: 'EQXg+W',
      }),
      listingDescription: intl.formatMessage({
        defaultMessage:
          'Coding questions that require you to implement functions in JavaScript, which can be utility functions found in Lodash/Underscore. a polyfill for the JavaScript language, or DOM APIs.',
        description: 'Description for js coding questions',
        id: 'S/DgGm',
      }),
      listingName: intl.formatMessage({
        defaultMessage: 'JavaScript Coding',
        description: 'Title for js coding questions',
        id: 'ZeUMGU',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search JavaScript coding questions',
        description: 'Search placeholder',
        id: 'cpvb0H',
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
      value: 'javascript',
    },
    quiz: {
      briefName: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Question format',
        id: 'doY6Fg',
      }),
      href: '/questions/quiz',
      icon: RiQuestionnaireLine,
      label: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Front end quiz questions',
        id: 'L2l9WA',
      }),
      listingDescription: intl.formatMessage({
        defaultMessage:
          'Short questions which test your knowledge and have clear, non-subjective answers. Commonly asked during recruiter screens or by companies which do not adopt coding rounds.',
        description: 'Description for quiz questions',
        id: 'tDwpNT',
      }),
      listingName: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Title for quiz questions',
        id: 'gAvT0O',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search quiz questions',
        description: 'Search placeholder',
        id: '3o++cB',
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
      topics: [
        'javascript',
        'html',
        'performance',
        'a11y',
        'i18n',
        'css',
        'network',
        'security',
        'testing',
      ],
      value: 'quiz',
    },
    'system-design': {
      briefName: intl.formatMessage({
        defaultMessage: 'System design',
        description: 'Question format',
        id: '57qxzy',
      }),
      href: '/questions/system-design',
      icon: RiFlowChart,
      label: intl.formatMessage({
        defaultMessage: 'System design',
        description: 'Front end system design questions',
        id: '5n/TXe',
      }),
      listingDescription: intl.formatMessage({
        defaultMessage:
          'Technical architecture design questions that assess your ability to design scalable and maintainable front end systems. Typically asked for mid to senior level positions.',
        description: 'Description for system design questions',
        id: 'KS2MMz',
      }),
      listingName: intl.formatMessage({
        defaultMessage: 'Front End System Design',
        description: 'Title for system design questions',
        id: '83BIY0',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search system design questions',
        description: 'Search placeholder',
        id: 'r0smyz',
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
      value: 'system-design',
    },
    'user-interface': {
      briefName: intl.formatMessage({
        defaultMessage: 'UI components',
        description: 'Question format',
        id: 'mwlQkw',
      }),
      href: '/questions/user-interface',
      icon: RiTerminalWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'User interface coding',
        description: 'Front end user interface questions',
        id: 'Iq5gAi',
      }),
      listingDescription: intl.formatMessage({
        defaultMessage:
          'Coding questions that require you to build user interfaces, whether it is a UI component, an app, or a game. Requires HTML, CSS, JavaScript, or UI frameworks.',
        description: 'Description for ui coding questions',
        id: 'bJYnS1',
      }),
      listingName: intl.formatMessage({
        defaultMessage: 'User Interface Coding',
        description: 'Title for ui coding questions',
        id: 'Yhn5fM',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search user interface questions',
        description: 'Search placeholder',
        id: 'Z1vsfi',
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
      value: 'user-interface',
    },
  };
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
      icon: RiCss3Fill,
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
      value: 'css',
    },
    html: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice HTML interview questions, including quiz-style knowledge questions and HTML coding questions.',
        description: 'Subtitle for HTML questions list page',
        id: 'fjna4j',
      }),
      href: '/questions/html',
      icon: RiHtml5Fill,
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
      value: 'html',
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
      value: 'js',
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
      value: 'ts',
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
      icon: RiAngularjsFill,
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
      value: 'angular',
    },
    react: {
      description: intl.formatMessage({
        defaultMessage: 'Practice top React interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'bjGLO9',
      }),
      href: '/questions/react',
      icon: RiReactjsLine,
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
      value: 'react',
    },
    svelte: {
      description: intl.formatMessage({
        defaultMessage: 'Practice top Svelte interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'NvnkrI',
      }),
      href: '/questions/svelte',
      icon: RiSvelteFill,
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
      value: 'svelte',
    },
    vanilla: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice top Vanilla JavaScript interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'IE+oUR',
      }),
      href: '/questions/vanilla',
      icon: RiHtml5Fill,
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
      value: 'vanilla',
    },
    vue: {
      description: intl.formatMessage({
        defaultMessage: 'Practice top Vue interview questions. TODO',
        description: 'Subtitle for questions list page',
        id: 'K7BZAc',
      }),
      href: '/questions/vue',
      icon: RiVuejsLine,
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
      value: 'vue',
    },
  };
}
