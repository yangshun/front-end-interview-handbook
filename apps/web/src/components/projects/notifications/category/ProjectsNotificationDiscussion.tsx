import url from 'url';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { FormattedMessage } from '~/components/intl';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import Anchor from '~/components/ui/Anchor';
import RichText from '~/components/ui/RichTextEditor/RichText';
import Text from '~/components/ui/Text';

import ProjectsProfileAvatar from '../../users/ProjectsProfileAvatar';
import type {
  ProjectsNotificationChallengeDiscussionItemType,
  ProjectsNotificationSubmissionDiscussionItemType,
} from '../types';

type Props = Readonly<{
  data:
    | ProjectsNotificationChallengeDiscussionItemType
    | ProjectsNotificationSubmissionDiscussionItemType;
}>;

function ProjectsNotificationCommentMessage({ data }: Props) {
  const { comment, createdAt } = data;
  const authorLink = (chunks: Array<React.ReactNode>) => (
    <Anchor
      className="relative"
      href={`/projects/u/${comment.author.userProfile.username}`}
      variant="flat">
      <Text color="subtitle" size="body3" weight="bold">
        {chunks}
      </Text>
    </Anchor>
  );
  const timestamp = (
    <Text color="subtle" size="body3">
      {`· `}
      <RelativeTimestamp timestamp={new Date(createdAt)} />
    </Text>
  );

  if ('challenge' in data) {
    const { challenge } = data;

    const challengeLink = (chunks: Array<React.ReactNode>) => (
      <Anchor
        className="relative"
        href={url.format({
          hash: comment.id,
          pathname: challenge.href,
        })}
        variant="flat">
        <Text color="subtitle" size="body3" weight="bold">
          {chunks}
        </Text>
      </Anchor>
    );

    if (!comment.parentComment) {
      return null;
    }
    if (comment.parentComment?.category === 'QUESTION') {
      return (
        <FormattedMessage
          defaultMessage="<authorLink>{author}</authorLink> replied to your question on the project discussions for <challengeLink>{entityTitle}</challengeLink> {timestamp}"
          description="Notification for someone replied to your question"
          id="w85sKh"
          values={{
            author: comment.author.userProfile.name,
            authorLink,
            challengeLink,
            entityTitle: challenge.title,
            timestamp,
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage="<authorLink>{author}</authorLink> replied to your comment on the project discussions for <challengeLink>{entityTitle}</challengeLink> {timestamp}"
        description="Notification for someone replied to your question"
        id="1c9cCj"
        values={{
          author: comment.author.userProfile.name,
          authorLink,
          challengeLink,
          entityTitle: challenge.title,
          timestamp,
        }}
      />
    );
  }

  const { submission } =
    data as ProjectsNotificationSubmissionDiscussionItemType;
  const submissionLink = (chunks: Array<React.ReactNode>) => (
    <Anchor
      className="relative"
      href={url.format({
        hash: comment.id,
        pathname: submission?.hrefs.detail,
      })}
      variant="flat">
      <Text color="subtitle" size="body3" weight="bold">
        {chunks}
      </Text>
    </Anchor>
  );

  if (comment.category === 'QUESTION') {
    return (
      <FormattedMessage
        defaultMessage="<authorLink>{author}</authorLink> left a question on <submissionLink>{entityTitle}</submissionLink> {timestamp}"
        description="Notification for question left on your submission"
        id="gXbjAw"
        values={{
          author: comment.author.userProfile.name,
          authorLink,
          entityTitle: submission?.title,
          submissionLink,
          timestamp,
        }}
      />
    );
  }

  if (comment.category === 'CODE_REVIEW') {
    return (
      <FormattedMessage
        defaultMessage="<authorLink>{author}</authorLink> left a code review on <submissionLink>{entityTitle}</submissionLink> {timestamp}"
        description="Notification for code review left on your submission"
        id="LgMYXR"
        values={{
          author: comment.author.userProfile.name,
          authorLink,
          entityTitle: submission?.title,
          submissionLink,
          timestamp,
        }}
      />
    );
  }

  if (comment.parentComment) {
    if (comment.parentComment?.category === 'CODE_REVIEW') {
      return (
        <FormattedMessage
          defaultMessage="<authorLink>{author}</authorLink> replied to your code review on <submissionLink>{entityTitle}</submissionLink> {timestamp}"
          description="Notification for someone replied to your code review"
          id="PXcS/H"
          values={{
            author: comment.author.userProfile.name,
            authorLink,
            entityTitle: submission?.title,
            submissionLink,
            timestamp,
          }}
        />
      );
    }

    if (comment.parentComment?.category === 'QUESTION') {
      return (
        <FormattedMessage
          defaultMessage="<authorLink>{author}</authorLink> replied to your question on <submissionLink>{entityTitle}</submissionLink> {timestamp}"
          description="Notification for someone replied to your question"
          id="GWzQrD"
          values={{
            author: comment.author.userProfile.name,
            authorLink,
            entityTitle: submission?.title,
            submissionLink,
            timestamp,
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage="<authorLink>{author}</authorLink> replied to your comment on <submissionLink>{entityTitle}</submissionLink> {timestamp}"
        description="Notification for reply on your comment"
        id="SlNSS+"
        values={{
          author: comment.author.userProfile.name,
          authorLink,
          entityTitle: submission?.title,

          submissionLink,
          timestamp,
        }}
      />
    );
  }

  return (
    <FormattedMessage
      defaultMessage="<authorLink>{author}</authorLink> left a comment on <submissionLink>{entityTitle}</submissionLink> {timestamp}"
      description="Notification for comment left on your submission"
      id="xbSTzm"
      values={{
        author: comment.author.userProfile.name,
        authorLink,
        entityTitle: submission?.title,
        submissionLink,
        timestamp,
      }}
    />
  );
}

export default function ProjectsNotificationDiscussion({ data }: Props) {
  const { comment } = data;
  const { author } = comment;

  return (
    <div className="flex gap-4">
      <div>
        <ProjectsProfileAvatar
          mode="link"
          points={author.points}
          size="xl"
          userProfile={author.userProfile}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Text color="secondary" size="body3" weight="medium">
            <ProjectsNotificationCommentMessage data={data} />
          </Text>
          <Text color="secondary">
            <UserProfileInformationRow
              size="body3"
              userProfile={author.userProfile}
            />
          </Text>
        </div>
        <RichText color="body" size="sm" value={comment.body} />
      </div>
    </div>
  );
}
