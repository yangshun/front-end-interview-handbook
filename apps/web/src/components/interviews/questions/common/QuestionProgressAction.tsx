'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import url from 'url';

import { queryParamActionKey } from '~/hooks/useQueryParamAction';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

import {
  useMutationQuestionProgressAdd,
  useMutationQuestionProgressDelete,
  useQueryQuestionProgress,
} from '~/db/QuestionsProgressClient';
import { hashQuestion } from '~/db/QuestionsUtils';
import logEvent from '~/logging/logEvent';

import CodingWorkspaceBottomBarEmitter from '../../../workspace/common/CodingWorkspaceBottomBarEmitter';
import type { QuestionMetadata } from './QuestionsTypes';
import { MARK_AS_COMPLETE_ACTION_NAME } from './useQuestionsAutoMarkAsComplete';

type Props = Readonly<{
  metadata: Pick<QuestionMetadata, 'access' | 'format' | 'slug'>;
  signInModalContents?: React.ReactNode;
  studyListKey?: string;
}>;

const ButtonIcon = FaCheck;

export default function QuestionProgressAction({
  metadata,
  signInModalContents,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const pathname = usePathname();
  const user = useUser();
  const buttonLabelMarkComplete = intl.formatMessage({
    defaultMessage: 'Mark complete',
    description: 'Mark question as complete',
    id: 'C4am9n',
  });

  const [isLoginDialogShown, setIsLoginDialogShown] = useState(false);
  const markCompleteMutation = useMutationQuestionProgressAdd();
  const deleteProgressMutation = useMutationQuestionProgressDelete();

  const { showToast } = useToast();
  const { signInUpHref, signInUpLabel } = useAuthSignInUp();

  const { data, isFetching } = useQueryQuestionProgress(
    metadata,
    studyListKey ?? null,
  );

  if (data?.isQuestionLockedForViewer) {
    return null;
  }

  if (user == null) {
    if (metadata.access === 'premium') {
      return null;
    }

    return (
      <>
        <Button
          addonPosition="start"
          icon={ButtonIcon}
          label={buttonLabelMarkComplete}
          size="xs"
          variant="secondary"
          onClick={() => setIsLoginDialogShown(true)}
        />
        <Dialog
          isShown={isLoginDialogShown}
          primaryButton={
            <Button
              href={signInUpHref({
                next: url.format({
                  pathname,
                  query: {
                    [queryParamActionKey]: MARK_AS_COMPLETE_ACTION_NAME,
                  },
                }),
                query: { source: 'track_progress' },
              })}
              label={signInUpLabel}
              variant="primary"
              onClick={() => setIsLoginDialogShown(false)}
            />
          }
          secondaryButton={
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description: 'Cancel and close the sign in modal',
                id: 'YXs0ZC',
              })}
              variant="secondary"
              onClick={() => setIsLoginDialogShown(false)}
            />
          }
          title={intl.formatMessage({
            defaultMessage: 'Sign in to save progress',
            description:
              'Message shown when user completes a question without signing in',
            id: 'RDQ253',
          })}
          onClose={() => setIsLoginDialogShown(false)}>
          <Text className="block" color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Congratulations on completing the question! Sign into your account or sign up for free to save your progress!"
              description="Message shown when user completes a question"
              id="+JhlMu"
            />
          </Text>
          {signInModalContents}
        </Dialog>
      </>
    );
  }

  if (isFetching) {
    return (
      <Button
        addonPosition="start"
        className="cursor-disabled"
        icon={ButtonIcon}
        label={buttonLabelMarkComplete}
        size="xs"
        variant="secondary"
      />
    );
  }

  if (data?.questionProgress?.status === 'complete') {
    return (
      <Button
        icon={ButtonIcon}
        isDisabled={deleteProgressMutation.isLoading}
        isLoading={deleteProgressMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Completed',
          description: 'Question completion label',
          id: 'TY7Aig',
        })}
        size="xs"
        tooltip={intl.formatMessage({
          defaultMessage: 'Mark as incomplete',
          description: 'Mark the question as incomplete',
          id: 'i7u7fD',
        })}
        tooltipSide="top"
        variant="success"
        onClick={() => {
          deleteProgressMutation.mutate(
            {
              qnHashes: [hashQuestion(metadata)],
              studyListKey,
            },
            {
              onError: (error) => {
                showToast({
                  description: error.message,
                  title: intl.formatMessage({
                    defaultMessage:
                      'Failed to mark question as incomplete. Please try again',
                    description:
                      'Error message shown when the question cannot be marked incomplete',
                    id: 'bO2ju9',
                  }),
                  variant: 'danger',
                });
              },
              onSuccess: () => {
                showToast({
                  title: intl.formatMessage({
                    defaultMessage: 'Marked question as incomplete',
                    description:
                      'Success message shown when a question is marked as complete',
                    id: 'oR0ECI',
                  }),
                  variant: 'info',
                });
              },
            },
          );
        }}
      />
    );
  }

  return (
    <Button
      addonPosition="start"
      icon={ButtonIcon}
      isDisabled={markCompleteMutation.isLoading}
      isLoading={markCompleteMutation.isLoading}
      label={buttonLabelMarkComplete}
      size="xs"
      variant="secondary"
      onClick={() => {
        markCompleteMutation.mutate(
          {
            question: {
              format: metadata.format,
              slug: metadata.slug,
            },
            studyListKey,
          },
          {
            onError: (error) => {
              showToast({
                description: error.message,
                title: intl.formatMessage({
                  defaultMessage: 'Failed to mark question as complete',
                  description:
                    'Error message shown when a question has failed to mark as complete',
                  id: 'mFyOK6',
                }),
                variant: 'danger',
              });
            },
            onSuccess: () => {
              showToast({
                title: intl.formatMessage({
                  defaultMessage: 'Marked question as complete',
                  description:
                    'Success message shown when a question was marked as complete',
                  id: '3fkhgw',
                }),
                variant: 'success',
              });
              CodingWorkspaceBottomBarEmitter.emit('pause_timer');
            },
          },
        );
        logEvent('question.mark_complete', {
          format: metadata.format,
          namespace: 'interviews',
          slug: metadata.slug,
        });
      }}
    />
  );
}
