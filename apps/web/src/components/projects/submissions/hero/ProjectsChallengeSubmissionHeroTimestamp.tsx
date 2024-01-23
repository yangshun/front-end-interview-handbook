import { FormattedMessage } from 'react-intl';

import RelativeTimestamp from '~/components/projects/common/RelativeTimestamp';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  createdAt: Date;
  updatedAt: Date;
}>;

export default function ProjectsChallengeSubmissionHeroTimestamp({
  createdAt,
  updatedAt,
}: Props) {
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);

  return (
    <div>
      <Text color="secondary" size="body3">
        <RelativeTimestamp timestamp={createdAtDate} />
      </Text>
      {createdAt !== updatedAt && (
        <span>
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage=" • edited "
              description="Submission and updated time stamp for submission detail page"
              id="rGeyo+"
            />
            <RelativeTimestamp timestamp={updatedAtDate} />
          </Text>
        </span>
      )}
    </div>
  );
}
