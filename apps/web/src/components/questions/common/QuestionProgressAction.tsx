import React, { useState } from 'react';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import useLogEvent from '~/components/logging/useLogEvent';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

import {
  useMutationQuestionProgressAdd,
  useMutationQuestionProgressDelete,
} from '~/db/QuestionsProgressClient';
import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

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
  const user = useUser();
  const [isLoginDialogShown, setIsLoginDialogShown] = useState(false);
  const addProgressMutation = useMutationQuestionProgressAdd();
  const deleteProgressMutation = useMutationQuestionProgressDelete();
  const { showToast } = useToast();
  const logEvent = useLogEvent();

  if (user == null) {
    return (
      <>
        <Button
          icon={CheckIcon}
          label="Mark as complete"
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
              label="Sign In / Sign Up"
              variant="primary"
              onClick={() => setIsLoginDialogShown(false)}
            />
          }
          secondaryButton={
            <Button
              display="block"
              label="Cancel"
              variant="tertiary"
              onClick={() => setIsLoginDialogShown(false)}
            />
          }
          title="Sign in to save progress"
          onClose={() => setIsLoginDialogShown(false)}>
          <Text color="secondary" display="block">
            Congratulations on completing the question! Sign into your account
            or sign up for free to save your progress!
          </Text>
          {signInModalContents}
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
        label="Completed"
        size="sm"
        tooltip="Mark as incomplete"
        tooltipPosition="above"
        variant="success"
        onClick={() => {
          deleteProgressMutation.mutate(
            { question: question.metadata, user },
            {
              onError: () => {
                showToast({
                  title:
                    'Failed to mark question as incomplete. Please try again',
                  variant: 'failure',
                });
              },
              onSuccess: () => {
                showToast({
                  title: 'Marked question as incomplete',
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
      label="Mark as Complete"
      size="sm"
      variant="tertiary"
      onClick={() => {
        addProgressMutation.mutate(
          { question: question.metadata, status: 'complete', user },
          {
            onError: () => {
              showToast({
                title: 'Failed to mark question as complete. Please try again',
                variant: 'failure',
              });
            },
            onSuccess: () => {
              showToast({
                title: 'Marked question as completed',
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
