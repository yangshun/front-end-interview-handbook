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
import type { IntlShape } from 'react-intl';

import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

type QuestionListLink<T> = Readonly<{
  getDescription: (questionCount: number) => string;
  getSearchPlaceholder: (questionCount: number) => string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  longName: string;
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

  return getQuestionFormatsData(intl);
}

export function getQuestionFormatsData(intl: IntlShape): QuestionFormatData {
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
      topics: ['graph', 'tree', 'recursion'],
      value: 'algo',
    },
    javascript: {
      briefName: intl.formatMessage({
        defaultMessage: 'JavaScript functions',
        description: 'Question format',
        id: '01DH9a',
      }),
      href: '/questions/javascript',
      icon: RiJavascriptFill,
      label: intl.formatMessage({
        defaultMessage: 'JavaScript functions',
        description: 'Front end JavaScript utility functions',
        id: 'iZ7WT0',
      }),
      listingDescription: intl.formatMessage({
        defaultMessage:
          'Coding questions that require you to implement functions in JavaScript, which can be utility functions found in Lodash/Underscore. a polyfill for the JavaScript language, or DOM APIs.',
        description: 'Description for js coding questions',
        id: 'S/DgGm',
      }),
      listingName: intl.formatMessage({
        defaultMessage: 'JavaScript Functions',
        description: 'Title for js coding questions',
        id: 'm0Uu4y',
      }),
      searchPlaceholder: intl.formatMessage({
        defaultMessage: 'Search JavaScript functions questions',
        description: 'Search placeholder',
        id: 'W9weyy',
      }),
      shortLabel: intl.formatMessage({
        defaultMessage: 'JS functions',
        description: 'Front end JavaScript utility functions',
        id: 'Myky94',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Coding questions focused on testing your understanding of JavaScript, including concepts like closures, event handling, asynchronous programming, and manipulating the DOM',
        description: 'Description of JavaScript function questions',
        id: 'Aqyo8Q',
      }),
      topics: ['async', 'closure', 'oop', 'recursion'],
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
      topics: ['a11y', 'performance', 'networking', 'security'],
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
      topics: ['ui-component', 'seo', 'networking', 'performance'],
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
      topics: ['a11y', 'async', 'css', 'ui-component'],
      value: 'user-interface',
    },
  };
}

export function useQuestionLanguagesData(): QuestionCategoryLists<QuestionLanguage> {
  const intl = useIntl();

  return getQuestionLanguagesData(intl);
}

export function getQuestionLanguagesData(
  intl: IntlShape,
): QuestionCategoryLists<QuestionLanguage> {
  return {
    css: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important CSS interview questions covering layouts, animations, responsive design, specificity, and creating engaging interfaces.',
            description: 'Subtitle for CSS questions list page',
            id: 'Xu6JMi',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} CSS interview questions',
            description: 'Search placeholder for CSS questions list page',
            id: '0Z+Itx',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      href: '/questions/css',
      icon: RiCss3Fill,
      label: 'CSS',
      longName: intl.formatMessage({
        defaultMessage: 'CSS Interview Questions',
        description: 'CSS questions category long title',
        id: 'S2GzJi',
      }),
      value: 'css',
    },
    html: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important HTML interview questions covering semantics, forms, accessibility, media, and creating structured, interactive web pages.',
            description: 'Subtitle for HTML questions list page',
            id: 'l7RnuO',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} HTML interview questions',
            description: 'Search placeholder for HTML questions list page',
            id: 'zbigrn',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      href: '/questions/html',
      icon: RiHtml5Fill,
      label: 'HTML',
      longName: intl.formatMessage({
        defaultMessage: 'HTML Interview Questions',
        description: 'HTML questions category long title',
        id: 'oIJgRa',
      }),
      value: 'html',
    },
    js: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important JavaScript interview questions, from library APIs and utility functions to algorithms and UI components.',
            description: 'Subtitle for JavaScript questions list page',
            id: '3QZFQc',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} JavaScript interview questions',
            description:
              'Search placeholder for JavaScript questions list page',
            id: 'INrnLA',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      href: '/questions/js',
      icon: BiLogoJavascript,
      label: 'JavaScript',
      longName: intl.formatMessage({
        defaultMessage: 'JavaScript Interview Questions',
        description: 'JavaScript questions category long title',
        id: 'GeN7OJ',
      }),
      value: 'js',
    },
    ts: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important TypeScript interview questions on library APIs, utility types, algorithms, and building strong, typed components.',
            description: 'Subtitle for questions list page',
            id: '1fjGWk',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} TypeScript interview questions',
            description:
              'Search placeholder for TypeScript questions list page',
            id: 'bGbV1l',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      href: '/questions/ts',
      icon: BiLogoTypescript,
      label: 'TypeScript',
      longName: intl.formatMessage({
        defaultMessage: 'TypeScript Interview Questions',
        description: 'TypeScript questions category long title',
        id: 'zGDMkS',
      }),
      value: 'ts',
    },
  };
}

