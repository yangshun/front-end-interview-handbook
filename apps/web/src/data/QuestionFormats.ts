import AngularLogo from '~/components/icons/AngularLogo';
import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
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
  name: string;
}>;

type QuestionFormatLists = Record<string, QuestionListLink>;

export function useQuestionFormatLists() {
  const questionFormatLists: QuestionFormatLists = {
    coding: {
      description: 'JS functions, algorithms, building components, etc.',
      href: '/prepare/coding',
      icon: CodeBracketIcon,
      key: 'coding',
      name: 'Coding',
    },
    quiz: {
      description: 'Trivia-style questions on essential front end know-how',
      href: '/prepare/quiz',
      icon: DocumentTextIcon,
      key: 'quiz',
      name: 'Quiz',
    },
    'system-design': {
      description: 'Design patterns and architecture of front end apps',
      href: '/prepare/system-design',
      icon: CubeIcon,
      key: 'system-design',
      name: 'System Design',
    },
  };

  return questionFormatLists;
}

export function useQuestionCategoryLists() {
  const questionCategoryLists: QuestionFormatLists = {
    angular: {
      href: '/questions/angular',
      icon: AngularLogo,
      key: 'angular',
      name: 'Angular',
    },
    css: {
      href: '/questions/css',
      icon: CSS3Logo,
      key: 'css',
      name: 'CSS',
    },
    html: {
      href: '/questions/html',
      icon: HTML5LogoMonochrome,
      key: 'html',
      name: 'HTML',
    },
    javascript: {
      href: '/questions/js',
      icon: JavaScriptLogo,
      key: 'javascript',
      name: 'JavaScript',
    },
    react: {
      href: '/questions/react',
      icon: ReactLogo,
      key: 'react',
      name: 'React',
    },
    vue: {
      href: '/questions/vue',
      icon: VueLogoMonochrome,
      key: 'vue',
      name: 'Vue',
    },
  };

  return questionCategoryLists;
}
