import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

import type { ProjectsChallengeSubmissionAugmented } from '../types';
import RelativeTimestamp from '../../common/RelativeTimestamp';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionHeroTimestamp({
  submission,
}: Props) {
  const { createdAt, updatedAt } = submission;

  return (
    <Text color="secondary" size="body3">
      <RelativeTimestamp timestamp={createdAt} />
      {createdAt.getTime() !== updatedAt.getTime() && (
        <>
          {' • '}
          <FormattedMessage
            defaultMessage="edited {updatedAtTime}"
            description="Updated time stamp for submission detail page"
            id="kuPMCs"
            values={{
              updatedAtTime: <RelativeTimestamp timestamp={updatedAt} />,
            }}
          />
        </>
      )}
    </Text>
  );
}
