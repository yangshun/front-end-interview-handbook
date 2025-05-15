import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import RichTextEditor from '../../ui/RichTextEditor';
import {
  getDiscussionsCommentBodyAttributes,
  useDiscussionsCommentBodySchema,
} from './ProjectsDiscussionsCommentBodySchema';
import type { ProjectsDiscussionsCommentItem } from './types';

type Props = Readonly<{
  comment: ProjectsDiscussionsCommentItem;
  onCancel: () => void;
}>;

type CommentFormInput = Readonly<{
  body: string;
}>;

export default function ProjectsDiscussionsCommentEditInput({
  comment,
  onCancel,
}: Props) {
  const intl = useIntl();

  const trpcUtils = trpc.useUtils();

  const updateCommentMutation = trpc.projects.comments.update.useMutation({
    onSuccess: () => {
      trpcUtils.projects.comments.invalidate();
    },
  });
  const attrs = getDiscussionsCommentBodyAttributes(intl);
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

  const { formState, getValues, handleSubmit, setValue } =
    useForm<CommentFormInput>({
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
  const onSubmit: SubmitHandler<CommentFormInput> = (data) =>
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

  return (
    <form
      className="flex w-full grow flex-col"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2">
        <RichTextEditor
          autoFocus={true}
          disabled={updateCommentMutation.isLoading}
          errorMessage={
            formState.dirtyFields.body || formState.submitCount > 0
              ? formState.errors.body?.message
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
          className="w-[100px]"
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
