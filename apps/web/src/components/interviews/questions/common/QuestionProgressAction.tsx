'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import url from 'url';

import { queryParamActionKey } from '~/hooks/useQueryParamAction';

import { useAuthSignupDialogContext } from '~/components/auth/AuthSignupDialogContext';
import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

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
  studyListKey?: string;
}>;

export default function QuestionProgressAction({
  metadata,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const pathname = usePathname();
  const user = useUser();
  const { showAuthSignupDialog } = useAuthSignupDialogContext();

  const markCompleteMutation = useMutationQuestionProgressAdd();
  const deleteProgressMutation = useMutationQuestionProgressDelete();

  const { showToast } = useToast();

  const { data, isFetching } = useQueryQuestionProgress(
    metadata,
    studyListKey ?? null,
  );

  if (user == null) {
    if (metadata.access === 'premium') {
      return null;
    }

    return (
      <Button
        addonPosition="start"
        icon={FaCheck}
        label={intl.formatMessage({
          defaultMessage: 'Mark complete',
          description: 'Mark question as complete',
          id: 'C4am9n',
        })}
        size="xs"
        variant="secondary"
        onClick={() =>
          showAuthSignupDialog({
            next: url.format({
              pathname,
              query: {
                [queryParamActionKey]: MARK_AS_COMPLETE_ACTION_NAME,
              },
            }),
          })
        }
      />
    );
  }

  if (isFetching || data?.isQuestionLockedForViewer) {
    return null;
  }

  if (data?.questionProgress?.status === 'complete') {
    return (
      <Button
        icon={FaCheck}
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
      icon={FaCheck}
      isDisabled={markCompleteMutation.isLoading}
      isLoading={markCompleteMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Mark complete',
        description: 'Mark the question as complete',
        id: 'pj07uD',
      })}
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
