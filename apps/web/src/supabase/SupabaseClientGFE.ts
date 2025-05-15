'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';

import type { Database } from './database.types';

export function useSupabaseClientGFE() {
  return useSupabaseClient<Database>();
}
