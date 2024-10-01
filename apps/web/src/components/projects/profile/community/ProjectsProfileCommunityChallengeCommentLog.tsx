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
      return (
        <FormattedMessage
          defaultMessage='You asked a question on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you asking a question on the challenge forum"
          id="S8SLzJ"
          values={{
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
        defaultMessage='<authorProfileLink>{author}</authorProfileLink> asked a question on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone asking a question on the challenge forum"
        id="rLSGMd"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
          challengeTitle: comment.entity?.title ?? '',
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
        }}
      />
    );
  }

  if (!comment.parentComment) {
    if (isViewingOwnProfile) {
      return (
        <FormattedMessage
          defaultMessage={`You posted on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>`}
          description="Log message for you making a post on the challenge forum"
          id="MV3NI4"
          values={{
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
        defaultMessage={`<authorProfileLink>{author}</authorProfileLink> posted on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>`}
        description="Log message for someone making a post on the challenge forum"
        id="CfLpPw"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
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
          defaultMessage='You replied to <bold>yourself</bold> on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
          description="Log message for you replying to yourself on the challenge forum"
          id="fMAedf"
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
        defaultMessage='You replied to <recipientProfileLink>{recipient}</recipientProfileLink> on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for you replying to someone on the challenge forum"
        id="3+YLNZ"
        values={{
          challengeTitle: comment.entity?.title ?? '',
          comment: commentValue,
          description: plainText(comment.body),
          link: linkValue,
          recipient: comment.parentComment.author.userProfile.name,
          recipientProfileLink: profileLink(
            comment.parentComment.author.userProfile.username ?? '',
          ),
        }}
      />
    );
  }

  // User action on their entity.
  if (comment.parentComment.author?.userId === comment.author.userId) {
    return (
      <FormattedMessage
        defaultMessage='<authorProfileLink>{author}</authorProfileLink> replied to <bold>themselves</bold> on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
        description="Log message for someone replying to someone on the challenge forum"
        id="ogPUIe"
        values={{
          author: comment.author.userProfile.name,
          authorProfileLink: profileLink(comment.author.userProfile.username),
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
      defaultMessage='<authorProfileLink>{author}</authorProfileLink> replied to <recipientProfileLink>{recipient}</recipientProfileLink> on the challenge forum for <link>{challengeTitle}</link>: <comment>"{description}"</comment>'
      description="Log message for someone replying to someone on the challenge forum"
      id="BVZEeY"
      values={{
        author: comment.author.userProfile.name,
        authorProfileLink: profileLink(comment.author.userProfile.username),
        challengeTitle: comment.entity?.title ?? '',
        comment: commentValue,
        description: plainText(comment.body),
        link: linkValue,
        recipient: comment.parentComment.author.userProfile.name,
        recipientProfileLink: profileLink(
          comment.parentComment.author.userProfile.username ?? '',
        ),
      }}
    />
  );
}
