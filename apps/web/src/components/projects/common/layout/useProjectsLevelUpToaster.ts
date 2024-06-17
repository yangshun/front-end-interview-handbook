import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { useToast } from '~/components/global/toasts/useToast';

import useUserProfileWithProjectsProfile from '../useUserProfileWithProjectsProfile';
import { projectsReputationLevel } from '../../reputation/projectsReputationLevelUtils';

export default function useProjectsLevelUpToaster() {
  const { showToast } = useToast();
  const intl = useIntl();

  const { isLoading, userProfile } = useUserProfileWithProjectsProfile();
  const [currentPoints, setCurrentPoints] = useState(-1);

  const showLevelUpToast = useCallback(
    (points: number) => {
      const reputationLevel = projectsReputationLevel(Math.max(points, 0));

      showToast({
        title: intl.formatMessage(
          {
            defaultMessage:
              "You've just attained level {level} ✨ Congratulations!",
            description: 'Level up message',
            id: 'b1hMr+',
          },
          reputationLevel,
        ),
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
