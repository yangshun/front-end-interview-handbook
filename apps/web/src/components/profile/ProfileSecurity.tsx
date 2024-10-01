'use client';

import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeBorderColor } from '~/components/ui/theme';

import SupabaseAuthUpdatePassword from '../auth/SupabaseAuthUpdatePassword';

export default function ProfileSecurity() {
  return (
    <div className="flex flex-col gap-y-4 lg:max-w-md">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Security"
          description="Title for Security section on profile page"
          id="37Ttml"
        />
      </Heading>
      <Section>
        <div
          className={clsx('flex flex-col gap-4', 'p-4', 'rounded-lg', [
            'border',
            themeBorderColor,
          ])}>
          <SupabaseAuthUpdatePassword />
        </div>
      </Section>
    </div>
  );
}
