import url from 'url';

import { FormattedMessage } from '~/components/intl';
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
    <Anchor
      className="relative"
      href={url.format({
        hash: comment.id,
        pathname: comment.entity?.href,
      })}>
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
      if (comment.entity?.recipient?.id === targetUserId) {
        return (
          <FormattedMessage
            defaultMessage='You left a question on your submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
            description="Log message for you asking question on your submission"
            id="M7RwUF"
            values={{
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
          defaultMessage='You asked <recipientProfileLink>{recipient}</recipientProfileLink> a question on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you asking question on others submission"
          id="cPeTVK"
          values={{
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient?.name ?? '',
            recipientProfileLink: profileLink(
              comment.entity?.recipient?.username ?? '',
            ),
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    if (comment.entity?.recipient?.id === comment.author.userId) {
      return (
        <FormattedMessage
          defaultMessage='<authorProfileLink>{author}</authorProfileLink> left a question on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for someone asking question on their submission"
          id="gbjgjg"
          values={{
            author: comment.author.userProfile.name,
            authorProfileLink: profileLink(comment.author.userProfile.username),
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
        defaultMessage='<authorProfileLink>{author}</authorProfileLink> asked <recipientProfileLink>{recipient}</recipientProfileLink> a question on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone asking question on others submission"
        id="W7aHCG"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient?.name ?? '',
          recipientProfileLink: profileLink(
            comment.entity?.recipient?.username ?? '',
          ),
          submissionTitle: comment.entity?.title ?? '',
        }}
      />
    );
  }

  if (comment.category === 'CODE_REVIEW') {
    if (isViewingOwnProfile) {
      // Target user is viewer.
      if (comment.entity?.recipient?.id === targetUserId) {
        return (
          <FormattedMessage
            defaultMessage='You left a code review on your submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
            description="Log message for you reviewing your submission"
            id="Pz65hO"
            values={{
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
          defaultMessage='You contributed a code review for <recipientProfileLink>{recipient}</recipientProfileLink> on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you reviewing others submission"
          id="2Hqklu"
          values={{
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient?.name ?? '',
            recipientProfileLink: profileLink(
              comment.entity?.recipient?.username ?? '',
            ),
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    // User action on their entity.
    if (comment.entity?.recipient?.id === comment.author.userId) {
      return (
        <FormattedMessage
          defaultMessage='<authorProfileLink>{author}</authorProfileLink> left a code review on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for someone reviewing their submission"
          id="OOT9uz"
          values={{
            author: comment.author.userProfile.name,
            authorProfileLink: profileLink(comment.author.userProfile.username),
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
        defaultMessage='<authorProfileLink>{author}</authorProfileLink> contributed a code review for <recipientProfileLink>{recipient}</recipientProfileLink> on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone reviewing a submission"
        id="GX0ZcE"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient?.name ?? '',
          recipientProfileLink: profileLink(
            comment.entity?.recipient?.username ?? '',
          ),
          submissionTitle: comment.entity?.title ?? '',
        }}
      />
    );
  }

  if (!comment.parentComment) {
    if (isViewingOwnProfile) {
      // Target user is viewer.
      if (comment.entity?.recipient?.id === targetUserId) {
        return (
          <FormattedMessage
            defaultMessage={`You posted on your submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>`}
            description="Log message for you making a post on your submission"
            id="uyYB0h"
            values={{
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
          defaultMessage={`You made a post on <recipientProfileLink>{recipient}</recipientProfileLink>'s submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>`}
          description="Log message for you making a post on others submission"
          id="mflEX7"
          values={{
            comment: commentValue,
            description: plainText(comment.body),
            link: linkValue,
            recipient: comment.entity?.recipient?.name ?? '',
            recipientProfileLink: profileLink(
              comment.entity?.recipient?.username ?? '',
            ),
            submissionTitle: comment.entity?.title ?? '',
          }}
        />
      );
    }

    // User action on their own entity.
    if (comment.entity?.recipient?.id === comment.author?.userId) {
      return (
        <FormattedMessage
          defaultMessage={`<authorProfileLink>{author}</authorProfileLink> posted on their submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>`}
          description="Log message for user making a post on their submission"
          id="5DKztB"
          values={{
            author: comment.author.userProfile.name,
            authorProfileLink: profileLink(comment.author.userProfile.username),
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
        defaultMessage={`<authorProfileLink>{author}</authorProfileLink> made a post on <recipientProfileLink>{recipient}</recipientProfileLink>'s submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>`}
        description="Log message for someone making a post on others submission"
        id="r6RLjU"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.entity?.recipient?.name ?? '',
          recipientProfileLink: profileLink(
            comment.entity?.recipient?.username ?? '',
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
          defaultMessage='You replied to <bold>yourself</bold> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you replying to yourself on a submission"
          id="5ykFzo"
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
        defaultMessage='You replied to <recipientProfileLink>{recipient}</recipientProfileLink> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for you replying to someone  on a submission"
        id="Pwr5QY"
        values={{
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

  // User action on their entity.
  if (comment.parentComment.author?.userId === comment.author.userId) {
    return (
      <FormattedMessage
        defaultMessage='<authorProfileLink>{author}</authorProfileLink> replied to <bold>themselves</bold> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone replying to themselves on a submission"
        id="jLJBBH"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
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
      defaultMessage='<authorProfileLink>{author}</authorProfileLink> replied to <recipientProfileLink>{recipient}</recipientProfileLink> on the submission <link>{submissionTitle}</link>: <comment>"{description}"</comment>'
      description="Log message for someone replying to someone on a submission"
      id="Sj7pMJ"
      values={{
        author: comment.author.userProfile.name,
        authorProfileLink: profileLink(comment.author.userProfile.username),
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
