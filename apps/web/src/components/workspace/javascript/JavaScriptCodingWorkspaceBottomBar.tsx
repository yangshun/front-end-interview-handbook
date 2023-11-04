import { ReactNode, useState } from 'react';
import { RiArrowGoBackLine, RiPlayLine, RiSettings2Line } from 'react-icons/ri';

import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';

import logEvent from '~/logging/logEvent';

import JavaScriptCodingWorkspaceLayoutDialog from './JavaScriptCodingWorkspaceLayoutDialog';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import DropdownMenu from '~/components/ui/DropdownMenu';
import { VscLayout } from 'react-icons/vsc';

type Props = Readonly<{
  metadata: QuestionMetadata;
  layout: 'full' | 'minimal';
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  rightElements?: ReactNode;
}>;

export default function JavaScriptCodingWorkspaceBottomBar({
  metadata,
  layout,
  nextQuestions,
}: Props) {
  const { status, runTests, submit, resetToDefaultCode } =
    useCodingWorkspaceContext();
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);

  const runSubmitButtons = (
    <>
      <Button
        addonPosition="start"
        tooltip="Run against test cases (customizable)"
        tooltipPosition="above"
        icon={RiPlayLine}
        isDisabled={status !== 'idle'}
        label="Run"
        size="xs"
        variant="secondary"
        onClick={() => {
          logEvent('question.run', {
            format: metadata.format,
            slug: metadata.slug,
          });
          runTests();
        }}
      />
      <Button
        addonPosition="start"
        tooltip="Run against full test suite"
        isDisabled={status !== 'idle'}
        tooltipPosition="above"
        label="Submit"
        size="xs"
        variant="primary"
        onClick={() => {
          logEvent('question.submit', {
            format: metadata.format,
            slug: metadata.slug,
          });
          submit();
        }}
      />
    </>
  );

  if (layout === 'minimal') {
    return (
      <div className="flex flex-wrap items-center justify-end gap-2 px-3 py-3">
        {runSubmitButtons}
      </div>
    );
  }

  return (
    <CodingWorkspaceBottomBar
      leftElements={
        layout === 'full' && (
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
                format="javascript"
                title={metadata.title}
              />
              <JavaScriptCodingWorkspaceLayoutDialog
                isOpen={isLayoutDialogOpen}
                onClose={() => {
                  setIsLayoutDialogOpen(false);
                }}
              />
            </div>
          </>
        )
      }
      metadata={metadata}
      nextQuestions={nextQuestions}
      rightElements={runSubmitButtons}
    />
  );
}
