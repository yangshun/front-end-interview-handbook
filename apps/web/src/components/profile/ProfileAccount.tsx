'use client';

import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProfileAccountDisplayName from './ProfileAccountDisplayName';
import ProfileAccountEmail from './ProfileAccountEmail';

import type { User } from '@supabase/supabase-js';

type Props = Readonly<{
  user: User;
}>;

export default function ProfileAccount({ user }: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Account Settings"
          description="Screenreader text for account settings."
          id="C34sRh"
        />
      </Heading>
      <Section>
        <ProfileAccountDisplayName />
        <ProfileAccountEmail user={user} />
      </Section>
    </div>
  );
}
