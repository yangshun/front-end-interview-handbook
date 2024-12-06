import { useState } from 'react';
import { RiArrowGoBackLine, RiSettings2Line } from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import type {
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';

import UserInterfaceCodingWorkspaceLayoutDialog from './UserInterfaceCodingWorkspaceLayoutDialog';
import UserInterfaceCodingWorkspaceSaveButton from './UserInterfaceCodingWorkspaceSaveButton';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import CodingWorkspaceTimer from '../common/CodingWorkspaceTimer';

type Props = Readonly<{
  frameworkSolutionPath: string;
  metadata: QuestionMetadata;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  resetToDefaultCode: () => void;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  studyListKey?: string;
}>;

export default function UserInterfaceCodingWorkspaceBottomBar({
  frameworkSolutionPath,
  metadata,
  question,
  mode,
  nextQuestions,
  resetToDefaultCode,
  studyListKey,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
}: Props) {
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);

  const leftElements = (
    <div className="hidden flex-1 items-center gap-x-2 sm:inline-flex">
      <QuestionReportIssueButton
        format={metadata.format}
        title={metadata.title}
      />
      <DropdownMenu
        icon={RiSettings2Line}
        isLabelHidden={true}
        label="Settings"
        showChevron={false}
        side="top"
        size="xs">
        {[
          {
            icon: VscLayout,
            label: 'Layout',
            onClick: () => {
              setIsLayoutDialogOpen(true);
            },
            value: 'layout',
          },
          {
            icon: RiArrowGoBackLine,
            label: 'Reset question',
            onClick: () => {
              if (confirm('Reset all changes made to this question?')) {
                resetToDefaultCode();
              }
            },
            value: 'reset',
          },
        ].map(({ onClick, icon, label, value }) => (
          <DropdownMenu.Item
            key={value}
            icon={icon}
            label={label}
            onClick={onClick}
          />
        ))}
      </DropdownMenu>
      <UserInterfaceCodingWorkspaceLayoutDialog
        frameworkSolutionPath={frameworkSolutionPath}
        isOpen={isLayoutDialogOpen}
        mode={mode}
        onClose={() => {
          setIsLayoutDialogOpen(false);
        }}
      />
    </div>
  );
  const rightElements = (
    <>
      <span className="inline sm:hidden">
        <QuestionReportIssueButton
          format={metadata.format}
          title={metadata.title}
        />
      </span>
      <div className="hidden lg:inline">
        <CodingWorkspaceTimer />
      </div>
      <QuestionProgressAction
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
      />
      {mode === 'practice' ? (
        <div className="hidden min-[400px]:block">
          <UserInterfaceCodingWorkspaceSaveButton
            question={question}
            studyListKey={studyListKey}
          />
        </div>
      ) : null}
    </>
  );

  return (
    <CodingWorkspaceBottomBar
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
