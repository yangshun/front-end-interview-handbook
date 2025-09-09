'use client';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { pauseTimer } from 'components/workspace/common/store/timer-slice';
import type { ComponentProps } from 'react';

import QuestionBookmarkAction from '~/components/interviews/questions/common/QuestionBookmarkAction';
import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import Divider from '~/components/ui/Divider';
import CodingWorkspaceBottomBar from '~/components/workspace/common/CodingWorkspaceBottomBar';
import { CodingWorkspaceBottomBarSettingsDropdownMenu } from '~/components/workspace/common/CodingWorkspaceBottomBarSettingsDropdownMenu';
import CodingWorkspaceMobileSolutionButton from '~/components/workspace/common/CodingWorkspaceMobileSolutionButton';
import CodingWorkspaceTimer from '~/components/workspace/common/CodingWorkspaceTimer';
import { useCodingWorkspaceDispatch } from '~/components/workspace/common/store/hooks';

import { useUserInterfaceCodingWorkspaceSelector } from './store/hooks';
import { deleteLocalUserInterfaceQuestionCode } from './UserInterfaceCodingWorkspaceCodeStorage';
import UserInterfaceCodingWorkspaceFrameworkDropdown from './UserInterfaceCodingWorkspaceFrameworkDropdown';
import UserInterfaceCodingWorkspaceLayoutDialog from './UserInterfaceCodingWorkspaceLayoutDialog';
import UserInterfaceCodingWorkspaceSaveButton from './UserInterfaceCodingWorkspaceSaveButton';

type Mode = ComponentProps<typeof CodingWorkspaceMobileSolutionButton>['mode'];
type Props = Readonly<{
  device: 'desktop' | 'mobile' | 'tablet';
  framework: QuestionFramework;
  metadata: QuestionMetadata;
  mode?: Mode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (framework: QuestionFramework) => void;
  onModeChange?: (value: Mode) => void;
  question: QuestionUserInterface;
  replaceCodeEditorContents: (updatedFiles: SandpackFiles) => void;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  studyListKey?: string;
}>;

export default function UserInterfaceCodingWorkspaceBottomBar({
  device,
  framework,
  metadata,
  mode,
  nextQuestions,
  onFrameworkChange,
  onModeChange,
  question,
  replaceCodeEditorContents,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
  studyListKey,
}: Props) {
  const workspaceDispatch = useCodingWorkspaceDispatch();

  const leftElements = (
    <div className="hidden flex-1 items-center gap-x-2 sm:inline-flex">
      {/* Settings menu for desktop only */}
      <div className="hidden lg:block">
        <SettingDropdownMenu
          device={device}
          question={question}
          replaceCodeEditorContents={replaceCodeEditorContents}
        />
      </div>
      <UserInterfaceCodingWorkspaceFrameworkDropdown
        framework={framework}
        metadata={metadata}
        mode={device === 'desktop' ? 'label' : 'icon'}
        onFrameworkChange={onFrameworkChange}
      />
      <div className="hidden sm:block">
        <QuestionReportIssueButton
          entity="question"
          format={metadata.format}
          slug={metadata.slug}
        />
      </div>
    </div>
  );
  const rightElements = (
    <>
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
          workspaceDispatch(pauseTimer());
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
      <div className="hidden sm:block">
        <UserInterfaceCodingWorkspaceSaveButton
          device={device}
          question={question}
          studyListKey={studyListKey}
        />
      </div>
      <div className="block lg:hidden">
        <SettingDropdownMenu
          device={device}
          question={question}
          replaceCodeEditorContents={replaceCodeEditorContents}
        />
      </div>
    </>
  );

  return (
    <CodingWorkspaceBottomBar
      framework={framework}
      leftElements={leftElements}
      metadata={metadata}
      rightElements={rightElements}
      slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
      }
      studyListKey={studyListKey}
    />
  );
}

function SettingDropdownMenu({
  device,
  question,
  replaceCodeEditorContents,
}: {
  device?: 'desktop' | 'mobile' | 'tablet';
  question: QuestionUserInterface;
  replaceCodeEditorContents: (updatedFiles: SandpackFiles) => void;
}) {
  const defaultFiles = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.default.files,
  );

  function resetToDefaultCode() {
    deleteLocalUserInterfaceQuestionCode(question);
    replaceCodeEditorContents(defaultFiles);
  }

  return (
    <CodingWorkspaceBottomBarSettingsDropdownMenu
      device={device}
      layoutDialogComponent={UserInterfaceCodingWorkspaceLayoutDialog}
      metadata={question.metadata}
      resetToDefaultCode={resetToDefaultCode}
    />
  );
}
