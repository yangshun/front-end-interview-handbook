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

import type { ProjectsProfileCommunityComment } from './ProjectsProfileCommunitySection';
import RelativeTimestamp from '../../common/RelativeTimestamp';

type Props = Readonly<{
  comments: ReadonlyArray<ProjectsProfileCommunityComment>;
  isViewingOwnProfile: boolean;
  title: string;
}>;

export default function ProjectsProfileCommunityCommentList({
  comments,
  isViewingOwnProfile,
  title,
}: Props) {
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
            <div className="flex w-full gap-3">
              <UserAvatar
                className="size-6 shrink-0"
                profile={comment.author.userProfile}
                size="xs"
              />
              <div className="flex w-full grow flex-col gap-x-6 gap-y-1 lg:flex-row lg:justify-between">
                <div className="flex grow flex-col gap-3 lg:flex-row">
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
                      {/* TODO(projects): This intl format is not translatable. */}
                      <FormattedMessage
                        defaultMessage='<bold>{author}</bold> left a comment {for} <bold>{recipient}</bold> on <link>{submissionTitle}</link><comment>: "{description}"</comment>'
                        description="Comment"
                        id="ec998P"
                        values={{
                          author: isViewingOwnProfile
                            ? 'You'
                            : comment.author.userProfile.name,
                          bold: (chunks) => (
                            <Text color="default" size="body2" weight="medium">
                              {chunks}
                            </Text>
                          ),
                          comment: (chunks) => (
                            <Text color="default" size="body2">
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
                          recipient: comment.parentComment
                            ? comment.parentComment.author.userProfile.name
                            : '',
                          submissionTitle: comment.entity?.title ?? '',
                        }}
                      />
                    </Text>
                  </div>
                </div>
                <Text
                  className="whitespace-nowrap"
                  color="secondary"
                  size="body3">
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
