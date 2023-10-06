import type { ReactNode } from 'react';
import { RiArrowGoBackLine, RiPlayLine } from 'react-icons/ri';

import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';

import logEvent from '~/logging/logEvent';

import JavaScriptCodingWorkspaceLayoutButton from './JavaScriptCodingWorkspaceLayoutButton';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';

type Props = Readonly<{
  metadata: QuestionMetadata;
  mode: 'full' | 'minimal';
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  rightElements?: ReactNode;
}>;

export default function JavaScriptCodingWorkspaceBottomBar({
  metadata,
  mode,
  nextQuestions,
}: Props) {
  const { status, runTests, submit, resetToDefaultCode } =
    useCodingWorkspaceContext();

  const runSubmitButtons = (
    <>
      <Button
        addonPosition="start"
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
        isDisabled={status !== 'idle'}
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

  if (mode === 'minimal') {
    return (
      <div className="flex flex-wrap items-center justify-end gap-2 px-3 py-3">
        {runSubmitButtons}
      </div>
    );
  }

  return (
    <CodingWorkspaceBottomBar
      leftElements={
        mode === 'full' && (
          <>
            <div className="hidden md:inline">
              <JavaScriptCodingWorkspaceLayoutButton />
            </div>
            <Button
              addonPosition="start"
              icon={RiArrowGoBackLine}
              isDisabled={status !== 'idle'}
              label="Reset question"
              size="xs"
              variant="secondary"
              onClick={() => {
                if (confirm('Reset all changes made to this question?')) {
                  resetToDefaultCode();
                }
              }}
            />
          </>
        )
      }
      metadata={metadata}
      nextQuestions={nextQuestions}
      rightElements={runSubmitButtons}
    />
  );
}
