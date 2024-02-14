import { z } from 'zod';

import { createSupabaseAdminClientGFE } from '~/supabase/SupabaseServerGFE';

import { publicProcedure, router } from '../trpc';

const supabase = createSupabaseAdminClientGFE();

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
        throw error;
      }

      return data;
    }),
});
