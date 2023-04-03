import { useIntl } from 'react-intl';

import AngularLogo from '~/components/icons/AngularLogo';
import CSS3LogoMonochrome from '~/components/icons/CSS3LogoMonochrome';
import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogoMonochrome from '~/components/icons/JavaScriptLogoMonochrome';
import ReactLogo from '~/components/icons/ReactLogo';
import VueLogoMonochrome from '~/components/icons/VueLogoMonochrome';

import {
  CodeBracketIcon,
  CubeIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

type QuestionListLink = Readonly<{
  description?: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  longName: string;
  name: string;
}>;
type QuestionFormatLists = Record<string, QuestionListLink>;

export function useQuestionFormatLists() {
  const intl = useIntl();
  const questionFormatLists: QuestionFormatLists = {
    coding: {
      description: intl.formatMessage({
        defaultMessage: 'JS functions, algorithms, building components, etc.',
        description: 'Description of coding questions',
        id: 'uDUEmN',
      }),
      href: '/prepare/coding',
      icon: CodeBracketIcon,
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
    },
    quiz: {
      description: intl.formatMessage({
        defaultMessage:
          'Trivia-style questions on essential front end know-how',
        description: 'Description of quiz questions',
        id: 'HDsjyG',
      }),
      href: '/prepare/quiz',
      icon: DocumentTextIcon,
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
    },
    'system-design': {
      description: intl.formatMessage({
        defaultMessage: 'Design patterns and architecture of front end apps',
        description: 'Description of system design questions',
        id: 'vqKJ0D',
      }),
      href: '/prepare/system-design',
      icon: CubeIcon,
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
    },
  };

  return questionFormatLists;
}
export function useQuestionCategoryLists() {
  const intl = useIntl();
  const questionCategoryLists: QuestionFormatLists = {
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
    },
    javascript: {
      href: '/questions/js',
      icon: JavaScriptLogoMonochrome,
      key: 'javascript',
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
    },
  };

  return questionCategoryLists;
}
