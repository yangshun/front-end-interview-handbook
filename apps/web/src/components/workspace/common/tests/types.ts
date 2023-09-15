import type { TestError } from '@codesandbox/sandpack-client';

export type Spec = Describe & Readonly<{ error?: TestError }>;

export type Describe = Readonly<{
  describes: Record<string, Describe>;
  name: string;
  tests: Record<string, Test>;
}>;

export type TestStatus = 'fail' | 'idle' | 'pass' | 'running';

export type Test = Readonly<{
  blocks: Array<string>;
  duration?: number | undefined;
  errors: Array<TestError>;
  name: string;
  path: string;
  status: TestStatus;
}>;

export type TestResults = Readonly<{
  fail: number;
  pass: number;
  skip: number;
  total: number;
}>;

export type SuiteResults = Readonly<{
  fail: number;
  pass: number;
  total: number;
}>;
