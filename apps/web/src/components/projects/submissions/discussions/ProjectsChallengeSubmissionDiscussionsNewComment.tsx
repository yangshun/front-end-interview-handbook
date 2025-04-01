import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { RiFireFill } from 'react-icons/ri';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import {
  getDiscussionsCommentBodyAttributes,
  useDiscussionsCommentBodySchema,
} from '~/components/projects/discussions/ProjectsDiscussionsCommentBodySchema';
import type { ProjectsDiscussionsCommentAuthor } from '~/components/projects/discussions/types';
import Button from '~/components/ui/Button';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import RichTextEditor from '~/components/ui/RichTextEditor';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeSubmissionAugmented } from '../types';
import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';
import ProjectsProfileAvatar from '../../users/ProjectsProfileAvatar';
import ProjectsProfileDisplayNameLink from '../../users/ProjectsProfileDisplayNameLink';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionAugmented;
  viewer: ProjectsDiscussionsCommentAuthor;
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
  const trpcUtils = trpc.useUtils();
  const { showToast } = useToast();
  const [editorRerenderKey, setEditorRerenderKey] = useState(0);
  const createCommentMutation = trpc.projects.comments.create.useMutation({
    onSuccess: () => {
      trpcUtils.projects.comments.invalidate();
    },
  });
  const attrs = getDiscussionsCommentBodyAttributes(intl);
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

  const { handleSubmit, setValue, getValues, formState, reset, control } =
    useForm<CommentFormInput>({
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
        entityOwnerId: submission.projectsProfile?.id,
      },
      {
        onSuccess: () => {
          setEditorRerenderKey((prevKey) => prevKey + 1);
          showToast({
            addOnIcon: RiFireFill,
            addOnLabel: `+${ProjectsReputationPointsConfig.DISCUSSIONS_COMMENT}`,
            description: intl.formatMessage({
              defaultMessage: 'Your thoughts are valued',
              description:
                'Toast message description about gaining reputation points',
              id: 'bEHqsi',
            }),
            title: intl.formatMessage({
              defaultMessage: 'Thanks for contributing',
              description:
                'Toast message title about gaining reputation points',
              id: 'tpQwtr',
            }),
            variant: 'success',
          });
          reset();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <ProjectsProfileAvatar
          points={viewer.points}
          size="xl"
          userProfile={viewer.userProfile}
        />
        <div className="flex flex-col gap-y-1">
          <Text size="body2" weight="medium">
            <ProjectsProfileDisplayNameLink userProfile={viewer.userProfile} />
          </Text>
          <UserProfileInformationRow
            size="body3"
            userProfile={viewer.userProfile}
          />
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Text size="body3" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'Mark post as (optional):',
            description: 'Mark post as optional label',
            id: 'u6wB20',
          })}
        </Text>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Code review',
                    description: 'Discussions comment category label',
                    id: 'v4mi2Z',
                  }),
                  value: 'CODE_REVIEW',
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Question',
                    description: 'Discussions comment category label',
                    id: 'kdX5r2',
                  }),
                  value: 'QUESTION',
                },
              ].map(({ value, label }) => (
                <FilterButton
                  key={value}
                  label={label}
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
          errorMessage={
            formState.dirtyFields.body || formState.submitCount > 0
              ? formState.errors.body?.message
              : undefined
          }
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
