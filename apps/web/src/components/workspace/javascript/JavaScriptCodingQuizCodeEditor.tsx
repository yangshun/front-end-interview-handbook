import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import { RiArrowGoBackLine, RiCloseLine, RiPlayLine } from 'react-icons/ri';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { v4 as uuidv4 } from 'uuid';

import MDXCodeBlock, {
  convertContentToCode,
} from '~/components/mdx/MDXCodeBlock';
import Button from '~/components/ui/Button';
import { themeBorderColor } from '~/components/ui/theme';
import JavaScriptConsoleLite from '~/components/workspace/common/console/JavaScriptConsoleLite';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '../common/CodingWorkspaceDivider';

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

type Props = React.ComponentProps<typeof MDXCodeBlock>;

export default function JavaScriptCodingQuizCodeEditor(props: Props) {
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const codeBlockHeight = useRef(100);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  // eslint-disable-next-line react/destructuring-assignment
  const maybeCode = convertContentToCode(props.children);

  const [isExecutionMode, setIsExecutionMode] = useState(false);
  const [code, setCode] = useState(maybeCode!.code);
  const [output, setOutput] = useState<Array<Log>>([]);

  function runCode() {
    setOutput([]); // Reset the output state

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
            const sanitizedArgs = args.map((arg) => {
              // Check if `arg` is `globalThis` and replace it with a safe object
              if (arg === window) {
                return '[object Window]'; // Or return a safe subset, e.g., `{ windowLocation: globalThis.location }`
              }

              return arg;
            });

            setOutput((prevOutput) => [
              ...prevOutput,
              { data: sanitizedArgs, id: uuidv4(), method },
            ]);
            (originalConsoleMethods as any)[method](...sanitizedArgs);
          };
          break;
      }
    }

    // Override each console method
    CONSOLE_METHODS.forEach(wrapConsoleMethod);

    try {
      // Using eval to execute the code with the overridden console
      const modifiedCode = code.replace(
        /console\.log\((\s*this\s*)\)/g,
        'console.log(this || window)',
      );
      // Using eval to execute the modified code with the overridden console
      const result = eval(`${modifiedCode}; void 0;`);

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (console as any)[method] = originalConsoleMethods[method];
      });
    }
  }

  function resetCode() {
    setCode(maybeCode!.code);
    setOutput([]); // Clear the console output
  }

  useEffect(() => {
    if (codeBlockRef.current?.offsetHeight != null) {
      codeBlockHeight.current = Math.min(
        codeBlockRef.current?.getBoundingClientRect().height,
        400,
      );
    }
  });

  if (!isExecutionMode) {
    return (
      <div ref={codeBlockRef} className="relative">
        <MDXCodeBlock {...props} />
        <Button
          addonPosition="start"
          className="absolute bottom-3 right-3"
          icon={RiPlayLine}
          label="Run"
          size="xs"
          variant="secondary"
          onClick={() => {
            setIsExecutionMode(true);
            runCode();
          }}
        />
      </div>
    );
  }

  return (
    <PanelGroup direction="horizontal">
      <Panel
        className="size-full flex flex-col gap-2"
        defaultSize={60}
        minSize={30}>
        <MonacoCodeEditor
          className={clsx('overflow-hidden rounded-lg', [
            'border',
            themeBorderColor,
          ])}
          height={codeBlockHeight.current}
          keepCurrentModel={false}
          language="javascript"
          options={{ fontSize: 13 }}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={(editorInstance) => {
            editorRef.current = editorInstance;
            editorInstance.focus();
          }}
        />
        <div className={clsx('flex justify-end')}>
          <Button
            addonPosition="start"
            icon={RiCloseLine}
            isDisabled={false}
            label="Close"
            size="xs"
            tooltip="Close editor"
            variant="tertiary"
            onClick={() => {
              setIsExecutionMode(false);
            }}
          />
          <Button
            addonPosition="start"
            className="mr-1"
            icon={RiArrowGoBackLine}
            isDisabled={false}
            label="Reset"
            size="xs"
            tooltip="Reset code"
            variant="tertiary"
            onClick={() => {
              resetCode();
            }}
          />
          <Button
            addonPosition="start"
            icon={RiPlayLine}
            isDisabled={false}
            label="Run"
            size="xs"
            tooltip="Execute code"
            variant="secondary"
            onClick={() => {
              runCode();
            }}
          />
        </div>
      </Panel>
      <PanelResizeHandle
        className={CodingWorkspaceDividerWrapperClassname('vertical')}>
        <CodingWorkspaceDivider direction="vertical" />
      </PanelResizeHandle>
      <Panel minSize={30}>
        <div
          className={clsx(
            'size-full flex flex-col',
            'overflow-hidden rounded-lg',
            ['border', themeBorderColor],
          )}>
          <div className="h-0 grow">
            <JavaScriptConsoleLite logs={output} />
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
}