export function useQuestionFrameworksData(): QuestionCategoryLists<QuestionFramework> {
  const intl = useIntl();

  return getQuestionFrameworksData(intl);
}

export function getQuestionFrameworksData(
  intl: IntlShape,
): QuestionCategoryLists<QuestionFramework> {
  return {
    angular: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important Angular interview questions on services, directives, RxJS, forms, state management, and dynamic component building.',
            description: 'Subtitle for questions list page',
            id: 'hRukCr',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} Angular interview questions',
            description: 'Search placeholder for Angular questions list page',
            id: 'I4MnL2',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      href: '/questions/angular',
      icon: RiAngularjsFill,
      label: 'Angular',
      longName: intl.formatMessage({
        defaultMessage: 'Angular Interview Questions',
        description: 'Angular questions category long title',
        id: 'hW1w8e',
      }),
      value: 'angular',
    },
    react: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important React interview questions on component architecture, hooks, state management, performance, and real-world UI components.',
            description: 'Subtitle for questions list page',
            id: 'cYRco3',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} React interview questions',
            description: 'Search placeholder for React questions list page',
            id: 'VejmxA',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      href: '/questions/react',
      icon: RiReactjsLine,
      label: 'React',
      longName: intl.formatMessage({
        defaultMessage: 'React Interview Questions',
        description: 'React questions category long title',
        id: '+bg08+',
      }),
      value: 'react',
    },
    svelte: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important Svelte interview questions covering stores, bindings, reactivity, lifecycle, and building interactive components.',
            description: 'Subtitle for questions list page',
            id: '3pEuVX',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} Svelte interview questions',
            description: 'Search placeholder for Svelte questions list page',
            id: 'pp575K',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      href: '/questions/svelte',
      icon: RiSvelteFill,
      label: 'Svelte',
      longName: intl.formatMessage({
        defaultMessage: 'Svelte Interview Questions',
        description: 'Svelte questions category long title',
        id: 'jGPKlz',
      }),
      value: 'svelte',
    },
    vanilla: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important JavaScript interview questions, from library APIs and utility functions to algorithms and UI components.',
            description: 'Subtitle for questions list page',
            id: '+EcvKM',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} Vanilla JS interview questions',
            description:
              'Search placeholder for Vanilla JS questions list page',
            id: 'K7CwuJ',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
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
      value: 'vanilla',
    },
    vue: {
      getDescription: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ most important Vue interview questions covering stores, bindings, reactivity, lifecycle, and building interactive components.',
            description: 'Subtitle for questions list page',
            id: 'n7/w8e',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      getSearchPlaceholder: (questionCount) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Search over {questionCount} Vue interview questions',
            description: 'Search placeholder for Vue questions list page',
            id: 'qS4yLY',
          },
          {
            questionCount: roundQuestionCountToNearestTen(questionCount),
          },
        ),
      href: '/questions/vue',
      icon: RiVuejsLine,
      label: 'Vue',
      longName: intl.formatMessage({
        defaultMessage: 'Vue Interview Questions',
        description: 'Vue questions category long title',
        id: 'BFqThO',
      }),
      value: 'vue',
    },
  };
}
