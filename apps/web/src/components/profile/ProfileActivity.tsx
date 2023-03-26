'use client';

import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import { useQueryQuestionListCoding } from '~/db/QuestionsListQuery';
import {
  getQuestionMetadata,
  useMutationQuestionProgressDeleteAll,
  useQueryQuestionProgressAll,
} from '~/db/QuestionsProgressClient';

import { useToast } from '../global/toasts/ToastsProvider';
import QuestionLanguages from '../questions/common/QuestionLanguages';
import type { QuestionLanguage } from '../questions/common/QuestionsTypes';
import Dialog from '../ui/Dialog';

import { RectangleStackIcon } from '@heroicons/react/24/outline';
import type { User } from '@supabase/supabase-js';

function NoCompletedQuestions() {
  const intl = useIntl();

  return (
    <div className="py-12 text-center">
      <RectangleStackIcon className="mx-auto h-12 w-12 text-slate-400" />
      <Heading className="mt-2 text-sm font-medium text-slate-900">
        <FormattedMessage
          defaultMessage="No completed questions"
          description="Text shown when no questions are completed."
          id="H+BRfg"
        />
      </Heading>
      <Section>
        <p className="mt-1 text-sm text-slate-500">
          <FormattedMessage
            defaultMessage="Try out some Front End questions!"
            description="Subtext for call to action when no questions are completed."
            id="e+03Yz"
          />
        </p>
        <div className="mt-6">
          <Button
            href="/prepare/coding"
            label={intl.formatMessage({
              defaultMessage: 'View questions',
              description: 'Label for button to view questions',
              id: 'kx0gZt',
            })}
            variant="primary"
          />
        </div>
      </Section>
    </div>
  );
}

type Props = Readonly<{
  user: User;
}>;

export default function ProfileActivity({ user }: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const [isResetProgressDialogShown, setIsResetProgressDialogShown] =
    useState(false);
  const {
    data: questionProgress,
    isLoading: isFetchingQuestionProgress,
    isError: isErrorQuestionProgress,
  } = useQueryQuestionProgressAll();
  const {
    data: questionList,
    isLoading: isFetchingQuestionList,
    isError: isErrorQuestionList,
  } = useQueryQuestionListCoding();
  const resetProgressMutation = useMutationQuestionProgressDeleteAll();

  if (isFetchingQuestionProgress || isFetchingQuestionList) {
    return (
      <div className="py-10">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  if (isErrorQuestionProgress || isErrorQuestionList) {
    // TODO: Better error handling.
    return (
      <div>
        <FormattedMessage
          defaultMessage="An error occurred"
          description="Error message when there is error fetching question progress or list."
          id="3y3F8i"
        />
      </div>
    );
  }

  if (questionProgress == null || questionProgress.length === 0) {
    return <NoCompletedQuestions />;
  }

  const questionsProgressWithMetadata = questionProgress
    .map((progress) => ({
      createdAt: progress.createdAt,
      metadata: getQuestionMetadata(
        questionList,
        progress.format,
        progress.slug,
      ),
    }))
    .filter(({ metadata }) => !!metadata);

  const resetProgress = () => {
    resetProgressMutation.mutate(
      { user },
      {
        onError: () => {
          showToast({
            title: 'Failed to reset progress. Please try again',
            variant: 'failure',
          });
        },
        onSuccess: () => {
          showToast({
            title: 'Reset progress successful',
            variant: 'success',
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="flex flex-row justify-between border-b border-slate-200 pb-4 text-xl font-semibold">
        <FormattedMessage
          defaultMessage="Completed Questions"
          description="Heading for list of completed questions."
          id="CqG3Op"
        />
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Reset Progress',
            description: 'Label for button to reset progress',
            id: 'PB+rpp',
          })}
          variant="primary"
          onClick={() => setIsResetProgressDialogShown(true)}
        />
        <Dialog
          isShown={isResetProgressDialogShown}
          primaryButton={
            <Button
              display="block"
              label={intl.formatMessage({
                defaultMessage: 'Reset',
                description: 'Label for button to confirm progress reset',
                id: 'dFz30c',
              })}
              variant="primary"
              onClick={() => {
                setIsResetProgressDialogShown(false);
                resetProgress();
              }}
            />
          }
          secondaryButton={
            <Button
              display="block"
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description: 'Label for button to cancel action',
                id: 'rfI2w+',
              })}
              variant="tertiary"
              onClick={() => setIsResetProgressDialogShown(false)}
            />
          }
          title={intl.formatMessage({
            defaultMessage: 'Reset Progress',
            description: 'Title for reset progress confirmation dialog',
            id: 'eBp6vh',
          })}
          onClose={() => setIsResetProgressDialogShown(false)}>
          <Text color="secondary" display="block">
            <FormattedMessage
              defaultMessage="All your progress will be reset, are you sure?"
              description="Text in reset progress confirmation dialog"
              id="u4Qqnq"
            />
          </Text>
        </Dialog>
      </Heading>

      <Section>
        <ul
          className="relative z-0 divide-y divide-slate-200 border-slate-200"
          role="list">
          {questionsProgressWithMetadata.map(({ metadata, createdAt }) => (
            <li key={createdAt} className="relative py-5 sm:py-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex w-3/4 flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-3">
                  <Heading className="text-md w-1/2 font-medium">
                    <Anchor href={metadata?.href} variant="flat">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {metadata!.title}
                    </Anchor>
                  </Heading>
                  {metadata?.languages && (
                    <div className="w-1/2">
                      <QuestionLanguages
                        languages={
                          metadata?.languages as ReadonlyArray<QuestionLanguage>
                        }
                      />
                    </div>
                  )}
                </div>
                <Section>
                  <div>
                    <Text color="secondary" variant="body2">
                      {new Date(createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Section>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
