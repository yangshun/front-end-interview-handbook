'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import useIsMounted from '~/hooks/useIsMounted';
import { useResizablePaneDivider } from '~/hooks/useResizablePaneDivider';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import StatisticsPanel from '~/components/debug/StatisticsPanel';
import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import QuestionPaneDivider from '~/components/questions/common/QuestionPaneDivider';
import QuestionPaneHorizontalDivider from '~/components/questions/common/QuestionPaneHorizontalDivider';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import QuestionProgressAction from '~/components/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import QuestionsListingBreadcrumbs from '~/components/questions/common/QuestionsListingBreadcrumbs';
import type {
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import type { QuestionContentsUserInterfaceSection } from '~/components/questions/content/QuestionContentsUserInterface';
import QuestionContentsUserInterface from '~/components/questions/content/QuestionContentsUserInterface';
import QuestionNextQuestions from '~/components/questions/content/QuestionNextQuestions';
import type { JavaScriptQuestionDevToolsMode } from '~/components/questions/devtools/JavaScriptQuestionDevTools';
import JavaScriptQuestionDevTools from '~/components/questions/devtools/JavaScriptQuestionDevTools';
import CodeEditor from '~/components/questions/editor/CodeEditor';
import CodingWorkspaceEditorShortcutsButton from '~/components/questions/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/questions/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/questions/editor/CodingWorkspaceThemeSelect';
import CodingWorkspaceToolbar from '~/components/questions/editor/CodingWorkspaceToolbar';
import useUserInterfaceQuestionCode from '~/components/questions/editor/useUserInterfaceQuestionCode';
import sandpackProviderOptions from '~/components/questions/evaluator/sandpackProviderOptions';
import QuestionCodingListSlideOut from '~/components/questions/listings/QuestionCodingListSlideOut';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Button from '~/components/ui/Button';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';
import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import type { SandpackFile } from '@codesandbox/sandpack-react';
import {
  FileTabs,
  SandpackPreview,
  SandpackProvider,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

const STARTING_LEFT_PANE_WIDTH = 500;

function MiddleRightPaneContents({
  mode,
  question,
  questionProgress,
  isLeftPaneDragging,
  loadedFilesFromClientStorage,
  saveFiles,
  deleteFilesFromClientStorage,
  nextQuestions,
}: Readonly<{
  deleteFilesFromClientStorage: () => void;
  isLeftPaneDragging: boolean;
  loadedFilesFromClientStorage: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  questionProgress: QuestionProgress | null;
  saveFiles: (files: Record<string, SandpackFile>) => void;
}>) {
  const {
    startDrag,
    isDragging,
    size: rightPaneWidth,
  } = useResizablePaneDivider(
    400,
    true,
    'horizontal',
    0.5,
    () => (window.innerWidth * 2) / 3,
  );
  const {
    startDrag: startBottomSectionDividerDrag,
    isDragging: isBottomSectionDividerDragging,
    size: bottomSectionHeight,
  } = useResizablePaneDivider(300, true, 'vertical');
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();
  const [showDevToolsPane, setShowDevToolsPane] = useState(false);
  const [devToolsMode, setDevToolsMode] =
    useState<JavaScriptQuestionDevToolsMode>('console');

  const [showLoadedPreviousCode, setShowLoadedPreviousCode] = useState(
    loadedFilesFromClientStorage,
  );

  const isMounted = useIsMounted();

  useEffect(() => {
    if (mode === 'practice') {
      saveFiles(sandpack.files);
    }
  });

  function resetCode() {
    const shouldDiscard = window.confirm(
      'Your existing code will be discarded, are you sure?',
    );

    if (!shouldDiscard) {
      return;
    }

    setShowLoadedPreviousCode(false);
    deleteFilesFromClientStorage();

    if (mode === 'practice') {
      if (question.skeletonSetup != null) {
        sandpack.updateFile(question.skeletonSetup?.files);
      }
    } else if (question.solutionSetup != null) {
      sandpack.updateFile(question.solutionSetup?.files);
    }
  }

  return (
    <CodingPreferencesProvider>
      <div
        ref={sandpack.lazyAnchorRef} // Required because of https://github.com/codesandbox/sandpack/issues/851
        className="flex w-full flex-col lg:h-full">
        <style>{`@media (min-width: 1024px) {
        #right-section { width: ${rightPaneWidth}px; }
      }`}</style>
        <CodingWorkspaceToolbar>
          <CodingWorkspaceThemeSelect />
          <CodingWorkspaceEditorShortcutsButton />
          <CodingWorkspaceResetButton
            onClick={() => {
              resetCode();
            }}
          />
          <QuestionReportIssueButton
            format={question.format}
            title={question.metadata.title}
            tooltipPosition="start"
          />
        </CodingWorkspaceToolbar>
        <div className="flex flex-col lg:h-0 lg:grow lg:flex-row">
          <style suppressHydrationWarning={true}>{`@media (min-width: 1024px) {
        #devtool-section { ${
          showDevToolsPane ? `height: ${bottomSectionHeight}px;` : ''
        } }
      }`}</style>
          <div className="h-96 lg:h-full lg:w-0 lg:grow">
            <FileTabs />
            <CodeEditor
              key={sandpack.activeFile}
              filePath={sandpack.activeFile}
              value={code}
              onChange={(value) => updateCode(value || '')}
            />
          </div>
          <QuestionPaneDivider onMouseDown={(event) => startDrag(event)} />
          <div
            className="flex flex-col border-l border-slate-200 lg:h-full"
            id="right-section">
            <div
              className={clsx(
                'grow',
                // Don't allow mouse events on iframe while dragging otherwise
                // the mouseup event doesn't fire on the main window.
                (isLeftPaneDragging ||
                  isDragging ||
                  isBottomSectionDividerDragging) &&
                  'pointer-events-none touch-none select-none',
              )}>
              <SandpackPreview
                showNavigator={true}
                showOpenInCodeSandbox={false}
              />
            </div>
            {showDevToolsPane && (
              <QuestionPaneHorizontalDivider
                onMouseDown={(event) => startBottomSectionDividerDrag(event)}
              />
            )}
            <div
              className={clsx(
                'flex flex-col',
                showDevToolsPane && 'border-t border-slate-200',
              )}
              id="devtool-section">
              <div
                aria-expanded={showDevToolsPane}
                className={clsx(
                  'h-56 shrink',
                  showDevToolsPane ? 'grow overflow-auto' : 'hidden',
                )}>
                <JavaScriptQuestionDevTools
                  availableModes={['console']}
                  mode={devToolsMode}
                  onChangeMode={setDevToolsMode}
                />
              </div>
              {mode === 'practice' && isMounted() && showLoadedPreviousCode && (
                <div
                  className="bg-brand-50 shrink-0 border-t border-slate-200 py-3 px-4 sm:px-6 lg:px-4"
                  suppressHydrationWarning={true}>
                  <Text variant="body3">
                    Your previous code was restored.{' '}
                    <Anchor
                      href="#"
                      onClick={() => {
                        resetCode();
                      }}>
                      Reset to default
                    </Anchor>
                  </Text>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-slate-200 bg-white py-3 px-4 sm:px-6 lg:px-2 lg:py-2">
                <Button
                  icon={showDevToolsPane ? ChevronDownIcon : ChevronUpIcon}
                  label={showDevToolsPane ? 'Hide DevTool' : 'Show DevTool'}
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setShowDevToolsPane(!showDevToolsPane);
                  }}
                />
                <QuestionProgressAction
                  question={question}
                  questionProgress={questionProgress}
                  signInModalContents={
                    nextQuestions.length > 0 && (
                      <div className="mt-4 space-y-4">
                        <hr />
                        <QuestionNextQuestions questions={nextQuestions} />
                      </div>
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CodingPreferencesProvider>
  );
}

function MiddleRightPane({
  questionProgress,
  isLeftPaneDragging,
  mode,
  question,
  nextQuestions,
}: Readonly<{
  isLeftPaneDragging: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  questionProgress: QuestionProgress | null;
}>) {
  const pathname = usePathname();

  const {
    setup: practiceSetup,
    loadedFilesFromClientStorage,
    deleteFilesFromClientStorage,
    saveFiles,
  } = useUserInterfaceQuestionCode(question);
  const setup = mode === 'practice' ? practiceSetup : question.solutionSetup;

  return (
    <SandpackProvider
      key={pathname}
      customSetup={{
        dependencies: setup?.dependencies,
        devDependencies: setup?.devDependencies,
        entry: setup?.entry,
        environment: setup?.environment,
      }}
      files={setup?.files}
      options={{
        ...sandpackProviderOptions,
        activeFile: setup?.activeFile,
        classes: {
          'sp-input': 'touch-none select-none pointer-events-none',
          'sp-stack': 'h-full',
          'sp-wrapper': 'lg:!flex lg:!grow lg:!h-0',
        },
        visibleFiles: setup?.visibleFiles,
      }}>
      <MiddleRightPaneContents
        deleteFilesFromClientStorage={deleteFilesFromClientStorage}
        isLeftPaneDragging={isLeftPaneDragging}
        loadedFilesFromClientStorage={loadedFilesFromClientStorage}
        mode={mode}
        nextQuestions={nextQuestions}
        question={question}
        questionProgress={questionProgress}
        saveFiles={(files) => {
          // Only save files if in practicing mode, not in the
          // solution mode.
          if (mode === 'practice') {
            saveFiles(files);
          }
        }}
      />
    </SandpackProvider>
  );
}

function LeftPane({
  canViewPremiumContent,
  serverDuration,
  questionProgress,
  isQuestionLocked,
  mode,
  question,
  nextQuestions,
  similarQuestions,
}: Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  questionProgress: QuestionProgress | null;
  serverDuration: number;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const questionFormatLists = useQuestionFormatLists();

  const [showQuestionsSlideOut, setShowQuestionsSlideOut] = useState(false);

  const modeToSection: Record<
    QuestionUserInterfaceMode,
    QuestionContentsUserInterfaceSection
  > = {
    practice: 'description',
    solution: 'solution',
  };

  return (
    <section className="flex h-full shrink-0 flex-col" id="left-section">
      <QuestionsListingBreadcrumbs
        links={[
          {
            href: questionFormatLists.coding.href,
            label: questionFormatLists.coding.longName,
          },
        ]}
      />
      <div className="grow overflow-auto px-4 pb-10 sm:px-6">
        <QuestionContentsUserInterface
          key={question.metadata.slug}
          canViewPremiumContent={canViewPremiumContent}
          hasCompletedQuestion={questionProgress?.status === 'complete'}
          isQuestionLocked={isQuestionLocked}
          nextQuestions={nextQuestions}
          question={question}
          section={modeToSection[mode]}
          similarQuestions={similarQuestions}
        />
        <StatisticsPanel className="mt-4" serverDuration={serverDuration} />
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 bg-white py-3 px-4 sm:px-6 lg:py-2">
        <Button
          addonPosition="start"
          icon={ListBulletIcon}
          label="All Questions"
          size="sm"
          variant="secondary"
          onClick={() => setShowQuestionsSlideOut(true)}
        />
      </div>
      <QuestionCodingListSlideOut
        isShown={showQuestionsSlideOut}
        onClose={() => setShowQuestionsSlideOut(false)}
      />
    </section>
  );
}

type Props = Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  serverDuration: number;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function QuestionUserInterfaceCodingWorkspacePage({
  canViewPremiumContent,
  serverDuration,
  isQuestionLocked,
  mode,
  question,
  nextQuestions,
  similarQuestions,
}: Props) {
  const {
    startDrag,
    size: leftPaneWidth,
    isDragging,
  } = useResizablePaneDivider(
    STARTING_LEFT_PANE_WIDTH,
    false,
    'horizontal',
    0.333,
    () => window.innerWidth,
  );
  const { data: questionProgress } = useQueryQuestionProgress(
    question.metadata,
  );

  return (
    <>
      <style>{`@media (min-width:1024px) {
        #container { height: ${FooterlessContainerHeight} }
        #left-section { width: ${leftPaneWidth}px; }
      }`}</style>
      <div
        key={question.metadata.slug}
        className="static flex w-full flex-col overflow-hidden lg:fixed lg:flex-row"
        id="container">
        <LeftPane
          canViewPremiumContent={canViewPremiumContent}
          isQuestionLocked={isQuestionLocked}
          mode={mode}
          nextQuestions={nextQuestions}
          question={question}
          questionProgress={questionProgress ?? null}
          serverDuration={serverDuration}
          similarQuestions={similarQuestions}
        />
        <Section>
          <QuestionPaneDivider onMouseDown={(event) => startDrag(event)} />
          {isQuestionLocked ? (
            <div className="flex grow items-center justify-center">
              <QuestionPaywall />
            </div>
          ) : (
            <div className="flex grow flex-col">
              {mode === 'solution' && (
                <Banner size="sm">
                  You are viewing the solution. Any changes made to the code are
                  not saved.
                </Banner>
              )}
              <MiddleRightPane
                isLeftPaneDragging={isDragging}
                mode={mode}
                nextQuestions={nextQuestions}
                question={question}
                questionProgress={questionProgress ?? null}
              />
            </div>
          )}
        </Section>
      </div>
    </>
  );
}
