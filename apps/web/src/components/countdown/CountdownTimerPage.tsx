'use client';

import clsx from 'clsx';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useUserProfile from '~/hooks/user/useUserProfile';

import { PROJECT_LAUNCH_DATE } from '~/data/FeatureFlags';

import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

import CountdownCard from './CountdownCard';
import CountdownContainer from './CountdownContainer';
import Text from '../ui/Text';
import useCountdownTimer from '../../hooks/useCountdownTime';

export default function CountdownTimerPage() {
  const { days, hours, minutes, seconds, finished } =
    useCountdownTimer(PROJECT_LAUNCH_DATE);
  const { signInUpHref } = useAuthSignInUp();
  const { isLoading, userProfile } = useUserProfile();

  if (finished) {
    return (
      <CountdownContainer>
        <Heading className="text-pretty text-center" level="heading1">
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
        <Heading className="text-pretty text-center" level="heading1">
          New product coming soon
        </Heading>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-6">
        <CountdownCard count={days} label="Days" />
        <CountdownCard count={hours} label="Hours" />
        <CountdownCard count={minutes} label="Minutes" />
        <CountdownCard count={seconds} label="Seconds" />
      </div>
      <div
        className={clsx(
          'flex flex-col items-center gap-8',
          'max-w-prose transition-opacity',
          'h-20',
          isLoading && 'opacity-0',
        )}>
        {userProfile == null ? (
          <>
            <Text
              className="text-pretty text-center"
              color="secondary"
              size="body0">
              Sign up for an account to receive email updates once we launch
            </Text>
            <Button
              href={signInUpHref()}
              label="Sign up"
              size="lg"
              variant="primary"
            />
          </>
        ) : (
          <>
            <Text
              className="text-pretty text-center"
              color="secondary"
              size="body0">
              Keep a lookout for our launch email
            </Text>
            <Button
              href="/"
              label="Return to homepage"
              size="lg"
              variant="secondary"
            />
          </>
        )}
      </div>
    </CountdownContainer>
  );
}
