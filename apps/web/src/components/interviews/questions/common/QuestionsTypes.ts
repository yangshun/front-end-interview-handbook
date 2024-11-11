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

export type QuestionUserInterfaceSandpackSetup = SandboxTemplate & {
  readonly activeFile?: string;
  readonly visibleFiles?: Array<string>;
};
export type QuestionUserInterfaceBundle = Readonly<{
  author: string | null;
  files: SandpackFiles;
  workspace: QuestionUserInterfaceWorkspace;
  writeup: string | null;
}>;

export type QuestionMetadata = {
  readonly access: QuestionAccess;
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
  readonly gitHubEditUrl?: string | null;
  readonly href: string;
  readonly importance: QuestionImportance;
  readonly languages: ReadonlyArray<QuestionLanguage>;
  readonly nextQuestions: ReadonlyArray<QuestionSlug>;
  readonly published: boolean;
  // Value from 1-100 where 1 is the highest ranking.
  readonly ranking: number;
  readonly similarQuestions: ReadonlyArray<QuestionSlug>;
  readonly slug: QuestionSlug;
  readonly subtitle: string | null;
  readonly title: string;
  readonly topics: ReadonlyArray<QuestionTopic>;
};

export type QuestionBase = {
  readonly description: string | null;
  readonly format: QuestionFormat;
  readonly metadata: QuestionMetadata;
  readonly solution: string | null;
};

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
export type QuestionJavaScript = QuestionBase & {
  files: Record<string, string>;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
};

export type QuestionUserInterfaceWorkspace = Readonly<{
  activeFile?: string;
  environment: SandboxEnvironment;
  visibleFiles?: Array<string>;
}>;

export type QuestionUserInterface = QuestionBase & {
  readonly framework: QuestionFramework;
  readonly skeletonBundle: QuestionUserInterfaceBundle;
  readonly solutionBundle: QuestionUserInterfaceBundle;
};

export type QuestionMetadataWithCompletedStatus = QuestionMetadata & {
  readonly isCompleted: boolean;
};

export type QuestionTopic =
  | 'a11y'
  | 'css'
  | 'html'
  | 'i18n'
  | 'javascript'
  | 'network'
  | 'performance'
  | 'security'
  | 'testing';

export type QuestionQuiz = QuestionBase;

export type QuestionFeatureType =
  | 'company-guides'
  | 'company-tags'
  | 'focus-areas'
  | 'official-solutions'
  | 'premium-questions'
  | 'study-plans';
