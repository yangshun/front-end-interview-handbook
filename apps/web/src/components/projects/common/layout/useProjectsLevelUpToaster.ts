import { useCallback, useEffect, useState } from 'react';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

import { projectsReputationLevel } from '../../reputation/projectsReputationLevelUtils';
import useUserProfileWithProjectsProfile from '../useUserProfileWithProjectsProfile';

export default function useProjectsLevelUpToaster() {
  const { showToast } = useToast();
  const intl = useIntl();

  const { isLoading, userProfile } = useUserProfileWithProjectsProfile();
  const [currentPoints, setCurrentPoints] = useState(-1);

  const showLevelUpToast = useCallback(
    (points: number) => {
      const reputationLevel = projectsReputationLevel(Math.max(points, 0));

      showToast({
        description: intl.formatMessage(
          {
            defaultMessage:
              "You've just attained level {level} ✨ Congratulations!",
            description: 'Description for level up',
            id: 'emlXOt',
          },
          reputationLevel,
        ),
        title: intl.formatMessage({
          defaultMessage: 'Level up!',
          description: 'Title for level up',
          id: 'V8Hyiq',
        }),
        variant: 'success',
      });
    },
    [showToast, intl],
  );

  useEffect(() => {
    // Logged-out or loading
    if (isLoading || userProfile === null || !userProfile?.projectsProfile) {
      return;
    }

    const { points: newPoints } = userProfile.projectsProfile;

    // If points are going up from -1, that only
    // happens when the user logs in or page loads,
    // so we require that points aren't going up from -1
    if (newPoints !== currentPoints && currentPoints !== -1) {
      const newLevel = projectsReputationLevel(newPoints).level;
      const currentLevel = projectsReputationLevel(currentPoints).level;

      if (currentPoints >= 0 && newLevel > currentLevel) {
        showLevelUpToast(newPoints);
      }
    }

    setCurrentPoints(newPoints || -1);
  }, [isLoading, userProfile, currentPoints, showLevelUpToast]);
}
