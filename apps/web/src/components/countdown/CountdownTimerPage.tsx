'use client';

import { PROJECT_LAUNCH_DATE } from '~/data/FeatureFlags';

import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

import CountdownCard from './countdown-card/CountdownCard';
import CountdownContainer from './countdown-container/CountdownContainer';
import useCountdownTimer from '../../hooks/useCountdownTime';

function CountdownTimerPage() {
  const { days, hours, minutes, seconds, finished } =
    useCountdownTimer(PROJECT_LAUNCH_DATE);

  if (finished) {
    return (
      <CountdownContainer>
        <Heading className="text-center" level="heading1">
          The wait is over, let's start
        </Heading>
        <Button
          href="/unveil"
          label="Unveil the product"
          size="lg"
          variant="primary"
        />
      </CountdownContainer>
    );
  }

  return (
    <CountdownContainer>
      <div className="flex flex-col items-center gap-3">
        <Badge label="Coming soon" variant="special" />
        <Heading className="text-center" level="heading1">
          New product coming soon
        </Heading>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-6">
        <CountdownCard count={days} label="Days" />
        <CountdownCard count={hours} label="Hours" />
        <CountdownCard count={minutes} label="Minutes" />
        <CountdownCard count={seconds} label="Seconds" />
      </div>
    </CountdownContainer>
  );
}

export default CountdownTimerPage;
