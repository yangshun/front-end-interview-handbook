import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import {
  getDiscussionsCommentBodyAttributes,
  useDiscussionsCommentBodySchema,
} from '~/components/discussions/DiscussionsCommentBodySchema';
import type { DiscussionsCommentUserProfile } from '~/components/discussions/types';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';

import type { ProjectsChallengeItem } from '../types';
import ProjectsProfileDisplayNameLink from '../../users/ProjectsProfileDisplayNameLink';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  viewer: DiscussionsCommentUserProfile;
}>;

type CommentFormInput = Readonly<{
  body: string;
  isQuestion: boolean;
}>;

export default function ProjectsChallengeDiscussionsNewComment({
  challenge,
  viewer,
}: Props) {
  const intl = useIntl();
  const createCommentMutation = trpc.comments.create.useMutation();
  const attrs = getDiscussionsCommentBodyAttributes(intl);
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

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
        body: discussionsCommentBodySchema,
        isQuestion: z.boolean(),
      }),
    ),
  });
  const onSubmit: SubmitHandler<CommentFormInput> = (data) => {
    return createCommentMutation.mutate(
      {
        body: data.body,
        category: data.isQuestion ? 'QUESTION' : undefined,
        domain: 'PROJECTS_CHALLENGE',
        entityId: challenge.metadata.slug,
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
        {/* TODO(projects): fetch real points */}
        <ProjectsProfileAvatar profile={{ ...viewer, points: 42 }} size="xl" />
        <div className="flex flex-col gap-y-1">
          <Text size="body2" weight="medium">
            <ProjectsProfileDisplayNameLink profile={viewer} />
          </Text>
          <UserProfileInformationRow profile={viewer} size="xs" />
        </div>
      </div>
      <TextArea
        autoResize={true}
        classNameOuter="my-3"
        disabled={createCommentMutation.isLoading}
        errorMessage={errors.body?.message}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Discussion post comment',
          description: 'Label for discussion post input textarea',
          id: 'NA1S3Z',
        })}
        maxLength={attrs.validation.maxLength}
        minLength={attrs.validation.minLength}
        placeholder={attrs.placeholder}
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
