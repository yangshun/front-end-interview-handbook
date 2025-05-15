'use client';

import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  InterviewsQuestionMetadata,
  QuestionCodingWorkingLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import { useVimMode } from '../common/editor/hooks/useVimMode';
import MonacoCodeEditor from '../common/editor/MonacoCodeEditor';
import JavaScriptCodingWorkspaceWorkingLanguageSelect from './JavaScriptCodingWorkspaceWorkingLanguageSelect';

type Props = Readonly<{
  metadata: InterviewsQuestionMetadata;
}>;

type CommunitySolutionDraft = Readonly<{
  code: string;
  language: QuestionCodingWorkingLanguage;
  title: string;
  writeup: string;
}>;

function JavaScriptCodingWorkspaceCommunitySolutionCreateTabImpl({
  metadata: { slug },
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();

  const { isVimModeEnabled } = useVimMode();

  const { isLoading, mutateAsync: addSolution } =
    trpc.questionCommunitySolution.javaScriptAdd.useMutation({
      onSuccess: () => {
        trpcUtils.questionCommunitySolution.javaScriptGet.invalidate();
        trpcUtils.questionCommunitySolution.javaScriptGetAll.invalidate();
      },
    });

  const { control, formState, handleSubmit } = useForm<CommunitySolutionDraft>({
    defaultValues: {
      code: '',
      language: 'ts',
      title: '',
      writeup: '',
    },
    mode: 'onTouched',
  });

  return (
    <form
      className="flex w-full flex-col gap-y-2 p-4"
      onSubmit={handleSubmit(({ code, language, title, writeup }) => {
        addSolution({
          code,
          language: language === 'js' ? 'JS' : 'TS',
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
            description: 'Coding workspace post solution button label',
            id: 'OmFm8C',
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
      <Controller
        control={control}
        name="language"
        render={({ field }) => (
          <JavaScriptCodingWorkspaceWorkingLanguageSelect {...field} />
        )}
      />
      <Controller
        control={control}
        name="code"
        render={({ field: { ref: _, ...field } }) => (
          <div className="flex flex-1 flex-col">
            <MonacoCodeEditor
              filePath="community-solution.ts"
              isVimModeEnabled={isVimModeEnabled}
              {...field}
            />
            {formState.isDirty && formState.errors.code?.message && (
              <Text color="error" size="body2" weight="medium">
                {formState.errors.code?.message}
              </Text>
            )}
          </div>
        )}
        rules={{
          required: intl.formatMessage({
            defaultMessage: 'Code cannot be empty',
            description: 'Community solution code required error message',
            id: 'sWharh',
          }),
        }}
      />
    </form>
  );
}

export default function JavaScriptCodingWorkspaceCommunitySolutionCreateTab({
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
    <JavaScriptCodingWorkspaceCommunitySolutionCreateTabImpl
      metadata={metadata}
    />
  );
}
