import { initTRPC, TRPCError } from '@trpc/server';
/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import superjson from 'superjson';

import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

export const { middleware, router } = t;

export const isUser = middleware(async (opts) => {
  const { ctx } = opts;

  if (ctx.session == null) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User is not signed in. Sign in first.',
    });
  }

  return opts.next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export const userProcedure = publicProcedure.use(isUser);
