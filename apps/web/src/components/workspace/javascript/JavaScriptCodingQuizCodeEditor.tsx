import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import { useRef, useState } from 'react';
import { RiArrowGoBackLine, RiPlayLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

import Button from '~/components/ui/Button';
import { themeBorderColor } from '~/components/ui/theme';
import JavaScriptConsoleForQuiz from '~/components/workspace/common/console/JavaScriptConsoleForQuiz';

import MonacoEditor from '@monaco-editor/react';

const CONSOLE_METHODS = [
  'log',
  'debug',
  'info',
  'warn',
  'error',
  'table',
  'clear',
  'time',
  'timeEnd',
  'count',
  'assert',
] as const;

type Method = (typeof CONSOLE_METHODS)[number];

type Log = Readonly<{
  data: Array<unknown>;
  id: string;
  method: Method;
}>;

type Props = Readonly<{
  initialCode: string;
}>;

export default function JavaScriptCodingQuizCodeEditor({ initialCode }: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<Array<Log>>([]);

  function runCode() {
    setOutput([]); // Reset the output state

    if (!editorRef.current) {
      return;
    }

    const sourceCode = editorRef.current.getValue(); // Fetch the code from editor

    if (!sourceCode) {
      return;
    }

    const originalConsoleMethods: Partial<
      Record<keyof Console, Console[keyof Console]>
    > = {};

    const countMap: Record<string, number> = {}; // Store count for each label
    const timeMap: Record<string, number> = {}; // Store start time for console.time

    // General function to wrap console methods
    function wrapConsoleMethod(method: Method) {
      originalConsoleMethods[method] = (console as Console)[
        method as keyof Console
      ]; // Store original method

      switch (method) {
        case 'count':
          // Custom implementation for console.count
          (console as Console)[method] = (label = 'default') => {
            countMap[label] = (countMap[label] || 0) + 1; // Increment the counter for the label

            setOutput((prevOutput) => [
              ...prevOutput,
              {
                data: [`${label}: ${countMap[label]}`],
                id: uuidv4(),
                method, // Display the label with its count
              },
            ]);
          };
          break;

        case 'time':
          // Custom implementation for console.time
          (console as Console)[method] = (label = 'default') => {
            timeMap[label] = performance.now(); // Store the current time for the label
          };
          break;

        case 'timeEnd':
          // Custom implementation for console.timeEnd
          (console as Console)[method] = (label = 'default') => {
            const startTime = timeMap[label];

            if (startTime) {
              const duration = performance.now() - startTime;

              setOutput((prevOutput) => [
                ...prevOutput,
                {
                  data: [`${label}: ${duration.toFixed(3)}ms`],
                  id: uuidv4(),
                  method: 'timeEnd', // Display the label with elapsed time
                },
              ]);
              delete timeMap[label]; // Remove the timer after ending it
            } else {
              setOutput((prevOutput) => [
                ...prevOutput,
                {
                  data: [`No such label: ${label}`],
                  id: uuidv4(),
                  method: 'error', // Handle case where timeEnd is called without starting a timer
                },
              ]);
            }
          };
          break;

        default:
          // For other console methods (log, warn, etc.)
          (console as Console)[method] = (...args: Array<unknown>) => {
            setOutput((prevOutput) => [
              ...prevOutput,
              { data: args, id: uuidv4(), method },
            ]);
            (originalConsoleMethods as any)[method](...args);
          };
          break;
      }
    }

    // Override each console method
    CONSOLE_METHODS.forEach(wrapConsoleMethod);

    try {
      // Using eval to execute the code with the overridden console
      const result = eval(sourceCode);

      if (result !== undefined) {
        // If eval returned something, push it to the logs
        setOutput((prevOutput) => [
          ...prevOutput,
          { data: [result], id: uuidv4(), method: 'log' },
        ]);
      }
    } catch (error: unknown) {
      // Capture any error and log it
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      // Restore all original console methods after execution
      CONSOLE_METHODS.forEach((method) => {
        (console as any)[method] = originalConsoleMethods[method];
      });
    }
  }

  function resetCode() {
    setCode(initialCode);
    setOutput([]); // Clear the console output
  }

  return (
    <div className={clsx('flex flex-col gap-2')}>
      {/* Monaco Editor Component */}
      <MonacoEditor
        defaultLanguage="javascript"
        height="300px"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || '')}
        onMount={(editorInstance) => {
          editorRef.current = editorInstance;
          editorInstance.focus();
        }}
      />
      <div className={clsx('flex gap-4')}>
        <div className={clsx('flex flex-col gap-2')}>
          <Button
            addonPosition="start"
            icon={RiPlayLine}
            isDisabled={false}
            label="Run"
            size="xs"
            tooltip="Run code"
            variant="primary"
            onClick={() => {
              runCode();
            }}
          />
          <Button
            addonPosition="start"
            icon={RiArrowGoBackLine}
            isDisabled={false}
            label="Reset"
            size="xs"
            tooltip="Reset code"
            variant="secondary"
            onClick={() => {
              resetCode();
            }}
          />
        </div>

        {/* Output Section */}
        {output.length > 0 && (
          <div
            className={clsx('h-56 flex-1 rounded-lg border', themeBorderColor)}>
            <JavaScriptConsoleForQuiz logs={output} />
          </div>
        )}
      </div>
    </div>
  );
}
