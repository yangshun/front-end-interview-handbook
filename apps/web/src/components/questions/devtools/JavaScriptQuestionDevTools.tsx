import { useIntl } from 'react-intl';

import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import JavaScriptConsole from './JavaScriptConsole';
import JavaScriptQuestionTestResults from './JavaScriptQuestionTestResults';
import type { CodingQuestionSubmissionResult } from '../evaluator/CodingQuestionEvaluator';

import { useSandpackConsole } from '@codesandbox/sandpack-react';

export type JavaScriptQuestionDevToolsMode = 'console' | 'tests';
type Props = Readonly<{
  availableModes: ReadonlyArray<JavaScriptQuestionDevToolsMode>;
  isRunningCode?: boolean;
  mode: JavaScriptQuestionDevToolsMode;
  onChangeMode: (mode: JavaScriptQuestionDevToolsMode) => void;
  result?: CodingQuestionSubmissionResult | null;
  runAttempt?: number;
}>;

export default function JavaScriptQuestionDevTools({
  availableModes,
  runAttempt = 0,
  isRunningCode = false,
  mode,
  result,
  onChangeMode,
}: Props) {
  const { logs, reset } = useSandpackConsole({
    showSyntaxError: false,
  });

  const intl = useIntl();

  const tabs: ReadonlyArray<TabItem<JavaScriptQuestionDevToolsMode>> =
    availableModes.map((modeItem) => {
      switch (modeItem) {
        case 'console': {
          return {
            label:
              intl.formatMessage({
                defaultMessage: `Console`,
                description: 'Label for Console tab on the coding workspace',
                id: 'NMKLAX',
              }) + ((logs?.length ?? 0) > 0 ? ` (${logs?.length})` : ''),
            value: modeItem,
          };
        }
        case 'tests':
          return {
            label: intl.formatMessage({
              defaultMessage: 'Tests',
              description: 'Label for Tests tab on the coding workspace',
              id: 'qfX/3p',
            }),
            value: modeItem,
          };
      }
    });

  return (
    <div className="flex h-full flex-col">
      <div className="shrink px-4 sm:px-6 lg:px-2">
        <Tabs
          label={intl.formatMessage({
            defaultMessage: 'Select navigation item in DevTool',
            description: 'Label for tabs in the coding workspace DevTool',
            id: '4zNzv1',
          })}
          size="sm"
          tabs={tabs}
          value={mode}
          onSelect={onChangeMode}
        />
      </div>
      <div className="grow overflow-y-auto">
        {(() => {
          switch (mode) {
            case 'console':
              return (
                <JavaScriptConsole
                  logs={logs}
                  onClear={() => {
                    reset();
                  }}
                />
              );
            case 'tests':
              return (
                <JavaScriptQuestionTestResults
                  key={runAttempt}
                  isRunningCode={isRunningCode}
                  result={result}
                />
              );
          }
        })()}
      </div>
    </div>
  );
}
