'use client';

import { useState } from 'react';
import { RiArrowGoBackLine, RiSettings2Line } from 'react-icons/ri';
import { VscLayout, VscTerminal } from 'react-icons/vsc';

import { useShowAuthSignupDialogOnMaxPoints } from '~/components/auth/auth-points';
import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';
import { useVimMode } from '~/components/workspace/common/editor/hooks/useVimMode';

import UserInterfaceCodingWorkspaceLayoutDialog from './UserInterfaceCodingWorkspaceLayoutDialog';
import UserInterfaceCodingWorkspaceSaveButton from './UserInterfaceCodingWorkspaceSaveButton';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import CodingWorkspaceTimer from '../common/CodingWorkspaceTimer';

type Props = Readonly<{
  framework: QuestionFramework;
  frameworkSolutionPath: string;
  isViewingSave: boolean;
  metadata: QuestionMetadata;
  mode: QuestionUserInterfaceMode;
  question: QuestionUserInterface;
  resetToDefaultCode: () => void;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  studyListKey?: string;
}>;

export default function UserInterfaceCodingWorkspaceBottomBar({
  framework,
  isViewingSave,
  frameworkSolutionPath,
  metadata,
  question,
  mode,
  resetToDefaultCode,
  studyListKey,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
}: Props) {
  const intl = useIntl();

  // This is to show sign up dialog when max auth point is reached
  useShowAuthSignupDialogOnMaxPoints();

  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);
  const { isVimModeEnabled, toggleVimMode } = useVimMode();

  const leftElements = (
    <div className="hidden flex-1 items-center gap-x-2 sm:inline-flex">
      <QuestionReportIssueButton
        entity="question"
        format={metadata.format}
        slug={metadata.slug}
      />
      <DropdownMenu
        icon={RiSettings2Line}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Settings',
          description: 'Coding workspace settings dropdown label',
          id: '/p5g3I',
        })}
        showChevron={false}
        side="top"
        size="xs">
        {[
          {
            icon: VscLayout,
            label: intl.formatMessage({
              defaultMessage: 'Layout',
              description: 'Coding workspace layout',
              id: 'yMnCy6',
            }),
            onClick: () => {
              setIsLayoutDialogOpen(true);
            },
            value: 'layout',
          },
          {
            icon: VscTerminal,
            label: isVimModeEnabled
              ? intl.formatMessage({
                  defaultMessage: 'Disable Vim Mode',
                  description: 'Button label to disable vim mode in editor',
                  id: 'I7qnG/',
                })
              : intl.formatMessage({
                  defaultMessage: 'Enable Vim Mode',
                  description: 'Button label to enable vim mode in editor',
                  id: 'ILCBgB',
                }),
            onClick: toggleVimMode,
            value: 'vim-mode',
          },
          {
            icon: RiArrowGoBackLine,
            label: intl.formatMessage({
              defaultMessage: 'Reset question',
              description: 'Coding workspace reset question',
              id: 'ZeoQdS',
            }),
            onClick: () => {
              if (
                confirm(
                  intl.formatMessage({
                    defaultMessage: 'Reset all changes made to this question?',
                    description: 'Coding workspace reset question confirmation',
                    id: '2eBsGO',
                  }),
                )
              ) {
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
          entity="question"
          format={metadata.format}
          slug={metadata.slug}
        />
      </span>
      <div className="hidden lg:inline">
        <CodingWorkspaceTimer qnMetadata={metadata} />
      </div>
      {!isViewingSave ? (
        <QuestionProgressAction
          metadata={metadata}
          studyListKey={studyListKey}
        />
      ) : null}
      {mode === 'practice' && !isViewingSave ? (
        <div className="hidden min-[450px]:block">
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
