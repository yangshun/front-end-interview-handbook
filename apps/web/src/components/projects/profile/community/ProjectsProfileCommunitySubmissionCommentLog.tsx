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

  if (comment.category === 'QUESTION') {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage='<bold>You</bold> asked <bold>{recipient}</bold> a question on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you asking question on a submission"
          id="H1H/bd"
          values={{
            bold: boldValue,
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient ?? '',
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage='<bold>{author}</bold> asked <bold>{recipient}</bold> a question on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone asking question on a submission"
        id="pQZgsm"
        values={{
          author: comment.author.userProfile.name,
          bold: boldValue,
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient ?? '',
          submissionTitle: comment.entity?.title ?? '',
        }}
      />
    );
  }

  if (comment.category === 'CODE_REVIEW') {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage='<bold>You</bold> contributed a code review for <bold>{recipient}</bold> on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you reviewing a submission"
          id="HmrIqx"
          values={{
            bold: boldValue,
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient ?? '',
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage='<bold>{author}</bold> contributed a code review for <bold>{recipient}</bold> on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone reviewing a submission"
        id="ibMNT0"
        values={{
          author: comment.author.userProfile.name,
          bold: boldValue,
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient ?? '',
          submissionTitle: comment.entity?.title ?? '',
        }}
      />
    );
  }

  if (!comment.parentComment) {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage={`<bold>You</bold> made a post on <bold>{recipient}</bold>'s submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>`}
          description="Log message for you making a post on a submission"
          id="DJFRri"
          values={{
            bold: boldValue,
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient ?? '',
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage={`<bold>{author}</bold> made a post on <bold>{recipient}</bold>'s submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>`}
        description="Log message for someone making a post on a submission"
        id="u2sucM"
        values={{
          author: comment.author.userProfile.name,
          bold: boldValue,
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient ?? '',
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
        defaultMessage='<bold>You</bold> replied to <bold>{recipient}</bold> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for you replying to someone on a submission"
        id="NN0VZi"
        values={{
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

  return (
    <FormattedMessage
      defaultMessage='<bold>{author}</bold> replied to <bold>{recipient}</bold> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
      description="Log message for someone replying to someone on a submission"
      id="RihnWB"
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
