'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import AuthDialog from './AuthDialog';

import { useSessionContext } from '@supabase/auth-helpers-react';

const AUTH_POINTS_KEY = 'auth:points';
const MAX_POINTS = 6;

export function useAuthPointOnActions() {
  const { isLoading: isUserLoading, session } = useSessionContext();
  const [authPoints, setAuthPoints] = useGreatStorageLocal<number>(
    AUTH_POINTS_KEY,
    0,
    { ttl: 7 * 24 * 60 * 60 },
  );

  function increaseAuthPoints(points: number) {
    if (session || isUserLoading) {
      return;
    }
    setAuthPoints((prev) => prev + points);
  }

  return {
    authPoints,
    increaseAuthPoints,
  };
}

export default function useAuthActiveEngagementPoints(
  opts?: Readonly<{
    amount: number;
    durationInSeconds: number;
  }>,
) {
  const { amount = 1, durationInSeconds = 30 } = opts || {};
  const { isLoading: isUserLoading, session } = useSessionContext();
  const { increaseAuthPoints } = useAuthPointOnActions();

  const engagedTimeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasIncreasedPoints, setHasIncreasedPoints] = useState(false);

  useEffect(() => {
    if (isUserLoading || session || hasIncreasedPoints) {
      return;
    }

    const startTracking = () => {
      if (intervalRef.current || hasIncreasedPoints) {
        return;
      }

      intervalRef.current = setInterval(() => {
        if (document.hidden) {
          return;
        }

        engagedTimeRef.current += 1;

        if (engagedTimeRef.current >= durationInSeconds) {
          increaseAuthPoints(amount);
          setHasIncreasedPoints(true);
          stopTracking();
        }
      }, 1000);
    };

    const stopTracking = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTracking();
      } else {
        startTracking();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startTracking();

    return () => {
      stopTracking();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [
    session,
    isUserLoading,
    amount,
    durationInSeconds,
    increaseAuthPoints,
    hasIncreasedPoints,
  ]);
}

export function AuthPointsSignInDialog() {
  const { isLoading: isUserLoading, session } = useSessionContext();
  const pathname = usePathname();
  const { authPoints } = useAuthPointOnActions();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    if (authPoints > MAX_POINTS) {
      setShowLoginDialog(true);
    }
  }, [authPoints]);

  if (session || isUserLoading) {
    return null;
  }

  return (
    <AuthDialog
      isShown={showLoginDialog}
      next={pathname ?? ''}
      onClose={() => {
        setShowLoginDialog(false);
      }}
    />
  );
}
