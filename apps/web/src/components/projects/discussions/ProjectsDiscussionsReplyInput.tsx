import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { RiFireFill } from 'react-icons/ri';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import RichTextEditor from '../../ui/RichTextEditor';
import { ProjectsReputationPointsConfig } from '../reputation/ProjectsReputationPointsConfig';
import {
  getDiscussionsCommentBodyAttributes,
  useDiscussionsCommentBodySchema,
} from './ProjectsDiscussionsCommentBodySchema';
import ProjectsDiscussionsCommentRepliesThreadLines from './ProjectsDiscussionsCommentRepliesThreadLines';
import type {
  ProjectsDiscussionsCommentAuthor,
  ProjectsDiscussionsCommentItem,
} from './types';

type Props = Readonly<{
  hasNext: boolean;
  onCancel: () => void;
  parentComment: ProjectsDiscussionsCommentItem;
  viewer: ProjectsDiscussionsCommentAuthor;
}>;

type CommentFormInput = Readonly<{
  body: string;
}>;

export default function ProjectsDiscussionsReplyInput({
  hasNext,
  onCancel,
  parentComment,
  viewer,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const { showToast } = useToast();
  const createReplyMutation = trpc.projects.comments.reply.useMutation({
    onSuccess: () => {
      trpcUtils.projects.comments.invalidate();
    },
  });
  const attrs = getDiscussionsCommentBodyAttributes(intl);
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

  const {
    formState: { dirtyFields, errors, submitCount },
    getValues,
    handleSubmit,
    setValue,
  } = useForm<CommentFormInput>({
    defaultValues: {
      body: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(
      z.object({
        body: discussionsCommentBodySchema,
      }),
    ),
  });
  const onSubmit: SubmitHandler<CommentFormInput> = (data) =>
    createReplyMutation.mutate(
      {
        body: data.body,
        domain: parentComment.domain,
        entityId: parentComment.entityId,
        parentCommentId: parentComment.id,
      },
      {
        onSuccess: () => {
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
          onCancel();
        },
      },
    );

  return (
    <div className="relative flex">
      <ProjectsDiscussionsCommentRepliesThreadLines
        branchHeightClass="h-7"
        drawVerticalLine={hasNext}
      />
      <div className={clsx('flex flex-1 items-start gap-4', hasNext && 'pb-6')}>
        <ProjectsProfileAvatar
          points={viewer.points}
          size="xl"
          userProfile={viewer.userProfile}
        />
        <form className="flex grow flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Text size="body2" weight="medium">
            <FormattedMessage
              defaultMessage="You are replying"
              description="Label for replying to discussion post on project discussions page"
              id="IBaiFq"
            />
          </Text>
          <div className="mt-2">
            <RichTextEditor
              autoFocus={true}
              disabled={createReplyMutation.isLoading}
              errorMessage={
                dirtyFields.body || submitCount > 0
                  ? errors.body?.message
                  : undefined
              }
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Reply to comment',
                description: 'Label for discussion post reply input',
                id: 'YpJ3q8',
              })}
              minHeight="100px"
              placeholder={attrs.placeholder}
              required={true}
              value={getValues('body')}
              onChange={(value) => setValue('body', value)}
            />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button
              className="w-[100px]"
              isDisabled={createReplyMutation.isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description:
                  'Label for cancel reply button on project discussions page',
                id: 'WPoLv8',
              })}
              variant="secondary"
              onClick={onCancel}
            />
            <Button
              className="w-[100px]"
              isDisabled={createReplyMutation.isLoading}
              isLoading={createReplyMutation.isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Post',
                description:
                  'Label for post reply button on project discussions page',
                id: '+dUPPi',
              })}
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
