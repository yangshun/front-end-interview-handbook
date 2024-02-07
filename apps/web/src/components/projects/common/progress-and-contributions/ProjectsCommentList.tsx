import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Badge from '~/components/ui/Badge';
import plainText from '~/components/ui/RichTextEditor/plainText';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import type { ContributionComment } from './ProjectsContributionsSection';
import RelativeTimestamp from '../RelativeTimestamp';

type Props = Readonly<{
  comments: ReadonlyArray<ContributionComment>;
  title: string;
}>;

export default function ProjectsCommentList({ comments, title }: Props) {
  const intl = useIntl();

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
            key={comment.id}
            className={clsx(
              'group relative flex py-5 pl-4 pr-6',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              themeBackgroundCardWhiteOnLightColor,
              'transition-colors',
              themeBackgroundEmphasized_Hover,
              index === 0 && 'rounded-t-lg',
              index === comments.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex justify-between gap-6 w-full">
              <div className="flex flex-row gap-3">
                <UserAvatar
                  className="size-6 shrink-0"
                  profile={comment.author}
                  size="xs"
                />
                <div className="flex lg:flex-row flex-col gap-3">
                  {comment.category === 'QUESTION' && (
                    <Badge
                      className="h-6 w-min"
                      label={intl.formatMessage({
                        defaultMessage: 'Question',
                        description: 'Label for question badge',
                        id: '6+IMdW',
                      })}
                      size="sm"
                      variant="primary"
                    />
                  )}
                  {comment.category === 'CODE_REVIEW' && (
                    <Badge
                      className="h-6 w-min"
                      label={intl.formatMessage({
                        defaultMessage: 'Code review',
                        description: 'Label for question badge',
                        id: 'pJA5oJ',
                      })}
                      size="sm"
                      variant="info"
                    />
                  )}
                  <div className="flex items-start">
                    <Text color="secondary" size="body2">
                      <FormattedMessage
                        defaultMessage='<medium>{author}</medium> left a comment {for} <medium>{recipient}</medium> on <link>{submissionTitle}</link><comment>: "{description}"</comment><date></date>'
                        description="Comment"
                        id="rvsHso"
                        values={{
                          author: 'You',
                          comment: (chunks) => (
                            <Text color="default" size="body2">
                              {chunks}
                            </Text>
                          ),
                          date: (chunks) => (
                            <Text
                              className="pl-2 lg:hidden"
                              color="secondary"
                              size="body3">
                              <RelativeTimestamp
                                timestamp={new Date(comment.createdAt)}
                              />
                              {chunks}
                            </Text>
                          ),
                          description: plainText(comment.body),
                          for: comment.parentComment ? 'for' : '',
                          link: (chunks) => (
                            <Anchor
                              className="relative"
                              href={comment.entity?.href}>
                              {chunks}
                            </Anchor>
                          ),
                          medium: (chunks) => (
                            <Text color="default" size="body2" weight="medium">
                              {chunks}
                            </Text>
                          ),
                          recipient: comment.parentComment
                            ? comment.parentComment.author.name
                            : '',
                          submissionTitle: comment.entity?.title ?? '',
                        }}
                      />
                    </Text>
                  </div>
                </div>
              </div>
              <div className="lg:flex whitespace-nowrap lg:visible hidden">
                <Text color="secondary" size="body3">
                  <RelativeTimestamp timestamp={new Date(comment.createdAt)} />
                </Text>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
