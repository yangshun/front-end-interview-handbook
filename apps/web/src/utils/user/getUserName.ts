import type { User } from '@supabase/supabase-js';

export function getUserName(user: User) {
  return (
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata.user_name as string | undefined) ??
    user.email
  );
}
