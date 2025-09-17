'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import {
  useMutationQuestionBookmarkAdd,
  useMutationQuestionBookmarkDelete,
  useQueryQuestionBookmark,
} from '~/db/QuestionsBookmarkClient';

import type { QuestionMetadata } from './QuestionsTypes';

type Props = Readonly<{
  metadata: Pick<QuestionMetadata, 'format' | 'slug'>;
  variant?: 'button' | 'dropdown-item';
}>;

export default function QuestionBookmarkAction({
  metadata,
  variant = 'button',
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { signInUpHref } = useAuthSignInUp();

  const addBookmarkMutation = useMutationQuestionBookmarkAdd();
  const deleteBookmarkMutation = useMutationQuestionBookmarkDelete();
  const { data, isFetching } = useQueryQuestionBookmark(metadata);

  const isBookmarked = data != null;

  async function handleBookmarkToggle() {
    if (user == null) {
      return;
    }
    if (isBookmarked) {
      await deleteBookmarkMutation.mutateAsync({
        listId: data.listId,
        question: {
          format: metadata.format,
          slug: metadata.slug,
        },
      });

      return;
    }

    await addBookmarkMutation.mutateAsync({
      question: {
        format: metadata.format,
        slug: metadata.slug,
      },
    });
  }

  const Icon = isBookmarked ? RiBookmarkFill : RiBookmarkLine;
  const bookmarkTooltip = isBookmarked
    ? intl.formatMessage({
        defaultMessage: 'Remove',
        description: 'Tooltip to remove bookmark',
        id: 'DY0cPB',
      })
    : intl.formatMessage({
        defaultMessage: 'Add to bookmark',
        description: 'Tooltip to add bookmark',
        id: 'LGi4p/',
      });

  const commonProps = {
    href:
      user == null
        ? signInUpHref({ query: { source: 'bookmark_now' } })
        : undefined,
    icon: Icon,
    label: intl.formatMessage({
      defaultMessage: 'Bookmark',
      description: 'Label to bookmark a question',
      id: 'qbYVHF',
    }),
    onClick: handleBookmarkToggle,
  };

  if (variant === 'dropdown-item') {
    return <DropdownMenu.Item {...commonProps} />;
  }

  if (isFetching) {
    return (
      <Button
        addonPosition="start"
        isLabelHidden={true}
        size="xs"
        tooltip={bookmarkTooltip}
        variant="secondary"
        {...commonProps}
        className="cursor-disabled"
        onClick={() => {}}
      />
    );
  }

  return (
    <Button
      addonPosition="start"
      isDisabled={
        addBookmarkMutation.isLoading || deleteBookmarkMutation.isLoading
      }
      isLabelHidden={true}
      isLoading={
        addBookmarkMutation.isLoading || deleteBookmarkMutation.isLoading
      }
      size="xs"
      tooltip={bookmarkTooltip}
      variant="secondary"
      {...commonProps}
    />
  );
}
