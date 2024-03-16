import { FormattedMessage } from 'react-intl';

import type { ProjectsProfileCommunityComment } from '~/components/projects/profile/community/ProjectsProfileCommunitySection';
import Anchor from '~/components/ui/Anchor';
import plainText from '~/components/ui/RichTextEditor/plainText';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  comment: ProjectsProfileCommunityComment;
  isViewingOwnProfile: boolean;
  targetUserId?: string;
}>;

export default function ProjectsProfileCommunityChallengeCommentLog({
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

  if (comment.category === 'QUESTION') {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage='<bold>You</bold> asked a question on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you asking a question on the challenge forum"
          id="ZBv485"
          values={{
            bold: boldValue,
            challengeTitle: comment.entity?.title ?? '',
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage='<bold>{author}</bold> asked a question on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone asking a question on the challenge forum"
        id="xyS+2S"
        values={{
          author: comment.author.userProfile.name,
          bold: boldValue,
          challengeTitle: comment.entity?.title ?? '',
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient ?? '',
        }}
      />
    );
  }

  if (!comment.parentComment) {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage={`<bold>You</bold> posted on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>`}
          description="Log message for you making a post on the challenge forum"
          id="9rPKTB"
          values={{
            bold: boldValue,
            challengeTitle: comment.entity?.title ?? '',
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage={`<bold>{author}</bold> posted on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>`}
        description="Log message for someone making a post on the challenge forum"
        id="o9kmTM"
        values={{
          author: comment.author.userProfile.name,
          bold: boldValue,
          challengeTitle: comment.entity?.title ?? '',
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
        }}
      />
    );
  }

  if (isViewingOwnProfile) {
    // Target user is viewer.
    if (comment.parentComment.author?.userId === targetUserId) {
      return (
        <FormattedMessage
          defaultMessage='<bold>You</bold> replied to <bold>yourself</bold> on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you replying to yourself on the challenge forum"
          id="Q4VMV2"
          values={{
            bold: boldValue,
            challengeTitle: comment.entity?.title ?? '',
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage='<bold>You</bold> replied to <bold>{recipient}</bold> on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for you replying to someone on the challenge forum"
        id="D5Sip4"
        values={{
          bold: boldValue,
          challengeTitle: comment.entity?.title ?? '',
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.parentComment.author.userProfile.name,
        }}
      />
    );
  }

  return (
    <FormattedMessage
      defaultMessage='<bold>{author}</bold> replied to <bold>{recipient}</bold> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
      description="Log message for someone replying to someone on the challenge forum"
      id="BPWMw7"
      values={{
        author: comment.author.userProfile.name,
        bold: boldValue,
        comment: commentValue,
        description: plainText(comment.body),
        link: linkValue,
        recipient: comment.parentComment.author.userProfile.name,
        submissionTitle: comment.entity?.title ?? '',
      }}
    />
  );
}
