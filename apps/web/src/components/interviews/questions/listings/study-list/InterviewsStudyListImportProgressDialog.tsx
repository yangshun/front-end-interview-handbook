import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import {
  themeBorderElementColor,
  themeDivideEmphasizeColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  questions: ReadonlyArray<QuestionMetadata>;
  studyListKey: string;
}>;

export default function InterviewsStudyListImportProgressDialog({
  questions,
  studyListKey,
  isShown,
  onClose,
}: Props) {
  const intl = useIntl();
  const utils = trpc.useUtils();
  const { showToast } = useToast();
  const importProgressMutation =
    trpc.questionProgress.importProgress.useMutation();
  const [selectedQuestionsSlug, setSelectedQuestionsSlug] = useState<
    Array<string>
  >([]);

  const previousCompletedCount = questions.length;

  function onSelect(value: boolean, slug: string) {
    if (value) {
      setSelectedQuestionsSlug((prevQuestions) => [...prevQuestions, slug]);
    } else {
      setSelectedQuestionsSlug((prevQuestions) =>
        prevQuestions.filter((question) => question !== slug),
      );
    }
  }

  function onSelectAll() {
    if (selectedQuestionsSlug.length === questions.length) {
      setSelectedQuestionsSlug([]);
    } else {
      setSelectedQuestionsSlug(questions.map((question) => question.slug));
    }
  }

  function onImportProgress() {
    const data = questions
      .filter((question) => selectedQuestionsSlug.includes(question.slug))
      .map(({ format, slug }) => ({ format, slug }));

    importProgressMutation.mutate(
      {
        questions: data,
        studyListKey,
      },
      {
        onSuccess() {
          utils.questionLists.getActiveSession.invalidate();
          utils.questionLists.getSessionProgress.invalidate();
          showToast({
            title: intl.formatMessage({
              defaultMessage: 'Progress imported successfully',
              description: 'Success message for import progress',
              id: 'DXjqwr',
            }),
            variant: 'success',
          });
          onClose();
        },
      },
    );
  }

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          isDisabled={
            importProgressMutation.isLoading ||
            selectedQuestionsSlug.length === 0
          }
          isLoading={importProgressMutation.isLoading}
          label={intl.formatMessage(
            {
              defaultMessage: 'Import ({questionCount})',
              description: 'Label for import button on import progress dialog',
              id: 'qDiloP',
            },
            {
              questionCount: selectedQuestionsSlug.length,
            },
          )}
          size="md"
          variant="primary"
          onClick={onImportProgress}
        />
      }
      secondaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Cancel',
            description: 'Label for cancel button on import progress dialog',
            id: 'A5COe1',
          })}
          size="md"
          variant="secondary"
          onClick={onClose}
        />
      }
      title={intl.formatMessage({
        defaultMessage: 'Import previous progress',
        description: 'Title for import progress dialog',
        id: 'zBDuWv',
      })}
      width="screen-sm"
      onClose={onClose}>
      <div className={clsx('flex flex-col gap-6')}>
        <div className="inline-flex flex-col">
          <Text color="subtitle" size="body2">
            <FormattedMessage
              defaultMessage="You've previously completed {questionCount, plural, =0 {<bold>0</bold> questions} one {<bold>1</bold> question} other {<bold>#</bold> questions}} from this list."
              description="Description for import progress"
              id="i/1i64"
              values={{
                bold: (chunk) => (
                  <Text size="inherit" weight="bold">
                    {chunk}
                  </Text>
                ),
                questionCount: previousCompletedCount,
              }}
            />
          </Text>
          <Text color="subtitle" size="body2">
            <FormattedMessage
              defaultMessage="Import that progress into this list?"
              description="Description for import progress"
              id="rQpb6P"
            />
          </Text>
        </div>

        <div
          className={clsx(
            ['border-y', themeBorderElementColor],
            '-mx-6',
            'max-h-[176px]',
            'overflow-y-auto',
            ['divide-y', themeDivideEmphasizeColor],
          )}>
          <div
            className={clsx(
              'px-6 py-3',
              'bg-neutral-50 dark:bg-neutral-900/50',
            )}>
            <CheckboxInput
              label={
                <Text size="body2" weight="bold">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Select all ({questionCount})',
                      description:
                        'Label for select all in import progress dialog',
                      id: 'nMbx46',
                    },
                    { questionCount: previousCompletedCount },
                  )}
                </Text>
              }
              value={
                questions.length === selectedQuestionsSlug.length
                  ? true
                  : selectedQuestionsSlug.length === 0
                    ? false
                    : 'indeterminate'
              }
              onChange={onSelectAll}
            />
          </div>
          {questions.map((question) => (
            <div key={question.title} className={clsx('px-6 py-3')}>
              <CheckboxInput
                label={question.title}
                value={selectedQuestionsSlug.includes(question.slug)}
                onChange={(value) => onSelect(value, question.slug)}
              />
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}
