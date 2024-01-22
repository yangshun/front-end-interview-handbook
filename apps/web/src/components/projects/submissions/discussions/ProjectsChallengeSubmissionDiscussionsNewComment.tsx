import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import ProjectsUserJobTitle from '~/components/projects/users/ProjectsUserJobTitle';
import UserAvatarWithLevel from '~/components/projects/users/UserAvatarWithLevel';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';

import type { ProjectsChallengeSubmissionWithVotesAuthorChallenge } from '../types';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionWithVotesAuthorChallenge;
  viewer: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    title: string | null;
    username: string;
  }>;
}>;

type CommentFormInput = Readonly<{
  body: string;
  isQuestion: boolean;
}>;

export default function ProjectsChallengeSubmissionDiscussionsNewComment({
  submission,
  viewer,
}: Props) {
  const intl = useIntl();
  const createCommentMutation = trpc.comments.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CommentFormInput>({
    defaultValues: {
      body: '',
      isQuestion: false,
    },
    mode: 'onSubmit',
    resolver: zodResolver(
      z.object({
        body: z.string().trim().min(10).max(40000),
        isQuestion: z.boolean(),
      }),
    ),
  });
  const onSubmit: SubmitHandler<CommentFormInput> = (data) => {
    return createCommentMutation.mutate(
      {
        body: data.body,
        category: data.isQuestion ? 'QUESTION' : undefined,
        domain: 'PROJECTS_SUBMISSION',
        entityId: submission.id,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <UserAvatarWithLevel
          level={11}
          profile={viewer}
          progress={50}
          size="xl"
        />
        <div className="flex flex-col">
          <Text size="body2" weight="medium">
            <Anchor href={`/projects/u/${viewer.username}`} variant="flat">
              {viewer.name ?? viewer.username}
            </Anchor>
          </Text>
          {viewer?.title && (
            <ProjectsUserJobTitle jobTitle={viewer.title} size="2xs" />
          )}
        </div>
      </div>
      <TextArea
        autoResize={true}
        classNameOuter="my-3"
        disabled={createCommentMutation.isLoading}
        errorMessage={errors.body?.message}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Submit a comment',
          description: 'Label for discussion input textarea',
          id: 'FEamkQ',
        })}
        maxLength={40000}
        placeholder={intl.formatMessage({
          defaultMessage: 'Share your questions or thoughts',
          description: 'Placeholder for discussion post input text area',
          id: 'OrN/z/',
        })}
        required={true}
        rows={5}
        {...register('body')}
        onChange={(value) => register('body').onChange({ target: { value } })}
      />
      <CheckboxInput
        disabled={createCommentMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Post as question',
          description: 'Label for toggle to post as question',
          id: 'WoEmKY',
        })}
        {...register('isQuestion')}
        // For some reason RHF doesn't work with uncontrolled checkboxes.
        // Spent an hour debugging still can't find the reason.
        onChange={(value) => setValue('isQuestion', value)}
      />
      <div className="mt-4 flex items-center gap-4">
        <Button
          className="w-[120px]"
          isDisabled={createCommentMutation.isLoading}
          isLoading={createCommentMutation.isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Post',
            description: 'Label for post button on project discussions page',
            id: 'bnqijt',
          })}
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
