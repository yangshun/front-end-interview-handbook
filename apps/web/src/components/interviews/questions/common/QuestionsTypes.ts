import type {
  SandboxEnvironment,
  SandboxTemplate,
  SandpackFiles,
} from '@codesandbox/sandpack-react';

export type QuestionSlug = string;
export type QuestionHash = string;
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
export type QuestionImportance = 'high' | 'low' | 'medium';
// - Free: can access both desc and solution
// - Premium: cannot access desc and solution
// - Standard: can access desc but not solution
export type QuestionAccess = 'free' | 'premium' | 'standard';
export type QuestionSortField =
  | 'created'
  | 'default'
  | 'difficulty'
  | 'duration'
  | 'importance'
  | 'premium'
  | 'ranking'
  | 'title';
export type QuestionFormat =
  | 'algo'
  | 'javascript'
  | 'quiz'
  | 'system-design'
  | 'user-interface';
export type QuestionFormatSEO =
  | 'algo-coding'
  | 'javascript-functions'
  | 'quiz'
  | 'system-design'
  | 'ui-coding';
export const QuestionFormatSEOToSlug: Record<
  QuestionFormatSEO,
  QuestionFormat
> = {
  'algo-coding': 'algo',
  'javascript-functions': 'javascript',
  quiz: 'quiz',
  'system-design': 'system-design',
  'ui-coding': 'user-interface',
};
export type QuestionCodingFormat = 'algo' | 'javascript' | 'user-interface';
export type QuestionUserFacingFormat = 'coding' | 'quiz' | 'system-design';
export type QuestionFramework =
  | 'angular'
  | 'react'
  | 'svelte'
  | 'vanilla'
  | 'vue';
export type QuestionFrameworkOrLanguage = QuestionFramework | QuestionLanguage;
export const QuestionFrameworkLabels: Record<QuestionFramework, string> = {
  angular: 'Angular',
  react: 'React',
  svelte: 'Svelte',
  vanilla: 'Vanilla JS',
  vue: 'Vue',
};

export type QuestionUserInterfaceSetupType = 'skeleton' | 'solution';

export type QuestionUserInterfaceSandpackSetup = Readonly<{
  activeFile?: string;
  visibleFiles?: Array<string>;
}> &
  SandboxTemplate;

export type QuestionUserInterfaceBundle = Readonly<{
  author: string | null;
  files: SandpackFiles;
  workspace: QuestionUserInterfaceWorkspace;
  writeup: string | null;
}>;

export type QuestionMetadata = Readonly<{
  access: QuestionAccess;
  author: string | null;
  companies: ReadonlyArray<QuestionCompany>;
  created: number; // Unix timestamp in seconds.
  difficulty: QuestionDifficulty;
  duration: number;
  excerpt: string | null;
  featured: boolean;
  format: QuestionFormat;
  frameworkDefault: QuestionFramework | null;
  frameworks: ReadonlyArray<
    Readonly<{
      framework: QuestionFramework;
      href: string;
    }>
  >;
  gitHubEditUrl?: string | null;
  href: string;
  importance: QuestionImportance;
  languages: ReadonlyArray<QuestionLanguage>;
  nextQuestions: ReadonlyArray<QuestionSlug>;
  published: boolean;
  // Value from 1-100 where 1 is the highest ranking.
  ranking: number;
  similarQuestions: ReadonlyArray<QuestionSlug>;
  slug: QuestionSlug;
  subtitle: string | null;
  title: string;
  topics: ReadonlyArray<QuestionTopic>;
}>;

export type QuestionBase = Readonly<{
  description: string | null;
  metadata: QuestionMetadata;
  solution: string | null;
}>;

export type QuestionSystemDesign = QuestionBase;

export type QuestionCodingWorkingLanguage = 'js' | 'ts';

export type QuestionJavaScriptSkeleton = Record<
  QuestionCodingWorkingLanguage,
  string
>;
export type QuestionJavaScriptWorkspace = Readonly<{
  main: string;
  run: string;
  submit: string;
}>;
export type QuestionJavaScript = QuestionBase &
  Readonly<{
    files: Record<string, string>;
    skeleton: QuestionJavaScriptSkeleton;
    workspace: QuestionJavaScriptWorkspace;
  }>;

export type QuestionUserInterfaceWorkspace = Readonly<{
  activeFile?: string;
  environment: SandboxEnvironment;
  visibleFiles?: Array<string>;
}>;

export type QuestionUserInterface = QuestionBase &
  Readonly<{
    framework: QuestionFramework;
    skeletonBundle: QuestionUserInterfaceBundle;
    solutionBundle: QuestionUserInterfaceBundle;
  }>;

export type QuestionMetadataWithCompletedStatus = QuestionMetadata &
  Readonly<{
    isCompleted: boolean;
  }>;

export type QuestionTopic =
  | 'a11y'
  | 'async'
  | 'browser'
  | 'closure'
  | 'css'
  | 'graph'
  | 'html'
  | 'i18n'
  | 'javascript'
  | 'networking'
  | 'oop'
  | 'performance'
  | 'react'
  | 'recursion'
  | 'security'
  | 'seo'
  | 'testing'
  | 'tree'
  | 'ui-component'
  | 'web-api';

export type QuestionQuiz = QuestionBase;
