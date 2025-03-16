import clsx from 'clsx';
import { Decode, Hook } from 'console-feed';
import type { Message } from 'console-feed/lib/definitions/Component';
import type { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import { RiArrowGoBackLine, RiCloseLine, RiPlayLine } from 'react-icons/ri';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

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

export default function JavaScriptCodingQuizCodeEditor(props: Props) {
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const codeBlockHeight = useRef(100);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // eslint-disable-next-line react/destructuring-assignment
  const maybeCode = convertContentToCode(props.children);

  const [isExecutionMode, setIsExecutionMode] = useState(false);
  const [code, setCode] = useState(maybeCode!.code);
  const [output, setOutput] = useState<Array<Message>>([]);

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
          srcDoc={`
          <body>
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
                  console.error("Execution Error:", err);
                }
              });
            </script>
          </body>
          `}
          style={{ display: 'none', height: '0', width: '0' }}
          onLoad={() => {
            if (iframeRef.current) {
              Hook(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (iframeRef.current.contentWindow as any).console,
                (log) => setOutput((prevState) => [...prevState, Decode(log)]),
                true, // Enables serialization of objects / other types
              );
              runCode(); // When the component enters isExecutionMode, we must the user's code as soon as the iframe loads
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
                <JavaScriptConsoleLite logs={output} />
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
            label="Run"
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
