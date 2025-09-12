import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { useDiscussionsCommentBodySchema } from './CodingWorkspaceDiscussionsComentBodySchema';
import CodingWorkspaceDiscussionsCommentEditor from './CodingWorkspaceDiscussionsCommentEditor';
import type { CodingWorkspaceDiscussionsCommentItem } from './types';

type Props = Readonly<{
  comment: CodingWorkspaceDiscussionsCommentItem;
  onCancel: () => void;
}>;

type CommentFormInput = Readonly<{
  body: string;
}>;

export default function CodingWorkspaceDiscussionsCommentEditInput({
  comment,
  onCancel,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();

  const updateCommentMutation = trpc.questionComments.update.useMutation({
    onSuccess: () => {
      trpcUtils.questionComments.list.invalidate({
        domain: comment.domain,
        entityId: comment.entityId,
      });
    },
  });
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

  const { control, handleSubmit } = useForm<CommentFormInput>({
    defaultValues: {
      body: comment.body,
    },
    mode: 'onSubmit',
    resolver: zodResolver(
      z.object({
        body: discussionsCommentBodySchema,
      }),
    ),
  });

  function onSubmit(data: CommentFormInput) {
    updateCommentMutation.mutate(
      {
        body: data.body,
        commentId: comment.id,
      },
      {
        onSuccess: () => {
          onCancel();
        },
      },
    );
  }

  return (
    <form
      className="flex w-full grow flex-col"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2">
        <CodingWorkspaceDiscussionsCommentEditor
          control={control}
          isLoading={updateCommentMutation.isLoading}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="w-20"
          isDisabled={updateCommentMutation.isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Cancel',
            description: 'Cancel button label',
            id: '0GT0SI',
          })}
          variant="secondary"
          onClick={onCancel}
        />
        <Button
          className="w-20"
          isDisabled={updateCommentMutation.isLoading}
          isLoading={updateCommentMutation.isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Save',
            description: 'Save update button label',
            id: 'aYJLMU',
          })}
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
