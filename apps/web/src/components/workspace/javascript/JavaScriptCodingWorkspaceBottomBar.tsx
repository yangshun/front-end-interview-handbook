import type { ReactNode } from 'react';
import { RiPlayLine } from 'react-icons/ri';

import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';

import logEvent from '~/logging/logEvent';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';

type Props = Readonly<{
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  rightElements?: ReactNode;
}>;

export default function JavaScriptCodingWorkspaceBottomBar({
  metadata,
  nextQuestions,
}: Props) {
  const { status, runTests, submit } = useCodingWorkspaceContext();

  return (
    <CodingWorkspaceBottomBar
      metadata={metadata}
      nextQuestions={nextQuestions}
      rightElements={
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
      }
    />
  );
}
