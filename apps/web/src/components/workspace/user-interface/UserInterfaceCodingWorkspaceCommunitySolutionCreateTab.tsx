'use client';

import { useSandpack } from '@codesandbox/sandpack-react';
import { Controller, useForm } from 'react-hook-form';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  InterviewsQuestionMetadata,
  QuestionFramework,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import { staticUpperCase } from '~/utils/typescript/stringTransform';

type Props = Readonly<{
  framework: QuestionFramework;
  metadata: InterviewsQuestionMetadata;
}>;

type CommunitySolutionDraft = Readonly<{
  title: string;
  writeup: string;
}>;

function UserInterfaceCodingWorkspaceCommunitySolutionCreateTabImpl({
  framework,
  metadata: { slug },
}: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const trpcUtils = trpc.useUtils();

  const {
    sandpack: { files },
  } = useSandpack();

  const { control, formState, handleSubmit, reset } =
    useForm<CommunitySolutionDraft>({
      defaultValues: {
        title: '',
        writeup: '',
      },
      mode: 'onTouched',
    });

  const { isLoading, mutateAsync: addSolution } =
    trpc.questionCommunitySolution.userInterfaceAdd.useMutation({
      onSuccess: (data) => {
        if (data === null) {
          return;
        }

        showToast({
          description: intl.formatMessage({
            defaultMessage: 'Your solution has been posted',
            description: 'Community solution posted toast message',
            id: 'TngZLb',
          }),
          title: `Solution posted: ${data.title}`,
          variant: 'success',
        });
        reset();
        trpcUtils.questionCommunitySolution.userInterfaceGetAll.invalidate();
      },
    });

  return (
    <form
      className="flex w-full flex-col gap-y-2 p-4"
      onSubmit={handleSubmit(({ title, writeup }) => {
        addSolution({
          files: JSON.stringify(files),
          framework: staticUpperCase(framework),
          slug,
          title,
          writeup,
        });
      })}>
      <div className="flex flex-row-reverse gap-2">
        <Button
          className="mt-0.5 shrink-0"
          isDisabled={!formState.isDirty || isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Post',
            description: 'Community solution post button label',
            id: '5mnKpn',
          })}
          type="submit"
          variant="primary"
        />
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <div className="flex-1">
              <TextInput
                errorMessage={
                  formState.dirtyFields.title || formState.submitCount > 0
                    ? formState.errors.title?.message
                    : undefined
                }
                isLabelHidden={true}
                label={intl.formatMessage({
                  defaultMessage: 'Title',
                  description: 'Community solution title label',
                  id: 'Ib0ZgM',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Title',
                  description: 'Community solution title label',
                  id: 'Ib0ZgM',
                })}
                {...field}
              />
            </div>
          )}
          rules={{
            required: intl.formatMessage({
              defaultMessage: 'Title cannot be empty',
              description: 'Community solution title required error message',
              id: 'PtJfRZ',
            }),
          }}
        />
      </div>
      <Controller
        control={control}
        name="writeup"
        render={({ field }) => (
          <TextArea
            errorMessage={
              formState.dirtyFields.writeup || formState.submitCount > 0
                ? formState.errors.writeup?.message
                : undefined
            }
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Writeup',
              description: 'Community solution writeup label',
              id: 'N5d7zE',
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'Writeup',
              description: 'Community solution writeup label',
              id: 'N5d7zE',
            })}
            {...field}
          />
        )}
        rules={{
          required: intl.formatMessage({
            defaultMessage: 'Writeup cannot be empty',
            description: 'Community solution writeup required error message',
            id: 'X614ft',
          }),
        }}
      />
    </form>
  );
}

export default function UserInterfaceCodingWorkspaceCommunitySolutionCreateTab({
  framework,
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
                defaultMessage: 'You must be signed in to post a solution',
                description: 'Community solution sign in required title',
                id: 'osP1GZ',
              })}
              variant="login"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <UserInterfaceCodingWorkspaceCommunitySolutionCreateTabImpl
      framework={framework}
      metadata={metadata}
    />
  );
}
