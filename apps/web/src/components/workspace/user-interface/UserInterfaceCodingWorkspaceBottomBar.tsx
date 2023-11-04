import { useState } from 'react';
import { RiArrowGoBackLine, RiSettings2Line } from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import {
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/questions/common/QuestionsTypes';
import { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import DropdownMenu from '~/components/ui/DropdownMenu';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import UserInterfaceCodingWorkspaceLayoutDialog from './UserInterfaceCodingWorkspaceLayoutDialog';
import UserInterfaceCodingWorkspaceSaveButton from './UserInterfaceCodingWorkspaceSaveButton';

type Props = Readonly<{
  metadata: QuestionMetadata;
  frameworkSolutionPath: string;
  layout: 'full' | 'minimal';
  mode: QuestionUserInterfaceMode;
  question: QuestionUserInterface;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  resetToDefaultCode: () => void;
}>;

export default function UserInterfaceCodingWorkspaceBottomBar({
  frameworkSolutionPath,
  metadata,
  layout,
  question,
  mode,
  nextQuestions,
  resetToDefaultCode,
}: Props) {
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);

  return (
    <CodingWorkspaceBottomBar
      leftElements={
        <>
          <div className="hidden items-center gap-x-2 md:inline-flex">
            <DropdownMenu
              icon={RiSettings2Line}
              showChevron={false}
              position="above"
              label="Settings"
              size="xs"
              isLabelHidden={true}>
              {[
                {
                  icon: VscLayout,
                  label: 'Layout',
                  value: 'layout',
                  onClick: () => {
                    setIsLayoutDialogOpen(true);
                  },
                },
                {
                  icon: RiArrowGoBackLine,
                  label: 'Reset question',
                  value: 'reset',
                  onClick: () => {
                    if (confirm('Reset all changes made to this question?')) {
                      resetToDefaultCode();
                    }
                  },
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
            <QuestionReportIssueButton
              format="user-interface"
              title={metadata.title}
            />
            <UserInterfaceCodingWorkspaceLayoutDialog
              mode={mode}
              isOpen={isLayoutDialogOpen}
              onClose={() => {
                setIsLayoutDialogOpen(false);
              }}
              frameworkSolutionPath={frameworkSolutionPath}
            />
          </div>
        </>
      }
      metadata={metadata}
      nextQuestions={nextQuestions}
      rightElements={
        mode === 'practice' ? (
          <UserInterfaceCodingWorkspaceSaveButton question={question} />
        ) : undefined
      }
    />
  );
}
