import { FormattedMessage } from 'react-intl';

import type { ProjectsProfileCommunityComment } from '~/components/projects/profile/community/ProjectsProfileCommunitySection';
import Anchor from '~/components/ui/Anchor';
import plainText from '~/components/ui/RichTextEditor/plainText';
import Text, { textVariants } from '~/components/ui/Text';

type Props = Readonly<{
  comment: ProjectsProfileCommunityComment;
  isViewingOwnProfile: boolean;
  targetUserId?: string;
}>;

export default function ProjectsProfileCommunitySubmissionCommentLog({
  comment,
  isViewingOwnProfile,
  targetUserId,
}: Props) {
  const boldValue = (chunks: Array<React.ReactNode>) => (
    <Text color="default" size="body2" weight="medium">
      {chunks}
    </Text>
  );
  const commentValue = (chunks: Array<React.ReactNode>) => (
    <Text color="default" size="body2">
      {chunks}
    </Text>
  );
  const linkValue = (chunks: Array<React.ReactNode>) => (
    <Anchor className="relative" href={comment.entity?.href}>
      {chunks}
    </Anchor>
  );

  const profileLink = (userName: string) => {
    return function link(chunks: Array<React.ReactNode>) {
      if (!userName) {
        return boldValue(chunks);
      }

      return (
        <Anchor
          className={textVariants({
            weight: 'bold',
          })}
          href={`/projects/u/${userName}`}>
          {chunks}
        </Anchor>
      );
    };
  };

  if (comment.category === 'QUESTION') {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage='<bold>You</bold> asked <recipientProfileLink>{recipient}</recipientProfileLink> a question on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you asking question on a submission"
          id="m8aR6S"
          values={{
            bold: boldValue,
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient ?? '',
            recipientProfileLink: profileLink(
              comment.entity?.recipientUserName ?? '',
            ),
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage='<authorProfileLink>{author}</authorProfileLink> asked <recipientProfileLink>{recipient}</recipientProfileLink> a question on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone asking question on a submission"
        id="Npq6Bh"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
          bold: boldValue,
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient ?? '',
          recipientProfileLink: profileLink(
            comment.entity?.recipientUserName ?? '',
          ),
          submissionTitle: comment.entity?.title ?? '',
        }}
      />
    );
  }

  if (comment.category === 'CODE_REVIEW') {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage='<bold>You</bold> contributed a code review for <recipientProfileLink>{recipient}</recipientProfileLink> on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you reviewing a submission"
          id="F82aIY"
          values={{
            bold: boldValue,
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient ?? '',
            recipientProfileLink: profileLink(
              comment.entity?.recipientUserName ?? '',
            ),
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage='<authorProfileLink>{author}</authorProfileLink> contributed a code review for <recipientProfileLink>{recipient}</recipientProfileLink> on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone reviewing a submission"
        id="GX0ZcE"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
          bold: boldValue,
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient ?? '',
          recipientProfileLink: profileLink(
            comment.entity?.recipientUserName ?? '',
          ),
          submissionTitle: comment.entity?.title ?? '',
        }}
      />
    );
  }

  if (!comment.parentComment) {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage={`<bold>You</bold> made a post on <recipientProfileLink>{recipient}</recipientProfileLink>'s submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>`}
          description="Log message for you making a post on a submission"
          id="e35sSF"
          values={{
            bold: boldValue,
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient ?? '',
            recipientProfileLink: profileLink(
              comment.entity?.recipientUserName ?? '',
            ),
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage={`<authorProfileLink>{author}</authorProfileLink> made a post on <recipientProfileLink>{recipient}</recipientProfileLink>'s submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>`}
        description="Log message for someone making a post on a submission"
        id="ei1/AH"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
          bold: boldValue,
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient ?? '',
          recipientProfileLink: profileLink(
            comment.entity?.recipientUserName ?? '',
          ),
          submissionTitle: comment.entity?.title ?? '',
        }}
      />
    );
  }

  if (isViewingOwnProfile) {
    // Target user is viewer.
    if (comment.parentComment.author?.userId === targetUserId) {
      return (
        <FormattedMessage
          defaultMessage='<bold>You</bold> replied to <bold>yourself</bold> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you replying to yourself on a submission"
          id="rNKP7U"
          values={{
            bold: boldValue,
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage='<bold>You</bold> replied to <recipientProfileLink>{recipient}</recipientProfileLink> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for you replying to someone on a submission"
        id="AU4H9N"
        values={{
          bold: boldValue,
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.parentComment.author.userProfile.name,
          recipientProfileLink: profileLink(
            comment.parentComment.author.userProfile.username,
          ),
          submissionTitle: comment.entity?.title ?? '',
        }}
      />
    );
  }

  return (
    <FormattedMessage
      defaultMessage='<authorProfileLink>{author}</authorProfileLink> replied to <recipientProfileLink>{recipient}</recipientProfileLink> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
      description="Log message for someone replying to someone on a submission"
      id="Sj7pMJ"
      values={{
        author: comment.author.userProfile.name,
        authorProfileLink: profileLink(comment.author.userProfile.username),
        bold: boldValue,
        comment: commentValue,
        description: plainText(comment.body),
        link: linkValue,
        recipient: comment.parentComment.author.userProfile.name,
        recipientProfileLink: profileLink(
          comment.parentComment.author.userProfile.username,
        ),
        submissionTitle: comment.entity?.title ?? '',
      }}
    />
  );
}
