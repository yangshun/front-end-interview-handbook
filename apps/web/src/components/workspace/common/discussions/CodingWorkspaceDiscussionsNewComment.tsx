import { zodResolver } from '@hookform/resolvers/zod';
import type { InterviewsDiscussionCommentDomain } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { useDiscussionsCommentBodySchema } from './CodingWorkspaceDiscussionsComentBodySchema';
import CodingWorkspaceDiscussionsCommentEditor from './CodingWorkspaceDiscussionsCommentEditor';

type CommentFormInput = Readonly<{
  body: string;
}>;

type Props = Readonly<{
  domain: InterviewsDiscussionCommentDomain;
  entityId: string;
}>;

export default function CodingWorkspaceDiscussionsNewComment({
  domain,
  entityId,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const [editorRerenderKey, setEditorRerenderKey] = useState(0);
  const createCommentMutation = trpc.questionComments.create.useMutation({
    onSuccess: () => {
      trpcUtils.questionComments.list.invalidate({
        domain,
        entityId,
      });
    },
  });
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

  const { control, handleSubmit, reset } = useForm<CommentFormInput>({
    defaultValues: {
      body: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(
      z.object({
        body: discussionsCommentBodySchema,
      }),
    ),
  });

  function onSubmit(data: CommentFormInput) {
    return createCommentMutation.mutate(
      {
        body: data.body,
        domain,
        entityId,
      },
      {
        onSuccess: () => {
          setEditorRerenderKey((prevKey) => prevKey + 1);
          reset();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CodingWorkspaceDiscussionsCommentEditor
        control={control}
        editorRerenderKey={editorRerenderKey}
        isLoading={createCommentMutation.isLoading}
      />
      <Button
        className="w-20"
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
    </form>
  );
}
