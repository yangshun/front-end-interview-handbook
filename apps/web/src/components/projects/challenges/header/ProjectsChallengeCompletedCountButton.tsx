import { useState } from 'react';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
  const { data: userCompletedTimes } =
    trpc.projects.sessions.userCompletedTimes.useQuery({
      slug: challengeSlug,
    });

  if (userCompletedTimes == null || userCompletedTimes === 0) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <Text className="text-right" color="secondary" size="body3">
        <Anchor
          href="#"
          onClick={() => {
            setShowSubmissionsDialog(true);
          }}>
          {intl.formatMessage(
            {
              defaultMessage:
                'You completed {completedTimes, plural, one {once} other {# times}}',
              description: 'Number of times the project was completed',
              id: 'oPK+Ef',
            },
            {
              completedTimes: userCompletedTimes,
            },
          )}
        </Anchor>
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
