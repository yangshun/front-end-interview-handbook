import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

import {
  useMutationQuestionProgressAdd,
  useMutationQuestionProgressDelete,
} from '~/db/QuestionsProgressClient';
import type { QuestionProgress } from '~/db/QuestionsProgressTypes';
import logEvent from '~/logging/logEvent';

import type { QuestionBase } from './QuestionsTypes';

import { CheckIcon } from '@heroicons/react/24/outline';
import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  question: QuestionBase;
  questionProgress?: QuestionProgress | null;
  signInModalContents?: React.ReactNode;
}>;

export default function QuestionProgressAction({
  signInModalContents,
  questionProgress,
  question,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const [isLoginDialogShown, setIsLoginDialogShown] = useState(false);
  const addProgressMutation = useMutationQuestionProgressAdd();
  const deleteProgressMutation = useMutationQuestionProgressDelete();
  const { showToast } = useToast();

  if (user == null) {
    return (
      <>
        <Button
          icon={CheckIcon}
          label={intl.formatMessage({
            defaultMessage: 'Mark as complete',
            description: 'Mark quetion as complete',
            id: 'Rhpldj',
          })}
          size="sm"
          variant="primary"
          onClick={() => setIsLoginDialogShown(true)}
        />
        <Dialog
          isShown={isLoginDialogShown}
          primaryButton={
            <Button
              display="block"
              href={`/login?next=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.pathname : '',
              )}`}
              label={intl.formatMessage({
                defaultMessage: 'Sign In / Sign Up',
                description: 'Sign in or up for the platform',
                id: 'iAXU/e',
              })}
              variant="primary"
              onClick={() => setIsLoginDialogShown(false)}
            />
          }
          secondaryButton={
            <Button
              display="block"
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description: 'Cancel and close the sign in modal',
                id: 'YXs0ZC',
              })}
              variant="tertiary"
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
          <Text color="secondary" display="block">
            <FormattedMessage
              defaultMessage="Congratulations on completing the question! Sign into your account or sign up for free to save your progress!"
              description="Message shown when user completes a question"
              id="+JhlMu"
            />
          </Text>
          ;{signInModalContents}
        </Dialog>
      </>
    );
  }

  if (questionProgress?.status === 'complete') {
    return (
      <Button
        icon={CheckIcon}
        isDisabled={deleteProgressMutation.isLoading}
        isLoading={deleteProgressMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Completed',
          description: 'The question has been completed',
          id: 'RhV5e8',
        })}
        size="sm"
        tooltip={intl.formatMessage({
          defaultMessage: 'Mark as incomplete',
          description: 'Mark the question as incomplete',
          id: 'i7u7fD',
        })}
        tooltipPosition="above"
        variant="success"
        onClick={() => {
          deleteProgressMutation.mutate(
            { question: question.metadata, user },
            {
              onError: () => {
                showToast({
                  title: intl.formatMessage({
                    defaultMessage:
                      'Failed to mark question as incomplete. Please try again',
                    description:
                      'Error message shown when the question cannot be marked incomplete',
                    id: 'bO2ju9',
                  }),
                  variant: 'failure',
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
                  variant: 'success',
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
      isDisabled={addProgressMutation.isLoading}
      isLoading={addProgressMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Mark as Complete',
        description: 'Mark the question as complete',
        id: 'Se6J8o',
      })}
      size="sm"
      variant="tertiary"
      onClick={() => {
        addProgressMutation.mutate(
          { question: question.metadata, status: 'complete', user },
          {
            onError: () => {
              showToast({
                title: intl.formatMessage({
                  defaultMessage:
                    'Failed to mark question as complete. Please try again',
                  description:
                    'Error message shown when a question has failed to mark as complete',
                  id: 'KY8GB9',
                }),
                variant: 'failure',
              });
            },
            onSuccess: () => {
              showToast({
                title: intl.formatMessage({
                  defaultMessage: 'Marked question as completed',
                  description:
                    'Success message shown when a question was marked as complete',
                  id: 'Ou1LIp',
                }),
                variant: 'success',
              });
            },
          },
        );
        logEvent('question.mark_complete', {
          format: question.metadata.format,
          slug: question.metadata.slug,
        });
      }}
    />
  );
}
