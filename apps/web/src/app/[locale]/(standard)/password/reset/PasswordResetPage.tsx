'use client';

import SupabaseAuthUpdatePassword from '~/components/auth/SupabaseAuthUpdatePassword';

export default function PasswordResetPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-8 sm:px-6 md:px-8 lg:py-16">
      <SupabaseAuthUpdatePassword />
    </div>
  );
}
