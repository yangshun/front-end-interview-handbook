import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { useDiscussionsCommentBodySchema } from './CodingWorkspaceDiscussionsComentBodySchema';
import CodingWorkspaceDiscussionsCommentEditor from './CodingWorkspaceDiscussionsCommentEditor';
import type { CodingWorkspaceDiscussionsCommentItem } from './types';

type Props = Readonly<{
  author: {
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  };
  onCancel: () => void;
  parentComment: CodingWorkspaceDiscussionsCommentItem;
}>;

type CommentFormInput = Readonly<{
  body: string;
}>;

export default function CodingWorkspaceDiscussionsReplyInput({
  author,
  onCancel,
  parentComment,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const createReplyMutation = trpc.questionComments.reply.useMutation({
    onSuccess: () => {
      trpcUtils.questionComments.list.invalidate({
        domain: parentComment.domain,
        entityId: parentComment.entityId,
      });
    },
  });
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();
  const { control, handleSubmit } = useForm<CommentFormInput>({
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
  const isReplyingToAReply = parentComment.parentCommentId != null;

  function onSubmit(data: CommentFormInput) {
    createReplyMutation.mutate(
      {
        body: data.body,
        domain: parentComment.domain,
        entityId: parentComment.entityId,
        parentCommentId: isReplyingToAReply
          ? parentComment.parentCommentId
          : parentComment.id,
        repliedToId: isReplyingToAReply ? parentComment.id : undefined,
      },
      {
        onSuccess: () => {
          onCancel();
        },
      },
    );
  }

  return (
    <div className={clsx('space-y-3')}>
      <div className="flex items-center gap-3">
        <Avatar
          alt={author.name ?? author.username}
          size="xs"
          src={author.avatarUrl ?? ''}
        />
        <Text size="body2">
          <FormattedMessage
            defaultMessage="You are replying"
            description="Label for replying to discussions comment"
            id="Cuf2Et"
          />
        </Text>
      </div>
      <form className="ml-9" onSubmit={handleSubmit(onSubmit)}>
        <CodingWorkspaceDiscussionsCommentEditor
          control={control}
          isLoading={false}
        />
        <div className="flex items-center gap-3">
          <Button
            className="w-20"
            isDisabled={createReplyMutation.isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description:
                'Label for cancel reply button on workspace discussions page',
              id: 'y6al2b',
            })}
            variant="secondary"
            onClick={onCancel}
          />
          <Button
            className="w-20"
            isDisabled={createReplyMutation.isLoading}
            isLoading={createReplyMutation.isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Post',
              description:
                'Label for post reply button on workspace discussions page',
              id: 'X143ov',
            })}
            type="submit"
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
}
