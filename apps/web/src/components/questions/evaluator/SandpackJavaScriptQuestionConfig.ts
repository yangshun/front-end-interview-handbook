import type { SandpackSetup } from '@codesandbox/sandpack-react';

export const customSetup: SandpackSetup = {
  dependencies: {
    expect: '22.1.0',
    'jest-circus': '22.1.4',
    react: '18.2.0',
  },
};

export function makeJavaScriptQuestionSandpackSetup(
  slug: string,
  code: string | null,
  tests: string | null,
) {
  return {
    '/index.html': {
      code: indexHTMLCode,
      hidden: true,
    },
    '/src/circus.js': {
      code: circusCode,
      hidden: true,
    },
    '/src/index.js': {
      code: indexCode,
      hidden: true,
    },
    '/src/index.test.js': `
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  it,
} from './circus';
${(tests ?? '')
  .replace(`./${slug}`, './solution')
  .replace('describe(', 'export default function runTest() {\n  describe(')}}
`.trim(),
    '/src/solution.js': {
      active: true,
      code: (code ?? '').trim(),
    },
  };
}

const indexCode = `
import initTests from './index.test';
import { run, resetTestState } from "./circus";

// Need to do this so that the event listener which is only initialized once
// always runs the latest initTests.
global.__GFE_initTests = initTests;

// Make sure that we only add the event listener once.
if (!global.__GFE_INITIALIZED__) {
  global.__GFE_INITIALIZED__ = true;
  window.addEventListener('message', async (event) => {
    if (!event.data || event.data.source !== 'gfe') {
      return;
    }

    switch (event.data.type) {
      case 'start_tests': {
        global.__GFE_initTests();
        window.parent.postMessage({source: 'gfe', type: 'tests_start'}, '*');
        const val = await run();
        setTimeout(() => {
          window.parent.postMessage({source: 'gfe', type: 'tests_complete', payload: val}, '*');
        }, 0);
        resetTestState();
      }
    }
  });
}
`.trim();

const circusCode = `
/* eslint-disable
  no-use-before-define,
  no-restricted-syntax,
  no-await-in-loop
*/
import {
  getState,
  setState,
  dispatch,
  ROOT_DESCRIBE_BLOCK_NAME
} from "jest-circus/build/state";
import {
  makeDescribe,
  callAsyncFn,
  getAllHooksForDescribe,
  getEachHooksForTest,
  makeTestResults
} from "jest-circus/build/utils";
import { describe, it, test, beforeEach, afterEach } from "jest-circus";

import expect from "expect";

const currentDescribeBlocks = [];

const run = async () => {
  const { rootDescribeBlock } = getState();
  currentDescribeBlocks.length = 0;
  dispatch({ name: "run_start" });
  await _runTestsForDescribeBlock(rootDescribeBlock);
  dispatch({ name: "run_finish" });
  const results = makeTestResults(getState().rootDescribeBlock);
  const total = results.length;
  const passed = results.reduce(
    (acc, result) => acc + (result.status === "pass" ? 1 : 0),
    0
  );
  const failed = results.reduce(
    (acc, result) => acc + (result.status === "fail" ? 1 : 0),
    0
  );
  const skipped = results.reduce(
    (acc, result) => acc + (result.status === "skip" ? 1 : 0),
    0
  );

  return {
    summary: {
      total,
      passed,
      failed,
      skipped
    },
    results
  };
};

const _setGlobalState = (test) => {
  const { testPath: currentTestPath } = expect.getState();
  const [testPath, testName] = test.name.split(":#:");

  // remove root block
  const [, ...describeBlocks] = [...currentDescribeBlocks];
  const describeName =
    describeBlocks.length > 0 ? describeBlocks.join(" ") + " " : "";

  const currentTestName = describeName + testName;
  const update = { currentTestName };
  if (testPath == null || currentTestPath !== testPath) {
    update.testPath = testPath;
  }

  expect.setState(update);
};

const _runTestsForDescribeBlock = async (describeBlock) => {
  currentDescribeBlocks.push(describeBlock.name);
  dispatch({ describeBlock, name: "run_describe_start" });
  const { beforeAll, afterAll } = getAllHooksForDescribe(describeBlock);

  for (const hook of beforeAll) {
    _callHook(hook);
  }
  for (const test of describeBlock.tests) {
    await _runTest(test);
  }
  for (const child of describeBlock.children) {
    await _runTestsForDescribeBlock(child);
  }

  for (const hook of afterAll) {
    _callHook(hook);
  }
  dispatch({ describeBlock, name: "run_describe_finish" });
  currentDescribeBlocks.pop();
};

const _runTest = async (test) => {
  const testContext = Object.create(null);

  const isSkipped =
    test.mode === "skip" ||
    (getState().hasFocusedTests && test.mode !== "only");

  if (isSkipped) {
    dispatch({ name: "test_skip", test });
    return;
  }

  const { afterEach, beforeEach } = getEachHooksForTest(test);

  for (const hook of beforeEach) {
    await _callHook(hook, testContext);
  }

  await _callTest(test, testContext);

  for (const hook of afterEach) {
    await _callHook(hook, testContext);
  }
};

const _callHook = (hook, testContext) => {
  dispatch({ hook, name: "hook_start" });
  const { testTimeout: timeout } = getState();
  return callAsyncFn(hook.fn, testContext, { isHook: true, timeout })
    .then(() => dispatch({ hook, name: "hook_success" }))
    .catch((error) => dispatch({ error, hook, name: "hook_failure" }));
};

const _callTest = async (
  test,
  testContext,
) => {
  dispatch({ name: "test_start", test });
  const { testTimeout: timeout } = getState();

  if (!test.fn) {
    throw Error("Tests with no 'fn' should have 'mode' set to 'skipped'");
  }
  _setGlobalState(test);

  return callAsyncFn(test.fn, testContext, { isHook: false, timeout })
    .then(() => dispatch({ name: "test_success", test }))
    .catch((error) => dispatch({ error, name: "test_failure", test }));
};

function resetTestState() {
  const ROOT_DESCRIBE_BLOCK = makeDescribe(ROOT_DESCRIBE_BLOCK_NAME);
  const INITIAL_STATE = {
    currentDescribeBlock: ROOT_DESCRIBE_BLOCK,
    expand: undefined,
    hasFocusedTests: false,
    rootDescribeBlock: ROOT_DESCRIBE_BLOCK,
    testTimeout: 5000
  };

  expect.setState({
    assertionCalls: 0,
    expectedAssertionsNumber: null,
    isExpectingAssertions: false,
    suppressedErrors: [],
    testPath: null,
    currentTestName: null
  });

  setState(INITIAL_STATE);
}

export {
  // Jest
  describe,
  beforeEach,
  afterEach,
  it,
  test,
  expect,
  // Custom
  run,
  resetTestState,
};
`.trim();

const indexHTMLCode = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body>
  <script src="src/index.js"></script>
</body>
</html>
`.trim();
