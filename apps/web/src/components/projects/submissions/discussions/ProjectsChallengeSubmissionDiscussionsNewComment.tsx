import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import FilterButton from '~/components/common/FilterButton';
import {
  getDiscussionsCommentBodyAttributes,
  useDiscussionsCommentBodySchema,
} from '~/components/discussions/DiscussionsCommentBodySchema';
import type { DiscussionsCommentUserProfile } from '~/components/discussions/types';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import Button from '~/components/ui/Button';
import RichTextEditor from '~/components/ui/RichTextEditor';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeSubmissionAugmented } from '../types';
import ProjectsProfileAvatar from '../../users/ProjectsProfileAvatar';
import ProjectsProfileDisplayNameLink from '../../users/ProjectsProfileDisplayNameLink';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionAugmented;
  viewer: DiscussionsCommentUserProfile;
}>;

type CommentFormInput = Readonly<{
  body: string;
  category: string | null;
}>;

export default function ProjectsChallengeSubmissionDiscussionsNewComment({
  submission,
  viewer,
}: Props) {
  const intl = useIntl();
  const [editorRerenderKey, setEditorRerenderKey] = useState(0);
  const createCommentMutation = trpc.comments.create.useMutation();
  const attrs = getDiscussionsCommentBodyAttributes(intl);
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
    control,
  } = useForm<CommentFormInput>({
    defaultValues: {
      body: '',
      category: null,
    },
    mode: 'onSubmit',
    resolver: zodResolver(
      z.object({
        body: discussionsCommentBodySchema,
        category: z.string().nullable(), // TODO(projects): change to enum.
      }),
    ),
  });
  const onSubmit: SubmitHandler<CommentFormInput> = (data) => {
    return createCommentMutation.mutate(
      {
        body: data.body,
        category: data.category ?? undefined,
        domain: 'PROJECTS_SUBMISSION',
        entityId: submission.id,
      },
      {
        onSuccess: () => {
          setEditorRerenderKey((prevKey) => prevKey + 1);
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
      <div className="flex flex-wrap gap-2 items-center mt-2">
        <Text size="body3" weight="medium">
          Mark post as (optional):
        </Text>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {[
                {
                  label: 'Code review',
                  value: 'CODE_REVIEW',
                },
                {
                  label: 'Question',
                  value: 'QUESTION',
                },
              ].map(({ value, label }) => (
                <FilterButton
                  key={value}
                  label={label}
                  purpose="tab"
                  selected={field.value === value}
                  size="xs"
                  onClick={() => {
                    field.onChange(field.value === value ? null : value);
                  }}
                />
              ))}
            </div>
          )}
        />
      </div>
      <div className="my-3">
        <RichTextEditor
          key={editorRerenderKey}
          disabled={createCommentMutation.isLoading}
          errorMessage={errors.body?.message}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Submit a comment',
            description: 'Label for discussion input textarea',
            id: 'FEamkQ',
          })}
          minHeight="100px"
          placeholder={attrs.placeholder}
          required={true}
          value={getValues('body')}
          onChange={(value) => {
            setValue('body', value);
          }}
        />
      </div>
      <div className="flex items-center gap-4">
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
