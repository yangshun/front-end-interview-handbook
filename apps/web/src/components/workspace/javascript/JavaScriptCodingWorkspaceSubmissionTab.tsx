'use client';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/datetime/Timestamp';
import type { InterviewsQuestionInfo } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import { useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Prose from '~/components/ui/Prose';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import JavaScriptCodingWorkspacePushCodeToEditorButton from './JavaScriptCodingWorkspacePushCodeToEditorButton';

type Props = Readonly<{
  info: InterviewsQuestionInfo;
  submissionId: string;
}>;

export default function JavaScriptCodingWorkspaceSubmissionTab({
  info,
  submissionId,
}: Props) {
  const intl = useIntl();
  const { data: submission, isLoading } =
    trpc.questionSubmission.javaScriptGet.useQuery({
      submissionId,
    });

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
        <div className="flex flex-col gap-y-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex items-center gap-x-4">
              <Heading level="heading5">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Submission for "{title}"',
                    description: 'Coding workspace submission title',
                    id: 'K2gA7K',
                  },
                  { title: info.title },
                )}
              </Heading>
              <QuestionLanguages
                languages={[staticLowerCase(submission.language)]}
              />
            </div>
            {submission.result === 'CORRECT' && (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Correct',
                  description: 'Correct submission in coding workspace',
                  id: 'OlFjm9',
                })}
                variant="success"
              />
            )}
            {submission.result === 'WRONG' && (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Wrong',
                  description: 'Wrong submission in coding workspace',
                  id: 'y+NJ/O',
                })}
                variant="danger"
              />
            )}
          </div>
          <div className="flex items-center gap-x-4">
            <Text
              className="whitespace-nowrap"
              color="secondary"
              size="body2"
              weight="medium">
              {intl.formatMessage({
                defaultMessage: 'Submitted at',
                description: 'Coding workspace submission submitted at label',
                id: 'b/3jGp',
              })}
              <Timestamp date={submission.createdAt} />
            </Text>
          </div>
          <Prose textSize="sm">
            <MDXCodeBlock
              renderExtraButtons={() => (
                <JavaScriptCodingWorkspacePushCodeToEditorButton
                  contents={submission.code}
                />
              )}>
              {submission.code}
            </MDXCodeBlock>
          </Prose>
        </div>
      )}
    </div>
  );
}
