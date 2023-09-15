import cleanSet from 'clean-set';

import type { Describe, Spec, SuiteResults,Test, TestResults } from './types';

export const getTests = (block: Describe | Spec): Array<Test> =>
  Object.values(block.tests ?? {}).concat(
    ...Object.values(block.describes ?? {}).map(getTests),
  );

export const getFailingTests = (block: Describe | Spec): Array<Test> =>
  getTests(block).filter((t) => t.status === 'fail');

export const getAllTestResults = (specs: Array<Spec>): TestResults =>
  specs.map(getSpecTestResults).reduce(
    (acc, stats) => {
      return {
        fail: acc.fail + stats.fail,
        pass: acc.pass + stats.pass,
        skip: acc.skip + stats.skip,
        total: acc.total + stats.total,
      };
    },
    { fail: 0, pass: 0, skip: 0, total: 0 },
  );

export const getSpecTestResults = (spec: Spec): TestResults =>
  getTests(spec).reduce(
    (acc, test) => {
      return {
        fail: test.status === 'fail' ? acc.fail + 1 : acc.fail,
        pass: test.status === 'pass' ? acc.pass + 1 : acc.pass,
        skip:
          test.status === 'idle' || test.status === 'running'
            ? acc.skip + 1
            : acc.skip,
        total: acc.total + 1,
      };
    },
    { fail: 0, pass: 0, skip: 0, total: 0 },
  );

export const getAllSuiteResults = (specs: Array<Spec>): SuiteResults =>
  specs
    .filter(
      (spec) =>
        Object.values(spec.describes ?? {}).length > 0 ||
        Object.values(spec.tests ?? {}).length > 0,
    )
    .map(getSpecTestResults)
    .reduce(
      (acc, stats) => {
        return {
          fail: acc.fail + (stats.fail > 0 ? 1 : 0),
          pass: acc.pass + (stats.fail === 0 ? 1 : 0),
          total: acc.total + 1,
        };
      },
      { fail: 0, pass: 0, total: 0 },
    );

export const getDuration = (specs: Array<Spec>): number =>
  flatMap(specs, getTests).reduce((acc, test) => acc + (test.duration || 0), 0);

export const isEmpty = (block: Describe | Spec): boolean =>
  Object.values(block.describes ?? {}).length === 0 &&
  Object.values(block.tests ?? {}).length === 0;

export const splitTail = <A>(as: Array<A>): [Array<A>, A | undefined] => {
  const lastIndex = as.length - 1;
  const head = as.slice(0, lastIndex);
  const tail = as[lastIndex];

  return [head, tail];
};

export const flatMap = <A, B>(as: Array<A>, f: (a: A) => Array<B>): Array<B> =>
  as.map(f).reduce((acc, next) => acc.concat(next), []);

export const set =
  (path: Array<string>, value: unknown) =>
  <A extends Record<string, any>>(object: A): A =>
    cleanSet(object, path, value);
