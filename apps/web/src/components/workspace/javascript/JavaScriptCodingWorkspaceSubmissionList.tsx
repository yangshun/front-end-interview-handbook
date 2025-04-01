'use client';

import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/datetime/Timestamp';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderEmphasizeColor,
  themeDivideEmphasizeColor,
} from '~/components/ui/theme';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

export default function JavaScriptCodingWorkspaceSubmissionList({
  metadata,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

  if (userProfile == null) {
    return (
      <div className="w-full">
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState
              title={intl.formatMessage({
                defaultMessage:
                  'You must be signed in to view your submissions',
                description: 'Coding workspace sign in to view submissions',
                id: 'qzrGfv',
              })}
              variant="empty"
            />
          </div>
        </div>
      </div>
    );
  }

  return <JavaScriptCodingWorkspaceSubmissionListImpl metadata={metadata} />;
}

function JavaScriptCodingWorkspaceSubmissionListImpl({ metadata }: Props) {
  const intl = useIntl();
  const { openSubmission } = useCodingWorkspaceContext();
  const { data: submissions } =
    trpc.questionSubmission.javaScriptGetAll.useQuery({
      slug: metadata.slug,
    });

  return (
    <div className="w-full">
      {submissions == null || submissions?.length === 0 ? (
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState
              title={intl.formatMessage({
                defaultMessage: 'No submissions',
                description: 'No submissions in coding workspace',
                id: 'hz7oG3',
              })}
              variant="empty"
            />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div
            className={clsx(
              'flex flex-col rounded-md',
              ['border', themeBorderEmphasizeColor],
              ['divide-y', themeDivideEmphasizeColor],
              'overflow-hidden',
            )}>
            {submissions?.map(({ id, createdAt, language, result }) => (
              <div
                key={id}
                className={clsx(
                  'relative isolate',
                  'flex items-center justify-between gap-x-2',
                  themeBackgroundElementEmphasizedStateColor_Hover,
                  'p-3',
                )}>
                <div className="flex gap-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      openSubmission?.(id);
                    }}>
                    <Text
                      className="whitespace-nowrap"
                      size="body3"
                      weight="medium">
                      <Timestamp date={createdAt} />
                    </Text>
                    <span className="absolute inset-0" />
                  </button>
                  <QuestionLanguages languages={[staticLowerCase(language)]} />
                </div>
                <div>
                  {result === 'CORRECT' && (
                    <Badge
                      label={intl.formatMessage({
                        defaultMessage: 'Correct',
                        description: 'Correct submission in coding workspace',
                        id: 'OlFjm9',
                      })}
                      size="sm"
                      variant="success"
                    />
                  )}
                  {result === 'WRONG' && (
                    <Badge
                      label={intl.formatMessage({
                        defaultMessage: 'Wrong',
                        description: 'Wrong submission in coding workspace',
                        id: 'y+NJ/O',
                      })}
                      size="sm"
                      variant="danger"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
