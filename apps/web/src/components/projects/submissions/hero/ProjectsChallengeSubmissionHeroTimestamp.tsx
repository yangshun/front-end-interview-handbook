import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';

import RelativeTimestamp from '../../../common/datetime/RelativeTimestamp';
import type { ProjectsChallengeSubmissionAugmented } from '../types';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionHeroTimestamp({
  submission,
}: Props) {
  const { createdAt, editedAt } = submission;

  return (
    <Text color="secondary" size="body3">
      <RelativeTimestamp timestamp={createdAt} />
      {createdAt.getTime() !== editedAt.getTime() && (
        <>
          {' • '}
          <FormattedMessage
            defaultMessage="edited {editedAtTime}"
            description="Updated time stamp for submission detail page"
            id="kgoB9+"
            values={{
              editedAtTime: <RelativeTimestamp timestamp={editedAt} />,
            }}
          />
        </>
      )}
    </Text>
  );
}
