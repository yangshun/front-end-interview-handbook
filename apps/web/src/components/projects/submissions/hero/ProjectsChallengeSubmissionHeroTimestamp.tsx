import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

export default function ProjectsChallengeSubmissionHeroTimestamp() {
  return (
    <Text color="secondary" size="body3">
      <FormattedMessage
        defaultMessage="{createdAt} • edited {updatedAt}"
        description="Submission and updated time stamp for submission detail page"
        id="92OX3Z"
        values={{
          /* TODO(projects): Format relative time */
          /* TODO(projects): Only render `edited` if the timings differ. */
          createdAt: '12 hours ago',
          updatedAt: '46 minutes ago',
        }}
      />
    </Text>
  );
}
