'use client';

import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

import {
  useMutationQuestionProgressAdd,
  useMutationQuestionProgressDelete,
} from '~/db/QuestionsProgressClient';
import type { QuestionProgress } from '~/db/QuestionsProgressTypes';
import logEvent from '~/logging/logEvent';

import type { QuestionMetadata } from './QuestionsTypes';
import CodingWorkspaceBottomBarEmitter from '../../../workspace/common/CodingWorkspaceBottomBarEmitter';

import { useUser } from '@supabase/auth-helpers-react';

type QuestionProgressWithId = QuestionProgress & {
  questionProgressId?: string;
};

type Props = Readonly<{
  listKey?: string;
  metadata: QuestionMetadata;
  questionProgress?: QuestionProgressWithId | null;
  signInModalContents?: React.ReactNode;
}>;

export default function QuestionProgressAction({
  signInModalContents,
  questionProgress,
  metadata,
  listKey,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const [isLoginDialogShown, setIsLoginDialogShown] = useState(false);
  const addProgressMutation = useMutationQuestionProgressAdd();
  const deleteProgressMutation = useMutationQuestionProgressDelete();
  const { showToast } = useToast();
  const { signInUpHref, signInUpLabel } = useAuthSignInUp();

  if (user == null) {
    return (
      <>
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
          onClick={() => setIsLoginDialogShown(true)}
        />
        <Dialog
          isShown={isLoginDialogShown}
          primaryButton={
            <Button
              href={signInUpHref()}
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

  if (questionProgress?.status === 'complete') {
    return (
      <Button
        icon={FaCheck}
        isDisabled={deleteProgressMutation.isLoading}
        isLoading={deleteProgressMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Completed',
          description: 'The question has been completed',
          id: 'RhV5e8',
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
            { format: metadata.format, listKey, slug: metadata.slug },
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
      isDisabled={addProgressMutation.isLoading}
      isLoading={addProgressMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Mark complete',
        description: 'Mark the question as complete',
        id: 'pj07uD',
      })}
      size="xs"
      variant="secondary"
      onClick={() => {
        addProgressMutation.mutate(
          {
            format: metadata.format,
            listKey,
            progressId: listKey
              ? questionProgress?.questionProgressId
              : questionProgress?.id,
            slug: metadata.slug,
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
              CodingWorkspaceBottomBarEmitter.emit('stop_timer');
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
