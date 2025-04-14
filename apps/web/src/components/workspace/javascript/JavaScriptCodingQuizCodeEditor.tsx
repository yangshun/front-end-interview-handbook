'use client';

import clsx from 'clsx';
import { Decode, Hook } from 'console-feed';
import type { Message } from 'console-feed/lib/definitions/Component';
import type { editor } from 'monaco-editor';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import { RiArrowGoBackLine, RiCloseLine, RiPlayLine } from 'react-icons/ri';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { useIntl } from '~/components/intl';
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

type Props = React.ComponentProps<typeof MDXCodeBlock>;

const srcDoc = `
<head>
  <script>
    window.addEventListener('message', (event) => {
      try {
        const result = eval(event.data.code);

        if (result !== undefined) {
          switch (true) {
            case result instanceof Promise:
              break;
            case typeof result === "function":
              break;
            case typeof result === "symbol":
              console.log(result.toString());
              break;
            case typeof result === "bigint":
              console.log(result.toString() + "n");
              break;
            default:
              console.log(result);
          }
        }
      } catch (err) {
        console.error(err);
      }
    });
  </script>
</head>
`;

export default function JavaScriptCodingQuizCodeEditor(props: Props) {
  const intl = useIntl();
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const codeBlockHeight = useRef(100);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // This flag is used to hide the flash of "no logs" empty state before the first log appears
  const [displayConsole, setDisplayConsole] = useState(false);

  // eslint-disable-next-line react/destructuring-assignment
  const maybeCode = convertContentToCode(props.children);

  const [isExecutionMode, setIsExecutionMode] = useState(false);
  const [code, setCode] = useState(maybeCode!.code);
  const [output, setOutput] = useState<
    ComponentProps<typeof JavaScriptConsoleLite>['logs']
  >([]);

  useEffect(() => {
    if (!isExecutionMode) {
      return;
    }

    // Automatically initialize after a duration
    // in case there are really no logs
    const timer = setTimeout(() => {
      setDisplayConsole(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isExecutionMode]);

  const runCode = (): void => {
    setOutput([]); // Clear the console output

    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ code }, '*');
    }
  };

  function resetCode() {
    setCode(maybeCode!.code);
    setOutput([]);
  }

  useEffect(() => {
    if (codeBlockRef.current?.offsetHeight != null) {
      codeBlockHeight.current = Math.min(
        codeBlockRef.current?.getBoundingClientRect().height,
        400,
      );
    }
  });

  return (
    <>
      {isExecutionMode && (
        <iframe
          ref={iframeRef}
          className="hidden"
          srcDoc={srcDoc}
          onLoad={() => {
            if (iframeRef.current) {
              Hook(
                (iframeRef.current.contentWindow as IntentionallyAny).console,
                (log) => {
                  setDisplayConsole(true);

                  return setOutput((prevState) => [
                    ...prevState,
                    Decode(log) as Message, // https://github.com/samdenty/console-feed/issues/128
                  ]);
                },
                true, // Enables serialization of objects / other types
              );
              runCode(); // When the component enters isExecutionMode, we run the user's code as soon as the iframe loads
            }
          }}
        />
      )}
      {isExecutionMode ? (
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
                label={intl.formatMessage({
                  defaultMessage: 'Close',
                  description: 'Close coding editor button label',
                  id: 'RXjrrm',
                })}
                size="xs"
                tooltip={intl.formatMessage({
                  defaultMessage: 'Close editor',
                  description: 'Close coding editor tooltip',
                  id: '2gyjKy',
                })}
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
                label={intl.formatMessage({
                  defaultMessage: 'Reset',
                  description: 'Reset code in editor button label',
                  id: 'xIQuhQ',
                })}
                size="xs"
                tooltip={intl.formatMessage({
                  defaultMessage: 'Reset code',
                  description: 'Reset code in editor tooltip',
                  id: '0o3mWI',
                })}
                variant="tertiary"
                onClick={() => {
                  resetCode();
                }}
              />
              <Button
                addonPosition="start"
                icon={RiPlayLine}
                isDisabled={false}
                label={intl.formatMessage({
                  defaultMessage: 'Run',
                  description: 'Run code button label',
                  id: 'Yaff9b',
                })}
                size="xs"
                tooltip={intl.formatMessage({
                  defaultMessage: 'Execute code',
                  description: 'Execute code in editor tooltip',
                  id: 'gLTvN4',
                })}
                variant="secondary"
                onClick={() => {
                  runCode(); // If the user clicks run when isExecutionMode is already true, runCode() must be called explicitly
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
                {displayConsole ? (
                  <JavaScriptConsoleLite logs={output} />
                ) : null}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      ) : (
        <div ref={codeBlockRef} className="relative">
          <MDXCodeBlock {...props} />
          <Button
            addonPosition="start"
            className="absolute bottom-3 right-3"
            icon={RiPlayLine}
            label={intl.formatMessage({
              defaultMessage: 'Run',
              description: 'Run code button label',
              id: 'Yaff9b',
            })}
            size="xs"
            variant="secondary"
            onClick={() => {
              setIsExecutionMode(true);
            }}
          />
        </div>
      )}
    </>
  );
}
