'use client';

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import { useAuthSignupDialogContext } from './AuthSignupDialogContext';

type EntityType = 'coding' | 'quiz' | 'system-design';

const AUTH_SIGN_UP_POINTS_KEY = 'auth:sign-up:points';
const MAX_POINTS = 8;

const ENTITY_POINTS: Record<EntityType, number> = {
  coding: 2,
  quiz: 1,
  'system-design': 2,
} as const;

export function useAuthPoints() {
  const { isLoading: isUserLoading, session } = useSessionContext();
  const [authPointEntities, setAuthPointEntities] = useGreatStorageLocal<
    Array<string>
  >(AUTH_SIGN_UP_POINTS_KEY, [], {
    ttl: 30 * 24 * 60 * 60,
  });

  // Calculate current points from entity map
  const authPoints = useMemo(
    () => calculateAuthPoints(authPointEntities),
    [authPointEntities],
  );

  return {
    authPointEntities,
    authPoints,
    maxAuthPointsReached: authPoints > MAX_POINTS && !session && !isUserLoading,
    setAuthPointEntities,
  };
}

export function useShowAuthSignupDialogOnMaxPoints(showOnMount = true) {
  const { isLoading: isUserLoading, session } = useSessionContext();
  const { showAuthSignupDialog } = useAuthSignupDialogContext();
  const { authPoints } = useAuthPoints();

  useEffect(() => {
    if (authPoints > MAX_POINTS && !session && !isUserLoading && showOnMount) {
      showAuthSignupDialog({
        hideCloseButton: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isUserLoading, showOnMount]);
}

export function useAuthPointOnActions(
  opts?: Readonly<{
    showAuthSignupDialogOnMaxPoints?: boolean;
  }>,
) {
  const { showAuthSignupDialogOnMaxPoints = true } = opts || {};

  useShowAuthSignupDialogOnMaxPoints(showAuthSignupDialogOnMaxPoints);

  const { isLoading: isUserLoading, session } = useSessionContext();
  const { showAuthSignupDialog } = useAuthSignupDialogContext();
  const {
    authPointEntities,
    authPoints,
    maxAuthPointsReached,
    setAuthPointEntities,
  } = useAuthPoints();

  const increaseAuthPoints = useCallback(
    (
      entityType: EntityType,
      entityId: string,
    ): Readonly<{
      maxAuthPointsReached: boolean;
    }> => {
      if (session || isUserLoading) {
        return {
          maxAuthPointsReached: false,
        };
      }
      if (authPoints > MAX_POINTS) {
        showAuthSignupDialog();

        return {
          maxAuthPointsReached: true,
        };
      }

      const entityItem = `${entityType}:${entityId}`;

      if (authPointEntities.includes(entityItem)) {
        return {
          maxAuthPointsReached: false,
        };
      }

      const updated = [...authPointEntities, entityItem];

      const newPoints = calculateAuthPoints(updated);

      if (newPoints > MAX_POINTS) {
        showAuthSignupDialog();
      }
      setAuthPointEntities(updated);

      return {
        maxAuthPointsReached: newPoints > MAX_POINTS,
      };
    },
    [
      authPointEntities,
      authPoints,
      isUserLoading,
      session,
      setAuthPointEntities,
      showAuthSignupDialog,
    ],
  );

  return {
    authPoints,
    increaseAuthPoints,
    maxAuthPointsReached,
  };
}

export function useAuthActiveEngagementPoints(
  opts: Readonly<{
    durationInSeconds?: number;
    entityId: string;
    entityType: EntityType;
  }>,
) {
  const { durationInSeconds = 30, entityId, entityType } = opts || {};
  const { isLoading: isUserLoading, session } = useSessionContext();
  const { increaseAuthPoints } = useAuthPointOnActions();

  const engagedTimeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasIncreasedPoints, setHasIncreasedPoints] = useState(false);

  useEffect(() => {
    if (isUserLoading || session || hasIncreasedPoints) {
      return;
    }

    function startTracking() {
      if (intervalRef.current || hasIncreasedPoints) {
        return;
      }

      intervalRef.current = setInterval(() => {
        if (document.hidden) {
          return;
        }

        engagedTimeRef.current += 1;

        if (engagedTimeRef.current >= durationInSeconds) {
          increaseAuthPoints(entityType, entityId);
          setHasIncreasedPoints(true);
          stopTracking();
        }
      }, 1000);
    }

    function stopTracking() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stopTracking();
      } else {
        startTracking();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startTracking();

    return () => {
      stopTracking();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [
    session,
    isUserLoading,
    durationInSeconds,
    increaseAuthPoints,
    hasIncreasedPoints,
    entityId,
    entityType,
  ]);
}

function calculateAuthPoints(entities: Array<string>): number {
  return entities.reduce((acc, entity) => {
    const [entityType] = entity.split(':');

    if (ENTITY_POINTS[entityType as EntityType]) {
      return acc + ENTITY_POINTS[entityType as EntityType];
    }

    return acc;
  }, 0);
}
