'use client';

import type { Database } from './database.types';

import { useSupabaseClient } from '@supabase/auth-helpers-react';

export function useSupabaseClientGFE() {
  return useSupabaseClient<Database>();
}
