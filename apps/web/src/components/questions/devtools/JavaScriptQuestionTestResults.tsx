import { Fragment, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CheckboxInput from '~/components/ui/CheckboxInput';
import Spinner from '~/components/ui/Spinner';
import type { TextColor } from '~/components/ui/Text';
import Text from '~/components/ui/Text';

import JavaScriptTestCodesEmitter from '../content/JavaScriptTestCodesEmitter';
import type {
  CodingQuestionSubmissionResult,
  CodingQuestionSubmissionResultStatus,
  JestTestReport,
  JestTestResult,
} from '../evaluator/CodingQuestionEvaluator';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
type Props = Readonly<{
  isRunningCode?: boolean;
  result?: CodingQuestionSubmissionResult | null;
}>;

function useStatusLabels() {
  const intl = useIntl();
  const statusLabels: Record<
    CodingQuestionSubmissionResultStatus,
    Readonly<{
      color: TextColor;
      label: string;
    }>
  > = {
    ACCEPTED: {
      color: 'success',
      label: intl.formatMessage({
        defaultMessage: 'Accepted',
        description: 'Status label for question answered correctly',
        id: 'f3e84v',
      }),
    },
    ERROR: {
      color: 'secondary',
      label: intl.formatMessage({
        defaultMessage: 'Compilation Error',
        description: 'Status label for compilation error when code is run',
        id: 'nzauMv',
      }),
    },
    WRONG_ANSWER: {
      color: 'error',
      label: intl.formatMessage({
        defaultMessage: 'Wrong Answer',
        description: 'Status label for incorrect answer given',
        id: 'Ku1Crp',
      }),
    },
  };

  return statusLabels;
}

function TestResultStatusLabel({
  status,
}: Readonly<{
  status: CodingQuestionSubmissionResultStatus;
}>) {
  const statusLabels = useStatusLabels();
  const { label, color } = statusLabels[status];

  return (
    <Text color={color} variant="body2" weight="bold">
      {label}
    </Text>
  );
}

function TestResultItem({
  result,
}: Readonly<{
  result: JestTestResult;
}>) {
  const [showStackTrace, setShowStackTrace] = useState(false);
  const intl = useIntl();

  const displayPath = result.testPath.slice(1);

  return (
    <div className="space-y-2 rounded bg-slate-100 p-2">
      <div className="flex items-center gap-2">
        {result.status === 'pass' && (
          <CheckIcon
            aria-hidden={true}
            className="text-success h-5 w-5 shrink-0"
          />
        )}
        {result.status === 'fail' && (
          <XMarkIcon
            aria-hidden={true}
            className="text-danger h-5 w-5 shrink-0"
          />
        )}
        <Text className="flex flex-wrap items-center gap-1" variant="body2">
          {displayPath.map((path, index) => (
            <Fragment key={path}>
              {index > 0 && (
                <ChevronRightIcon aria-hidden={true} className="h-4 w-4" />
              )}{' '}
              <button
                className="hover:underline"
                type="button"
                onClick={() => {
                  JavaScriptTestCodesEmitter.emit('show_test_cases', {
                    index,
                    path: displayPath,
                  });
                }}>
                {path}
              </button>{' '}
            </Fragment>
          ))}
          {result.status === 'fail' && (
            <span>
              (
              <button
                className="text-brand-600 text-xs"
                type="button"
                onClick={() => {
                  setShowStackTrace(!showStackTrace);
                }}>
                {showStackTrace
                  ? intl.formatMessage({
                      defaultMessage: 'Hide Details',
                      description:
                        'Label for button that allows users to collapse details of the code execution in the coding workspace',
                      id: 'vO1Ejd',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Show',
                      description:
                        'Label for button that shows the details of the code execution to the user in the coding workspace',
                      id: '6IwcDT',
                    })}
              </button>
              )
            </span>
          )}
        </Text>
      </div>
      {showStackTrace &&
        result.errors.map((error) => (
          <Text key={error} display="block" variant="body3">
            <pre className="space-y-1 overflow-x-auto border-t border-slate-200 p-2 pb-0">
              {error.replaceAll(/https.*codesandbox\.io/g, '')}
            </pre>
          </Text>
        ))}
    </div>
  );
}

function TestResultStats({
  results,
}: Readonly<{
  results: JestTestReport;
}>) {
  const { failed, passed, total } = results.summary;

  return (
    <div className="flex space-x-4">
      {failed > 0 && (
        <Text color="error" variant="body2" weight="bold">
          <FormattedMessage
            defaultMessage="{numberOfFailedTests} failed"
            description="Line in DevTools showing the number of test cases failed when running the code submitted by the user"
            id="VoNloX"
            values={{
              numberOfFailedTests: failed,
            }}
          />
        </Text>
      )}
      {passed > 0 && (
        <Text color="success" variant="body2" weight="bold">
          <FormattedMessage
            defaultMessage="{numberOfPassedTests} passed"
            description="Line in DevTools showing the number of test cases passed when running the code submitted by the user"
            id="zpxxHX"
            values={{
              numberOfPassedTests: passed,
            }}
          />
        </Text>
      )}
      {total > 0 && (
        <Text color="secondary" variant="body2" weight="bold">
          <FormattedMessage
            defaultMessage="{numberOfTotalTests} total"
            description="Line in DevTools showing the total number of test cases for this question"
            id="Iz2KAM"
            values={{
              numberOfTotalTests: total,
            }}
          />
        </Text>
      )}
    </div>
  );
}

function JavaScriptQuestionTestResult({
  result,
}: Readonly<{
  result: CodingQuestionSubmissionResult;
}>): JSX.Element {
  const [showOnlyFailedTests, setShowOnlyFailedTests] = useState(false);
  const intl = useIntl();

  switch (result.status) {
    case 'ACCEPTED':
    case 'WRONG_ANSWER': {
      return (
        <div className="flex h-full flex-col gap-4">
          <div className="flex justify-between gap-8">
            <div className="flex gap-4">
              <TestResultStatusLabel status={result.status} />
              {result.status === 'WRONG_ANSWER' && (
                <CheckboxInput
                  label={intl.formatMessage({
                    defaultMessage: 'Show only failed tests',
                    description:
                      'Checkbox for whether to show only failed test cases',
                    id: 'K08edE',
                  })}
                  value={showOnlyFailedTests}
                  onChange={(value) => {
                    setShowOnlyFailedTests(value);
                  }}
                />
              )}
            </div>
            <TestResultStats results={result.report} />
          </div>
          <ul className="space-y-2 overflow-y-auto pb-2" role="list">
            {result.report.results
              .filter(
                (resultItem) =>
                  !showOnlyFailedTests ||
                  (showOnlyFailedTests && resultItem.status === 'fail'),
              )
              .map((resultItem) => (
                <li key={resultItem.testPath.join('$GFE$')}>
                  <TestResultItem result={resultItem} />
                </li>
              ))}
          </ul>
        </div>
      );
    }
    case 'ERROR': {
      return (
        <div className="space-y-4">
          <TestResultStatusLabel status={result.status} />
          <Text display="block" variant="body2">
            <pre className="rounded bg-slate-100 p-4">{result.message}</pre>
          </Text>
        </div>
      );
    }
  }
}

export default function JavaScriptQuestionTestResults({
  result,
  isRunningCode = false,
}: Props) {
  if (isRunningCode) {
    return (
      <div className="flex h-full grow flex-col items-center justify-center gap-y-2 py-4 px-4 text-center sm:px-6 lg:px-4">
        <Spinner display="block" size="md" />
        <Text color="secondary" display="block" variant="body2">
          <FormattedMessage
            defaultMessage="Evaluating tests against code..."
            description="Loading text that appears when the tests cases are running (after the user submits their code in the coding workspace)"
            id="vqTecf"
          />
        </Text>
      </div>
    );
  }
  if (result == null) {
    return (
      <div className="flex h-full grow flex-col items-center justify-center gap-y-2 py-4 px-4 text-center sm:px-6 lg:px-4">
        <ClipboardDocumentCheckIcon className="h-12 w-12 text-slate-300" />
        <Text color="secondary" display="block" variant="body2">
          <FormattedMessage
            defaultMessage="Submit your code to check against the tests."
            description="Text that appears in the DevTool under the Tests tab before the user has submitted their code"
            id="fvztbG"
          />
        </Text>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col px-4 pt-4 sm:px-6 lg:px-4">
      <JavaScriptQuestionTestResult result={result} />
    </div>
  );
}
