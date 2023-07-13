import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine, RiCloseLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import useIsMounted from '~/hooks/useIsMounted';
import { useResizablePaneDivider } from '~/hooks/useResizablePaneDivider';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useToast } from '~/components/global/toasts/ToastsProvider';
import QuestionProgressAction from '~/components/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/questions/content/QuestionNextQuestions';
import type { JavaScriptQuestionDevToolsMode } from '~/components/questions/devtools/JavaScriptQuestionDevTools';
import JavaScriptQuestionDevTools from '~/components/questions/devtools/JavaScriptQuestionDevTools';
import CodeEditor from '~/components/questions/editor/CodeEditor';
import useJavaScriptQuestionCode from '~/components/questions/editor/useJavaScriptQuestionCode';
import type {
  CodingQuestionSubmissionResult,
  JestTestReport,
} from '~/components/questions/evaluator/CodingQuestionEvaluator';
import { evaluateReport } from '~/components/questions/evaluator/CodingQuestionEvaluator';
import {
  customSetup,
  makeJavaScriptQuestionSandpackSetup,
} from '~/components/questions/evaluator/SandpackJavaScriptQuestionConfig';
import useCodeSandboxStatus from '~/components/questions/evaluator/useCodeSandboxStatus';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeLineColor } from '~/components/ui/theme';
import SandpackTimeoutLogger from '~/components/workspace/SandpackTimeoutLogger';

import { useMutationQuestionProgressAdd } from '~/db/QuestionsProgressClient';
import type { QuestionProgress } from '~/db/QuestionsProgressTypes';
import logEvent from '~/logging/logEvent';

import CodingWorkspaceChangeLayoutButton from './CodingWorkspaceChangeLayoutButton';
import CodingWorkspaceEditorShortcutsButton from './CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from './CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from './CodingWorkspaceThemeSelect';
import CodingWorkspaceToolbar from './CodingWorkspaceToolbar';
import type { CodingWorkspaceLayout } from './useCodingWorkspaceLayout';
import QuestionPaneDivider from '../common/QuestionPaneDivider';
import QuestionPaneHorizontalDivider from '../common/QuestionPaneHorizontalDivider';
import sandpackProviderOptions from '../evaluator/sandpackProviderOptions';

