import { z } from 'zod';

import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { publicProcedure, router } from '../trpc';

const supabase = createSupabaseAdminClientGFE_SERVER_ONLY();

export const authRouter = router({
  resendSignupConfirmation: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        redirectTo: z.string().url(),
      }),
    )
    .mutation(async ({ input: { email, redirectTo } }) => {
      const { data, error } = await supabase.auth.resend({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
        type: 'signup',
      });

      if (error) {
        if (error.status === 429) {
          throw new Error('Email rate limit exceeded. Please try again later');
        } else {
          throw error;
        }
      }

      return data;
    }),
});
