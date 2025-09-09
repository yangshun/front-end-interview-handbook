'use client';

import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Prose from '~/components/ui/Prose';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeBackgroundCardWhiteOnLightColor } from '~/components/ui/theme';

import JavaScriptCodingWorkspacePushCodeToEditorButton from '../JavaScriptCodingWorkspacePushCodeToEditorButton';
import { useJavaScriptCodingWorkspaceSelector } from '../store/hooks';
import JavaScriptCodingWorkspaceSubmissionMetadata from './JavaScriptCodingWorkspaceSubmissionMetadata';

type Props = Readonly<{
  submissionId: string;
  submissionName: string;
}>;

export default function JavaScriptCodingWorkspaceSubmissionTab({
  submissionId,
  submissionName,
}: Props) {
  const intl = useIntl();
  const { data: submission, isLoading } =
    trpc.questionSubmission.javaScriptGet.useQuery({
      submissionId,
    });
  const currentOpenedSolution = useJavaScriptCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Spinner
            label={intl.formatMessage({
              defaultMessage: 'Loading submission',
              description: 'Coding workspace submission loading',
              id: '1tXKW/',
            })}
            size="md"
          />
        </div>
      )}
      {submission && (
        <div>
          <div
            className={clsx('px-4 py-3', themeBackgroundCardWhiteOnLightColor)}>
            <JavaScriptCodingWorkspaceSubmissionMetadata
              createdAt={submission.createdAt}
              isActive={currentOpenedSolution?.attemptId === submission.id}
              isCorrect={submission.result === 'CORRECT'}
              language={submission.language}
              name={submissionName}
            />
          </div>
          <div className="flex flex-col gap-y-6 px-4 py-1.5">
            <div className={clsx('flex items-center justify-between gap-x-2')}>
              <Text size="body1" weight="bold">
                {intl.formatMessage({
                  defaultMessage: 'Files',
                  description: 'Solution files section heading',
                  id: 'q/prth',
                })}
              </Text>
              <JavaScriptCodingWorkspacePushCodeToEditorButton
                contents={submission.code}
                metadata={{
                  id: submission.id,
                  name: submissionName,
                }}
                type="attempt"
              />
            </div>
            <Prose className="m-0 [&>div>div>pre]:my-0" textSize="sm">
              <MDXCodeBlock>{submission.code}</MDXCodeBlock>
            </Prose>
          </div>
        </div>
      )}
    </div>
  );
}
