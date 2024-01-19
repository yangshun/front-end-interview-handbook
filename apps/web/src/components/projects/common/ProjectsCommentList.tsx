import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import type { CommentActivity } from './ProjectsCodeReviewsTab';
import RelativeTimestamp from './RelativeTimestamp';

type Props = Readonly<{
  comments: Array<CommentActivity>;
  title: string;
}>;

export default function ProjectsCommentList({ comments, title }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Text size="body1" weight="medium">
        {title}
      </Text>
      <ul
        className={clsx(
          'isolate rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {comments.map((comment, index) => (
          <li
            key={comment.createdAt}
            className={clsx(
              'group relative flex py-5 pl-4 pr-6',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              'bg-white dark:bg-neutral-800/40',
              'transition-colors',
              themeBackgroundEmphasizedHover,
              index === 0 && 'rounded-t-lg',
              index === comments.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex flex-row justify-between gap-6 w-full">
              <div className="flex flex-row gap-3">
                <UserAvatar
                  className="h-6 w-6"
                  profile={comment.author}
                  size="xs"
                />
                <div className="flex items-start">
                  <Text color="secondary" size="body2">
                    <FormattedMessage
                      defaultMessage='<medium>{author}</medium> left a code review for <medium>{recipient}</medium> on <link>{submissionTitle}</link><comment>: "{description}"</comment>'
                      description="Comment"
                      id="mfu/G5"
                      values={{
                        author: comment.author.name,
                        comment: (chunks) => (
                          <Text color="default" size="body2">
                            {chunks}
                          </Text>
                        ),
                        description: comment.description,
                        link: (chunks) => (
                          // TODO: get the href
                          <Anchor className="relative" href="#">
                            {chunks}
                          </Anchor>
                        ),
                        medium: (chunks) => (
                          <Text color="default" size="body2" weight="medium">
                            {chunks}
                          </Text>
                        ),
                        recipient: comment.recipient.name,
                        submissionTitle: comment.submission.title,
                      }}
                    />
                  </Text>
                </div>
              </div>
              <div className="flex">
                <RelativeTimestamp timestamp={new Date(comment.createdAt)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
