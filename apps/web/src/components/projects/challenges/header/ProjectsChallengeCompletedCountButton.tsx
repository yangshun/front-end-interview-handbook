import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';

import ProjectsChallengeSubmissionsDialog from './ProjectsChallengeSubmissionsDialog';

type Props = Readonly<{
  challengeSlug: string;
}>;

export default function ProjectsChallengeCompletedCountButton({
  challengeSlug,
}: Props) {
  const [showSubmissionsDialog, setShowSubmissionsDialog] = useState(false);
  const { data: userCompletedTimes } =
    trpc.projects.submissions.userCompletedTimes.useQuery({
      slug: challengeSlug,
    });

  if (userCompletedTimes == null || userCompletedTimes === 0) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <Text className="text-right" color="secondary" size="body3">
        <FormattedMessage
          defaultMessage="You completed <button>{completedTimes, plural, one {once} other {# times}}</button>"
          description="Number of times the project was completed"
          id="zG7GM9"
          values={{
            button: (chunks) => (
              <Anchor
                href="#"
                onClick={() => {
                  setShowSubmissionsDialog(true);
                }}>
                {chunks}
              </Anchor>
            ),
            completedTimes: userCompletedTimes,
          }}
        />
      </Text>
      {showSubmissionsDialog && (
        <ProjectsChallengeSubmissionsDialog
          challengeSlug={challengeSlug}
          onClose={() => setShowSubmissionsDialog(false)}
        />
      )}
    </div>
  );
}
