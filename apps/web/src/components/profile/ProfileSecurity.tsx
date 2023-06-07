'use client';

import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import SupabaseAuthUpdatePassword from '../auth/SupabaseAuthUpdatePassword';

export default function ProfileSecurity() {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Security"
          description="Title for Security section on profile page"
          id="37Ttml"
        />
      </Heading>
      <Section>
        <div className="md:max-w-md">
          <SupabaseAuthUpdatePassword />
        </div>
      </Section>
    </div>
  );
}
