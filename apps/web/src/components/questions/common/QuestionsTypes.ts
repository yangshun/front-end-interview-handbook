import type { ThemeGradient } from '~/components/ui/theme';

import type { SandboxTemplate } from '@codesandbox/sandpack-react';

export type QuestionSlug = string;
export type QuestionCompany =
  | 'airbnb'
  | 'amazon'
  | 'apple'
  | 'bytedance'
  | 'dropbox'
  | 'google'
  | 'linkedin'
  | 'lyft'
  | 'microsoft'
  | 'palantir'
  | 'salesforce'
  | 'snap'
  | 'stripe'
  | 'toptal'
  | 'twitter'
  | 'uber'
  | 'walmart'
  | 'yelp';
export type QuestionLanguage = 'css' | 'html' | 'js' | 'ts';
export const QuestionLanguageLabels: Record<QuestionLanguage, string> = {
  css: 'CSS',
  html: 'HTML',
  js: 'JavaScript',
  ts: 'TypeScript',
};

export type QuestionCompletionStatus = 'completed' | 'incomplete';
export type QuestionDifficulty = 'easy' | 'hard' | 'medium';
export type QuestionImportance = 'high' | 'low' | 'mid';
export type QuestionPremiumStatus = 'free' | 'premium';
export type QuestionSortField =
  | 'created'
  | 'difficulty'
  | 'duration'
  | 'importance'
  | 'premium'
  | 'ranking'
  | 'title';
export type QuestionFormat =
  | 'javascript'
  | 'quiz'
  | 'system-design'
  | 'user-interface';
export type QuestionUserFacingFormat = 'coding' | 'quiz' | 'system-design';
export type QuestionCodingFormat =
  | 'data-structures-algorithms'
  | 'user-interface'
  | 'utilities';
export type QuestionFramework = 'angular' | 'react' | 'vanilla' | 'vue';
export const QuestionFrameworkLabels: Record<QuestionFramework, string> = {
  angular: 'Angular',
  react: 'React',
  vanilla: 'Vanilla JS',
  vue: 'Vue',
};

export type QuestionUserInterfaceSetupType = 'skeleton' | 'solution';

export type QuestionUserInterfaceBundle = Readonly<{
  sandpack: QuestionUserInterfaceSandpackSetup;
  writeup: string | null;
}>;
export type QuestionUserInterfaceSandpackSetup = SandboxTemplate & {
  readonly activeFile?: string;
  readonly visibleFiles?: Array<string>;
};

export type QuestionMetadata = {
  readonly author: string | null;
  readonly companies: ReadonlyArray<QuestionCompany>;
  readonly created: number; // Unix timestamp in seconds.
  readonly difficulty: QuestionDifficulty;
  readonly duration: number;
  readonly excerpt: string | null;
  readonly featured: boolean;
  readonly format: QuestionFormat;
  readonly frameworkDefault: QuestionFramework | null;
  readonly frameworks: ReadonlyArray<
    Readonly<{
      framework: QuestionFramework;
      href: string;
    }>
  >;
  readonly href: string;
  readonly importance: QuestionImportance;
  readonly languages: ReadonlyArray<QuestionLanguage>;
  readonly nextQuestions: ReadonlyArray<QuestionSlug>;
  readonly premium: boolean;
  readonly published: boolean;
  readonly ranking: number; // Value from 1-100 where 1 is the highest ranking.
  readonly similarQuestions: ReadonlyArray<QuestionSlug>;
  readonly slug: QuestionSlug;
  readonly title: string;
};

export type QuestionBase = {
  readonly description: string | null;
  readonly format: QuestionFormat;
  readonly metadata: QuestionMetadata;
  readonly solution: string | null;
};

export type QuestionSystemDesign = QuestionBase;

export type QuestionCodingWorkingLanguage = 'js' | 'ts';
export type QuestionJavaScript = QuestionBase & {
  readonly skeleton: {
    js: string;
    ts: string | null;
  } | null;
  readonly tests: string | null;
};

export type QuestionUserInterface = QuestionBase & {
  readonly framework: QuestionFramework;
  readonly skeletonSetup: QuestionUserInterfaceSandpackSetup | null;
  readonly solutionSetup: QuestionUserInterfaceSandpackSetup | null;
};
// TODO: Remove this type and merge into one.
export type QuestionQuizMetadata = QuestionMetadata & {
  readonly subtitle: string | null;
  readonly topics: ReadonlyArray<QuestionQuizTopic>;
};

export type QuestionMetadataWithCompletedStatus = QuestionMetadata & {
  readonly isCompleted: boolean;
};
export type QuestionQuizMetadataWithCompletedStatus = QuestionQuizMetadata & {
  readonly isCompleted: boolean;
};

export type QuestionQuizTopic =
  | 'a11y'
  | 'css'
  | 'html'
  | 'i18n'
  | 'javascript'
  | 'network'
  | 'performance'
  | 'security'
  | 'testing';

export type QuestionQuiz = QuestionBase & {
  readonly metadata: QuestionQuizMetadata;
};

export type QuestionList = Readonly<{
  description: string;
  href: string;
  longName: string;
  name: string;
  questions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  seo: {
    description: string;
    title: string;
  };
  shortDescription: string;
}>;

export type QuestionListTheme = Readonly<{
  iconBorderClass: string;
  iconClass: string;
  iconOutline: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconSolid: (props: React.ComponentProps<'svg'>) => JSX.Element;
  theme: ThemeGradient;
}>;
