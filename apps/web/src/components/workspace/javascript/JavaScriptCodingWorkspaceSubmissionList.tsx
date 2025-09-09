'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import JavaScriptCodingWorkspaceSubmissionMetadata from './JavaScriptCodingWorkspaceSubmissionMetadata';
import { useJavaScriptCodingWorkspaceSelector } from './store/hooks';

type Props = Readonly<{
  metadata: QuestionMetadata;
  openSubmission: (submissionId: string, name: string) => void;
}>;

export default function JavaScriptCodingWorkspaceSubmissionList({
  metadata,
  openSubmission,
}: Props) {
  const user = useUser();

  if (user == null) {
    return <SubmissionSignInState />;
  }

  return (
    <JavaScriptCodingWorkspaceSubmissionListImpl
      metadata={metadata}
      openSubmission={openSubmission}
    />
  );
}

function JavaScriptCodingWorkspaceSubmissionListImpl({
  metadata,
  openSubmission,
}: Props) {
  const intl = useIntl();
  const { data: submissions } =
    trpc.questionSubmission.javaScriptGetAll.useQuery({
      slug: metadata.slug,
    });
  const currentOpenedSolution = useJavaScriptCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );

  return (
    <div className="w-full">
      {submissions == null || submissions?.length === 0 ? (
        <div
          className={clsx(
            'mx-auto max-w-sm',
            'flex h-full flex-col p-4',
            'flex grow items-center justify-center',
          )}>
          <EmptyState
            subtitle={intl.formatMessage(
              {
                defaultMessage:
                  'Solve the question and click <b>"Submit"</b> to view your submitted code for this question here.',
                description: 'No submissions yet in coding workspace',
                id: 'NHYkBT',
              },
              {
                b: (chunks: React.ReactNode) => (
                  <Text size="inherit" weight="bold">
                    {chunks}
                  </Text>
                ),
              },
            )}
            title={intl.formatMessage({
              defaultMessage: 'No submissions yet',
              description: 'No submissions in coding workspace',
              id: 'Yv2HLr',
            })}
            variant="empty"
          />
        </div>
      ) : (
        <ScrollArea>
          <div
            className={clsx(
              'flex flex-col rounded-md',
              ['divide-y', themeDivideColor],
              ['border-b', themeBorderColor],
              'overflow-hidden',
            )}>
            {submissions?.map(({ createdAt, id, language, result }, index) => {
              const name = `Attempt ${submissions.length - index}`;

              return (
                <div
                  key={id}
                  className={clsx(
                    'relative isolate',
                    'flex items-center justify-between gap-x-2',
                    themeBackgroundElementEmphasizedStateColor_Hover,
                    'px-4 py-3',
                  )}>
                  <button
                    className="absolute inset-0"
                    type="button"
                    onClick={() => {
                      openSubmission(id, name);
                    }}
                  />
                  <JavaScriptCodingWorkspaceSubmissionMetadata
                    createdAt={createdAt}
                    isActive={currentOpenedSolution?.attemptId === id}
                    isCorrect={result === 'CORRECT'}
                    language={language}
                    name={name}
                  />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

function SubmissionSignInState() {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <div
      className={clsx(
        'mx-auto size-full max-w-xs p-4',
        'flex grow items-center justify-center',
      )}>
      <EmptyState
        action={
          <div className="flex justify-center gap-x-3">
            <Button
              href={signInUpHref()}
              label={intl.formatMessage({
                defaultMessage: 'Sign in',
                description: 'Sign in button label',
                id: 'xrhUzU',
              })}
              size="xs"
              variant="secondary"
            />
            <Button
              href={signInUpHref()}
              label={intl.formatMessage({
                defaultMessage: 'Create an account',
                description: 'Create account button label',
                id: 'Rhdhem',
              })}
              size="xs"
              variant="primary"
            />
          </div>
        }
        title={intl.formatMessage({
          defaultMessage: 'You must be signed in to view your submissions',
          description: 'Coding workspace sign in to view submissions',
          id: 'qzrGfv',
        })}
        variant="empty"
      />
    </div>
  );
}
