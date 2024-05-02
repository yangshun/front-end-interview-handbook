import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

const useCountdownTimer = (targetDate: Date) => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    let timeLeft = {
      days: '00',
      finished: false,
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    if (targetDate > now) {
      timeLeft = {
        days: String(differenceInDays(targetDate, now)).padStart(2, '0'),
        finished: false,
        hours: String(differenceInHours(targetDate, now) % 24).padStart(2, '0'),
        minutes: String(differenceInMinutes(targetDate, now) % 60).padStart(
          2,
          '0',
        ),
        seconds: String(differenceInSeconds(targetDate, now) % 60).padStart(
          2,
          '0',
        ),
      };
    } else {
      timeLeft.finished = true;
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

    if (!timeLeft.finished) {
      timerId = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [timeLeft, calculateTimeLeft]);

  return timeLeft;
};

export default useCountdownTimer;
