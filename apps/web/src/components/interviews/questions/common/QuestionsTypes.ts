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
  | 'atlassian'
  | 'bytedance'
  | 'dropbox'
  | 'google'
  | 'linkedin'
  | 'lyft'
  | 'microsoft'
  | 'openai'
  | 'palantir'
  | 'salesforce'
  | 'snap'
  | 'stripe'
  | 'tiktok'
  | 'toptal'
  | 'twitter'
  | 'uber'
  | 'walmart'
  | 'yelp';

export const QuestionCompanies: ReadonlyArray<QuestionCompany> = [
  'airbnb',
  'amazon',
  'apple',
  'bytedance',
  'dropbox',
  'google',
  'linkedin',
  'lyft',
  'microsoft',
  'palantir',
  'salesforce',
  'snap',
  'stripe',
  'toptal',
  'twitter',
  'uber',
  'walmart',
  'tiktok',
  'atlassian',
] as const;

export type QuestionLanguage = 'css' | 'html' | 'js' | 'ts';
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
export type QuestionPracticeFormat = 'coding' | 'quiz' | 'system-design';
export type QuestionCodingFormat = Extract<
  QuestionFormat,
  'algo' | 'javascript' | 'user-interface'
>;
export type QuestionFormatSEO =
  | 'algo-coding'
  | 'javascript-functions'
  | 'quiz'
  | 'system-design'
  | 'ui-coding';
export type QuestionLanguageSEO =
  | 'css-interview-questions'
  | 'html-interview-questions'
  | 'javascript-interview-questions'
  | 'typescript-interview-questions';
export type QuestionCodingFormatSEO = Extract<
  QuestionFormatSEO,
  'algo-coding' | 'javascript-functions' | 'ui-coding'
>;
export type QuestionFormatForList = QuestionFormat | 'coding';
export type QuestionFramework =
  | 'angular'
  | 'react'
  | 'svelte'
  | 'vanilla'
  | 'vue';
export type QuestionFrameworkSEO =
  | 'angular-interview-questions'
  | 'react-interview-questions'
  | 'svelte-interview-questions'
  | 'vanilla-javascript-interview-questions'
  | 'vue-interview-questions';
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
  | 'array'
  | 'async'
  | 'bfs'
  | 'binary-search-tree'
  | 'binary-search'
  | 'binary-tree'
  | 'binary'
  | 'browser'
  | 'closure'
  | 'css'
  | 'dfs'
  | 'dynamic-programming'
  | 'graph'
  | 'greedy'
  | 'heap'
  | 'html'
  | 'i18n'
  | 'intervals'
  | 'javascript'
  | 'linked-list'
  | 'matrix'
  | 'networking'
  | 'oop'
  | 'performance'
  | 'queue'
  | 'react-hooks'
  | 'react'
  | 'recursion'
  | 'security'
  | 'seo'
  | 'sorting'
  | 'stack'
  | 'string'
  | 'testing'
  | 'topological-sort'
  | 'tree'
  | 'trie'
  | 'ui-component'
  | 'web-api';

export type QuestionQuiz = QuestionBase;

export type QuestionListTypeDataFilters = Readonly<{
  formats?: Array<QuestionCodingFormat>;
}>;
export type QuestionListTypeData =
  | Readonly<{
      filters?: QuestionListTypeDataFilters;
      tab?: QuestionPracticeFormat;
      title?: string; // For SEO pages with custom title
      type: 'framework';
      value: QuestionFramework;
    }>
  | Readonly<{
      filters?: QuestionListTypeDataFilters;
      tab?: QuestionPracticeFormat;
      title?: string; // For SEO pages with custom title
      type: 'language';
      value: QuestionLanguage;
    }>
  | Readonly<{
      tab?: QuestionPracticeFormat;
      type: 'practice';
      value: 'practice';
    }>
  | Readonly<{
      tab?: QuestionPracticeFormat; // Not used by format list
      type: 'format';
      value: QuestionFormatForList;
    }>
  | Readonly<{
      tab?: QuestionPracticeFormat; // Not used by study list
      type: 'study-list';
      value: string;
    }>;
