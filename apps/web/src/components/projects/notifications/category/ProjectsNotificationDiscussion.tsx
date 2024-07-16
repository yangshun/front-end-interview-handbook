import { FormattedMessage } from 'react-intl';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import RichText from '~/components/ui/RichTextEditor/RichText';
import Text from '~/components/ui/Text';

import type { ProjectsNotificationDiscussionItemType } from '../types';
import ProjectsProfileAvatar from '../../users/ProjectsProfileAvatar';

type Props = Readonly<{
  data: ProjectsNotificationDiscussionItemType;
}>;

function ProjectsNotificationCommentMessage({ data }: Props) {
  const { submission, comment, createdAt } = data;
  const boldValue = (chunks: Array<React.ReactNode>) => (
    <Text color="secondary" size="body3" weight="bold">
      {chunks}
    </Text>
  );
  const timestamp = (
    <span>
      {`· `}
      <RelativeTimestamp timestamp={new Date(createdAt)} />
    </span>
  );

  if (comment.category === 'QUESTION') {
    return (
      <FormattedMessage
        defaultMessage="<bold>{author}</bold> left a question on <bold>{entityTitle}</bold> {timestamp}"
        description="Notification for question left on your submission"
        id="WN99Zy"
        values={{
          author: comment.author.userProfile.name,
          bold: boldValue,
          entityTitle: submission?.title,
          timestamp,
        }}
      />
    );
  }

  if (comment.category === 'CODE_REVIEW') {
    return (
      <FormattedMessage
        defaultMessage="<bold>{author}</bold> left a code review on <bold>{entityTitle}</bold> {timestamp}"
        description="Notification for code review left on your submission"
        id="FcgaoW"
        values={{
          author: comment.author.userProfile.name,
          bold: boldValue,
          entityTitle: submission?.title,
          timestamp,
        }}
      />
    );
  }

  if (comment.parentCommentId) {
    return (
      <FormattedMessage
        defaultMessage="<bold>{author}</bold> replied to your comment on <bold>{entityTitle}</bold> {timestamp}"
        description="Notification for reply on your comment"
        id="8AI4/R"
        values={{
          author: comment.author.userProfile.name,
          bold: boldValue,
          entityTitle: submission?.title,
          timestamp,
        }}
      />
    );
  }

  return (
    <FormattedMessage
      defaultMessage="<bold>{author}</bold> left a comment on <bold>{entityTitle}</bold> {timestamp}"
      description="Notification for comment left on your submission"
      id="p8VAwb"
      values={{
        author: comment.author.userProfile.name,
        bold: boldValue,
        entityTitle: submission?.title,
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
          mode="inert"
          points={author.points}
          size="xl"
          userProfile={author.userProfile}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Text color="subtle" size="body3">
            <Text color="subtle" size="body3" weight="medium">
              <ProjectsNotificationCommentMessage data={data} />
            </Text>
          </Text>
          <UserProfileInformationRow
            size="body3"
            userProfile={author.userProfile}
          />
        </div>
        <RichText color="body" size="sm" value={comment.body} />
      </div>
    </div>
  );
}
