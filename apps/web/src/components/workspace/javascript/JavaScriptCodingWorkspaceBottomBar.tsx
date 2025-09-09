'use client';

import type { ComponentProps } from 'react';
import { useState } from 'react';
import { RiPlayLine } from 'react-icons/ri';

import QuestionBookmarkAction from '~/components/interviews/questions/common/QuestionBookmarkAction';
import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import CodingWorkspaceBottomBar from '~/components/workspace/common/CodingWorkspaceBottomBar';
import { CodingWorkspaceBottomBarSettingsDropdownMenu } from '~/components/workspace/common/CodingWorkspaceBottomBarSettingsDropdownMenu';
import CodingWorkspaceTimer from '~/components/workspace/common/CodingWorkspaceTimer';
import CodingWorkspaceMobileSolutionButton from '~/components/workspace/common/solution/CodingWorkspaceMobileSolutionButton';
import { updateFile } from '~/components/workspace/common/store/sandpack-slice';
import { pauseTimer } from '~/components/workspace/common/store/timer-slice';
import JavaScriptCodingWorkspaceLayoutDialog from '~/components/workspace/javascript/layout/JavaScriptCodingWorkspaceLayoutDialog';
import {
  useJavaScriptCodingWorkspaceDispatch,
  useJavaScriptCodingWorkspaceSelector,
} from '~/components/workspace/javascript/store/hooks';

import { deleteLocalJavaScriptQuestionCode } from './JavaScriptCodingWorkspaceCodeStorage';
import JavaScriptCodingWorkspaceLanguageDropdown from './language/JavaScriptCodingWorkspaceLanguageDropdown';
import { runTests, submit } from './store/execution-slice';

type Mode = ComponentProps<typeof CodingWorkspaceMobileSolutionButton>['mode'];
type Props = Readonly<{
  device: 'desktop' | 'mobile' | 'tablet';
  layout: 'full' | 'minimal';
  metadata: QuestionMetadata;
  mode?: Mode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onModeChange?: (value: Mode) => void;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspaceBottomBar({
  device,
  layout,
  metadata,
  mode,
  nextQuestions,
  onModeChange,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const javaScriptCodingWorkspaceDispatch =
    useJavaScriptCodingWorkspaceDispatch();
  const executionStatus = useJavaScriptCodingWorkspaceSelector(
    (state) => state.execution.status,
  );

  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);

  const rightPostElements = (
    <>
      {/* Run button for tablet and desktop */}
      <span className="hidden sm:inline">
        <Button
          addonPosition="start"
          icon={RiPlayLine}
          isDisabled={executionStatus !== 'idle'}
          label={intl.formatMessage({
            defaultMessage: 'Run',
            description: 'Run code button label',
            id: 'Yaff9b',
          })}
          size="xs"
          tooltip={intl.formatMessage({
            defaultMessage:
              "Run customizable test cases to check your code's progress. You can modify these test cases under the 'Test Cases' tab.",
            description: 'Coding workspace run test cases tooltip',
            id: 'zuH0Tc',
          })}
          variant="secondary"
          onClick={() => {
            javaScriptCodingWorkspaceDispatch(runTests(metadata));
          }}
        />
      </span>
      {/* Submit button for tablet and desktop */}
      <span className="hidden sm:inline">
        <Button
          addonPosition="start"
          isDisabled={executionStatus !== 'idle'}
          label={intl.formatMessage({
            defaultMessage: 'Submit',
            description: 'Coding workspace submit code button label',
            id: '6TjXww',
          })}
          size="xs"
          tooltip={intl.formatMessage({
            defaultMessage:
              "Run final test cases to validate your solution before submission. These cases can't be customized.",
            description: 'Coding workspace run test cases tooltip',
            id: 'BQuU/8',
          })}
          variant="primary"
          onClick={() => {
            javaScriptCodingWorkspaceDispatch(submit(metadata));
          }}
        />
      </span>
    </>
  );

  if (layout === 'minimal') {
    return (
      <div className="flex flex-wrap items-center justify-end gap-2 px-3 py-3">
        {rightPostElements}
      </div>
    );
  }

  const rightElements = (
    <>
      {/* Bug report for tablet and mobile only */}
      <div className="block sm:hidden">
        <QuestionReportIssueButton
          entity="question"
          format={metadata.format}
          slug={metadata.slug}
        />
      </div>
      <div className="hidden items-center gap-x-2 lg:flex">
        <CodingWorkspaceTimer qnMetadata={metadata} />
        <QuestionBookmarkAction metadata={metadata} />
      </div>
      <QuestionProgressAction
        isLabelHidden={device !== 'desktop'}
        metadata={metadata}
        signInModalContents={
          nextQuestions &&
          nextQuestions.length > 0 && (
            <div className="mt-4 space-y-4">
              <Divider />
              <QuestionNextQuestions questions={nextQuestions} />
            </div>
          )
        }
        studyListKey={studyListKey}
        onClick={() => {
          javaScriptCodingWorkspaceDispatch(pauseTimer());
        }}
      />
      {/* Solution button for mobile only */}
      {onModeChange && (
        <div className="block sm:hidden">
          <CodingWorkspaceMobileSolutionButton
            mode={mode}
            onModeChange={onModeChange}
          />
        </div>
      )}
      {rightPostElements}
      <div className="block lg:hidden">
        <SettingDropdownMenu device={device} />
      </div>
    </>
  );

  const leftElements = layout === 'full' && (
    <div className="hidden flex-1 items-center gap-x-2 sm:inline-flex">
      <div className="hidden lg:block">
        <SettingDropdownMenu device={device} />
      </div>
      <JavaScriptCodingWorkspaceLanguageDropdown
        mode={device === 'desktop' ? 'label' : 'icon'}
      />
      {/* Bug report for desktop only - rightmost position in left area */}
      <div className="hidden sm:block">
        <QuestionReportIssueButton
          entity="question"
          format={metadata.format}
          slug={metadata.slug}
        />
      </div>
      <JavaScriptCodingWorkspaceLayoutDialog
        isOpen={isLayoutDialogOpen}
        onClose={() => {
          setIsLayoutDialogOpen(false);
        }}
      />
    </div>
  );

  return (
    <CodingWorkspaceBottomBar
      leftElements={leftElements}
      metadata={metadata}
      rightElements={rightElements}
      showQuestionsListButton={layout === 'full'}
      slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
      }
      studyListKey={studyListKey}
    />
  );
}

function SettingDropdownMenu({
  device,
}: {
  device?: 'desktop' | 'mobile' | 'tablet';
}) {
  const workspaceDispatch = useJavaScriptCodingWorkspaceDispatch();
  const defaultFiles = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.default.files,
  );
  const language = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace.language,
  );
  const question = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace.question,
  );
  const { metadata } = question;

  function resetToDefaultCode() {
    deleteLocalJavaScriptQuestionCode(metadata, language);
    workspaceDispatch(updateFile({ files: defaultFiles }));
  }

  return (
    <CodingWorkspaceBottomBarSettingsDropdownMenu
      device={device}
      layoutDialogComponent={JavaScriptCodingWorkspaceLayoutDialog}
      metadata={metadata}
      resetToDefaultCode={resetToDefaultCode}
    />
  );
}