import {
  SandpackPreview,
  SandpackProvider,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { useUser } from '@supabase/auth-helpers-react';

function Contents({
  language,
  question,
  questionProgress,
  persistCode = true,
  loadedCodeFromClientStorage,
  saveCode,
  deleteCodeFromClientStorage,
  showCompletionButton,
  showToolbar,
  layout,
  onChangeLayout,
  nextQuestions,
}: Readonly<{
  deleteCodeFromClientStorage: () => void;
  language: QuestionCodingWorkingLanguage;
  layout: CodingWorkspaceLayout;
  loadedCodeFromClientStorage: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onChangeLayout?: (newLayout: CodingWorkspaceLayout) => void;
  persistCode?: boolean;
  question: QuestionJavaScript;
  questionProgress?: QuestionProgress | null;
  saveCode: (code: string) => void;
  showCompletionButton?: boolean;
  showToolbar?: boolean;
}>) {
  const intl = useIntl();
  const { sandpack } = useSandpack();
  const containerRef = sandpack.lazyAnchorRef; // Required because of https://github.com/codesandbox/sandpack/issues/851
  const { code, updateCode } = useActiveCode();
  const [result, setResult] = useState<CodingQuestionSubmissionResult | null>(
    null,
  );
  const [showLoadedPreviousCode, setShowLoadedPreviousCode] = useState(
    loadedCodeFromClientStorage,
  );
  const [isRunningCode, setIsRunningCode] = useState(false);
  const isMounted = useIsMounted();
  const [showDevToolsPane, setShowDevToolsPane] = useState(false);
  const [devToolsMode, setDevToolsMode] =
    useState<JavaScriptQuestionDevToolsMode>('console');
  const csbStatus = useCodeSandboxStatus();
  const searchParams = useSearchParams();
  const addProgressMutation = useMutationQuestionProgressAdd();
  const user = useUser();
  const { showToast } = useToast();
  const [runAttempt, setRunAttempt] = useState(0);
  const {
    startDrag,
    isDragging,
    size: rightPaneWidth,
    setSize: setRightPaneWidth,
  } = useResizablePaneDivider(
    typeof window === 'undefined'
      ? 400
      : (containerRef?.current?.clientWidth ?? 800) / 2,
    true,
    'horizontal',
    0.5,
    () => (window.innerWidth * 2) / 3,
  );
  const {
    startDrag: startBottomSectionDividerDrag,
    isDragging: isBottomSectionDividerDragging,
    size: bottomSectionHeight,
  } = useResizablePaneDivider(400, true, 'vertical');

  useEffect(() => {
    function onIframeEvents(event: MessageEvent) {
      if (event.data && event.data.source === 'gfe') {
        switch (event.data.type) {
          case 'tests_start': {
            setIsRunningCode(true);
            setResult(null);

            return;
          }
          case 'tests_complete': {
            setIsRunningCode(false);

            const evaluationResult = evaluateReport(
              event.data.payload as JestTestReport,
            );

            setRunAttempt((attempt) => attempt + 1);
            setResult(evaluationResult);
            if (evaluationResult.status === 'ACCEPTED') {
              showToast({
                title: intl.formatMessage({
                  defaultMessage: `Woohoo! You completed the question!`,
                  description:
                    'Toast congratulating user once they mark a question as complete',
                  id: 'Gv0+LY',
                }),
                variant: 'success',
              });
              // Mark as completed in database for logged-in users.
              if (user != null && questionProgress?.status !== 'complete') {
                addProgressMutation.mutate({
                  format: question.metadata.format,
                  listKey: searchParams?.get('list') ?? undefined,
                  progressId: questionProgress?.id,
                  slug: question.metadata.slug,
                  status: 'complete',
                });
              }
            }

            return;
          }
        }
      }
    }
    window.addEventListener('message', onIframeEvents);

    return () => {
      window.removeEventListener('message', onIframeEvents);
    };
  }, [
    addProgressMutation,
    intl,
    searchParams,
    question.metadata,
    questionProgress,
    showToast,
    user,
  ]);

  function resetCode() {
    const shouldDiscard = window.confirm(
      intl.formatMessage({
        defaultMessage: 'Your existing code will be discarded, are you sure?',
        description:
          'Text on browser confirmation pop-up when user attempts to use the reset button to reset their code',
        id: '8aQEL8',
      }),
    );

    if (!shouldDiscard) {
      return;
    }
    setShowLoadedPreviousCode(false);
    updateCode(question.skeleton?.[language] ?? '');
    deleteCodeFromClientStorage();
  }

  return (
    <CodingPreferencesProvider>
      <div ref={containerRef} className="flex w-full flex-col lg:h-full">
        {showToolbar && (
          <CodingWorkspaceToolbar>
            <CodingWorkspaceThemeSelect />
            <CodingWorkspaceEditorShortcutsButton />
            <CodingWorkspaceResetButton
              onClick={() => {
                resetCode();
              }}
            />
            <CodingWorkspaceChangeLayoutButton
              layout={layout}
              onChangeLayout={(newLayout) => {
                // Automatically resize left column depending on workspace layout.
                // Vertical workspace layout: full available width.
                // Horizontal workspace layout: 1/3 of window (assuming parent gives it 2/3 of window).
                if (newLayout === 'horizontal') {
                  setRightPaneWidth(window.innerWidth / 3);
                }
                onChangeLayout?.(newLayout);
              }}
            />
            <QuestionReportIssueButton
              format={question.format}
              title={question.metadata.title}
              tooltipPosition="start"
            />
          </CodingWorkspaceToolbar>
        )}
        <div
          className={clsx(
            'flex grow flex-col',
            layout === 'horizontal' && 'lg:!flex-row',
          )}>
          <style suppressHydrationWarning={true}>{`@media (min-width: 1024px) {
          #devtool-section { ${
            layout === 'horizontal'
              ? `width: ${rightPaneWidth}px;`
              : showDevToolsPane
              ? `height: ${bottomSectionHeight}px;`
              : ''
          } }
        }`}</style>
          <div
            className={clsx(
              'h-72 px-4 sm:px-6 lg:grow lg:px-0',
              layout === 'horizontal' && 'lg:h-full lg:w-0',
              layout === 'vertical' && 'lg:h-0',
            )}>
            <CodeEditor
              key={sandpack.activeFile}
              filePath={sandpack.activeFile}
              value={code}
              onChange={(value) => {
                const newCode = value || '';

                updateCode(newCode);
                if (persistCode) {
                  saveCode(newCode);
                }
              }}
            />
          </div>
          {layout === 'horizontal' && (
            <QuestionPaneDivider onMouseDown={(event) => startDrag(event)} />
          )}
          {layout === 'vertical' && showDevToolsPane && (
            <QuestionPaneHorizontalDivider
              onMouseDown={(event) => startBottomSectionDividerDrag(event)}
            />
          )}
          <div
            className={clsx(
              'flex flex-col',
              themeBackgroundColor,
              layout === 'horizontal' && 'lg:h-full',
              // Don't allow mouse events on iframe while dragging otherwise
              // the mouseup event doesn't fire on the main window.
              (isDragging || isBottomSectionDividerDragging) &&
                'pointer-events-none touch-none select-none',
            )}
            id="devtool-section">
            <div
              aria-expanded={showDevToolsPane}
              className={clsx(
                layout === 'horizontal' && 'lg:h-0 lg:grow',
                layout === 'vertical'
                  ? showDevToolsPane
                    ? 'grow overflow-auto'
                    : 'hidden'
                  : null,
              )}>
              <JavaScriptQuestionDevTools
                availableModes={['console', 'tests']}
                isRunningCode={isRunningCode}
                mode={devToolsMode}
                result={result}
                runAttempt={runAttempt}
                showExplicitInvocationMessage={true}
                onChangeMode={setDevToolsMode}
              />
            </div>
            {isMounted() && showLoadedPreviousCode && (
              <div
                className={clsx(
                  'flex shrink-0 items-center justify-between border-t px-4 py-2 sm:px-6 lg:px-4',
                  'bg-brand-lightest dark:bg-neutral-950',
                  themeLineColor,
                )}
                suppressHydrationWarning={true}>
                <Text size="body3">
                  <FormattedMessage
                    defaultMessage="Your previous code was restored. <Anchor>Reset to default</Anchor>"
                    description="Message that appears under the coding workspace when user has previously worked on this problem and we restored their code"
                    id="nFYr2a"
                    values={{
                      Anchor: (chunks) => (
                        <Anchor
                          href="#"
                          onClick={() => {
                            resetCode();
                          }}>
                          {chunks}
                        </Anchor>
                      ),
                    }}
                  />
                </Text>
                <Button
                  className="-mr-2"
                  icon={RiCloseLine}
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Dismiss',
                    description:
                      'Label for dismiss button of previously restored prompt that appears under the coding workspace when user has previously worked on this problem and we restored their code',
                    id: '562PkG',
                  })}
                  size="xs"
                  variant="tertiary"
                  onClick={() => {
                    setShowLoadedPreviousCode(false);
                  }}
                />
              </div>
            )}
            <div
              className={clsx(
                'flex items-center justify-between border-t px-4 py-3 sm:px-6 lg:px-2 lg:py-2',
                themeLineColor,
                themeBackgroundColor,
              )}>
              <div>
                <div className={clsx(layout === 'horizontal' && 'lg:hidden')}>
                  <Button
                    icon={showDevToolsPane ? RiArrowDownSLine : RiArrowUpSLine}
                    label={
                      showDevToolsPane
                        ? intl.formatMessage({
                            defaultMessage: 'Hide DevTool',
                            description:
                              'Label for button to collapse the DevTool',
                            id: 'geCoTi',
                          })
                        : intl.formatMessage({
                            defaultMessage: 'Show DevTool',
                            description:
                              'Label for button to expand the DevTool',
                            id: 'fQHORb',
                          })
                    }
                    size="xs"
                    variant="secondary"
                    onClick={() => {
                      setShowDevToolsPane(!showDevToolsPane);
                      onChangeLayout?.('vertical');
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {showCompletionButton && (
                  <QuestionProgressAction
                    question={question}
                    questionProgress={questionProgress}
                    signInModalContents={
                      nextQuestions.length > 0 && (
                        <div className="mt-4 space-y-4">
                          <Divider />
                          <QuestionNextQuestions questions={nextQuestions} />
                        </div>
                      )
                    }
                  />
                )}
                <Button
                  isDisabled={isRunningCode || csbStatus !== 'idle'}
                  label={intl.formatMessage({
                    defaultMessage: 'Submit',
                    description:
                      'Label for button to submit code for testing within coding workspace',
                    id: 'FkGppk',
                  })}
                  size="xs"
                  variant="primary"
                  onClick={async () => {
                    setIsRunningCode(true);
                    setShowDevToolsPane(true);
                    setDevToolsMode('tests');
                    Object.values(sandpack.clients).forEach((client) => {
                      client?.iframe?.contentWindow?.postMessage(
                        { source: 'gfe', type: 'start_tests' },
                        '*',
                      );
                    });
                    logEvent('question.submit', {
                      code,
                      format: question.metadata.format,
                      slug: question.metadata.slug,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CodingPreferencesProvider>
  );
}

export default function JavaScriptWorkspace({
  instance,
  language,
  layout = 'vertical',
  onChangeLayout,
  persistCode = true,
  question,
  questionProgress,
  showCompletionButton = true,
  showToolbar = true,
  nextQuestions = [],
}: Readonly<{
  instance: string;
  language: QuestionCodingWorkingLanguage;
  layout?: CodingWorkspaceLayout;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onChangeLayout?: (newLayout: CodingWorkspaceLayout) => void;
  persistCode?: boolean;
  question: QuestionJavaScript;
  questionProgress?: QuestionProgress | null;
  showCompletionButton?: boolean;
  showToolbar?: boolean;
}>) {
  const {
    code,
    saveCode,
    deleteCodeFromClientStorage,
    loadedCodeFromClientStorage,
  } = useJavaScriptQuestionCode(question, language);

  return (
    <SandpackProvider
      customSetup={customSetup}
      files={makeJavaScriptQuestionSandpackSetup(
        language,
        question.metadata.slug,
        persistCode
          ? code
          : question.skeleton?.[language] ?? question.skeleton?.js ?? '',
        question.tests,
      )}
      options={{
        ...sandpackProviderOptions,
        classes: {
          'sp-wrapper': clsx(
            '!flex !grow !flex-col lg:!h-full !w-full lg:!w-0',
          ),
        },
      }}
      template="vanilla-ts">
      <Contents
        deleteCodeFromClientStorage={deleteCodeFromClientStorage}
        language={language}
        layout={layout}
        loadedCodeFromClientStorage={loadedCodeFromClientStorage}
        nextQuestions={nextQuestions}
        persistCode={persistCode}
        question={question}
        questionProgress={questionProgress}
        saveCode={saveCode}
        showCompletionButton={showCompletionButton}
        showToolbar={showToolbar}
        onChangeLayout={onChangeLayout}
      />
      {/* The preview component is not rendered on screen but
          needed in order for Sandpack to bundle the code. */}
      <div className="hidden">
        <SandpackPreview />
      </div>
      <SandpackTimeoutLogger instance={instance} />
    </SandpackProvider>
  );
}
