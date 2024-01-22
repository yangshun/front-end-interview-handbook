import clsx from 'clsx';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';

import DiscussionsCommentRepliesThreadLines from './DiscussionsCommentRepliesThreadLines';
import type {
  DiscussionsCommentItem,
  DiscussionsCommentUserProfile,
} from './types';
import UserAvatarWithLevel from '../projects/users/UserAvatarWithLevel';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  hasNext: boolean;
  onCancel: () => void;
  parentComment: DiscussionsCommentItem;
  viewer: DiscussionsCommentUserProfile;
}>;

type CommentFormInput = Readonly<{
  body: string;
}>;

export default function DiscussionsReplyInput({
  hasNext,
  onCancel,
  viewer,
  parentComment,
}: Props) {
  const intl = useIntl();
  const createReplyMutation = trpc.comments.reply.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormInput>({
    defaultValues: {
      body: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(
      z.object({
        body: z.string().trim().min(10).max(40000),
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
          onCancel();
        },
      },
    );

  return (
    <div className="relative flex">
      <DiscussionsCommentRepliesThreadLines
        branchHeightClass="h-7"
        drawVerticalLine={hasNext}
      />
      <div className={clsx('flex flex-1 items-start gap-4', hasNext && 'pb-6')}>
        <UserAvatarWithLevel
          level={30}
          profile={viewer}
          progress={50}
          size="xl"
        />
        <form
          className="flex flex-grow flex-col"
          onSubmit={handleSubmit(onSubmit)}>
          <Text size="body2" weight="medium">
            <FormattedMessage
              defaultMessage="You are replying"
              description="Label for replying to discussion post on project discussions page"
              id="IBaiFq"
            />
          </Text>
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
            disabled={createReplyMutation.isLoading}
            onChange={(value) =>
              register('body').onChange({ target: { value } })
            }
          />
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
