import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import TextArea from '~/components/ui/TextArea';

import type { DiscussionsCommentItem } from './types';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormInput>({
    defaultValues: {
      body: comment.content,
    },
    mode: 'onSubmit',
    resolver: zodResolver(
      z.object({
        body: z.string().trim().min(10).max(40000),
      }),
    ),
  });
  const onSubmit: SubmitHandler<CommentFormInput> = (data) =>
    updateCommentMutation.mutate(
      {
        commentId: comment.id,
        content: data.body,
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
      <TextArea
        autoFocus={true}
        autoResize={true}
        classNameOuter="mt-2"
        errorMessage={errors.body?.message}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Reply to comment',
          description: 'Label for discussion post reply input',
          id: 'YpJ3q8',
        })}
        placeholder={intl.formatMessage({
          defaultMessage: 'Text here',
          description: 'Placeholder for discussion post reply input',
          id: 'IEA3DS',
        })}
        required={true}
        {...register('body')}
        disabled={updateCommentMutation.isLoading}
        onChange={(value) => register('body').onChange({ target: { value } })}
      />
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
