import { useState } from 'react';
import { RiArrowGoBackLine, RiPlayLine, RiSettings2Line } from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';

import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import logEvent from '~/logging/logEvent';

import JavaScriptCodingWorkspaceLayoutDialog from './JavaScriptCodingWorkspaceLayoutDialog';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';

type Props = Readonly<{
  layout: 'full' | 'minimal';
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  studyList?: Readonly<{ name: string, studyListKey: string; }>;
}>;

export default function JavaScriptCodingWorkspaceBottomBar({
  metadata,
  layout,
  studyList,
  nextQuestions,
}: Props) {
  const { status, runTests, submit, resetToDefaultCode } =
    useCodingWorkspaceContext();
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);

  const runSubmitButtons = (
    <>
      <span className="hidden lg:inline">
        <Button
          addonPosition="start"
          icon={RiPlayLine}
          isDisabled={status !== 'idle'}
          label="Run"
          size="xs"
          tooltip="Run test cases (customizable)"
          variant="secondary"
          onClick={() => {
            logEvent('question.run', {
              format: metadata.format,
              namespace: 'interviews',
              slug: metadata.slug,
            });
            runTests();
          }}
        />
      </span>
      <span className="hidden lg:inline">
        <Button
          addonPosition="start"
          isDisabled={status !== 'idle'}
          label="Submit"
          size="xs"
          tooltip="Runs submission test cases and marks complete"
          variant="primary"
          onClick={() => {
            logEvent('question.submit', {
              format: metadata.format,
              namespace: 'interviews',
              slug: metadata.slug,
            });
            submit();
          }}
        />
      </span>
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
          <div className="hidden items-center gap-x-2 md:inline-flex">
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
        )
      }
      metadata={metadata}
      nextQuestions={nextQuestions}
      rightElements={runSubmitButtons}
      showQuestionsListButton={layout === 'full'}
      studyList={studyList}
    />
  );
}
