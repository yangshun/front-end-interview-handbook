import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';

import {
  getDiscussionsCommentBodyAttributes,
  useDiscussionsCommentBodySchema,
} from './DiscussionsCommentBodySchema';
import type { DiscussionsCommentItem } from './types';
import RichTextEditor from '../ui/RichTextEditor';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  comment: DiscussionsCommentItem;
  onCancel: () => void;
}>;

type CommentFormInput = Readonly<{
  body: string;
}>;

export default function DiscussionsCommentEditInput({
  comment,
  onCancel,
}: Props) {
  const intl = useIntl();
  const updateCommentMutation = trpc.comments.update.useMutation();
  const attrs = getDiscussionsCommentBodyAttributes(intl);
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CommentFormInput>({
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
      className="w-full flex flex-grow flex-col"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2">
        <RichTextEditor
          disabled={updateCommentMutation.isLoading}
          errorMessage={errors.body?.message}
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
