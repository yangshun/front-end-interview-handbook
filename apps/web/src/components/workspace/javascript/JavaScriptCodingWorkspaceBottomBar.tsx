import { RiPlayLine } from 'react-icons/ri';

import QuestionProgressAction from '~/components/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/questions/content/QuestionNextQuestions';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';
import logEvent from '~/logging/logEvent';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';
import CodingWorkspaceQuestionListSlideOutButton from '../common/CodingWorkspaceQuestionListSlideOutButton';

type Props = Readonly<{
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function JavaScriptCodingWorkspaceBottomBar({
  metadata,
  nextQuestions,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(metadata);
  const { status, runTests, submit } = useCodingWorkspaceContext();

  return (
    <div className="flex items-center justify-between px-3 py-3">
      <div className="flex items-center gap-x-2">
        <CodingWorkspaceQuestionListSlideOutButton />
        <QuestionReportIssueButton format="javascript" title={metadata.title} />
      </div>
      <div className="flex items-center gap-x-2">
        <QuestionProgressAction
          metadata={metadata}
          questionProgress={questionProgress}
          signInModalContents={
            nextQuestions.length > 0 && (
              <div className="mt-4 space-y-4">
                <Divider />
                <QuestionNextQuestions questions={nextQuestions} />
              </div>
            )
          }
        />
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
      </div>
    </div>
  );
}
