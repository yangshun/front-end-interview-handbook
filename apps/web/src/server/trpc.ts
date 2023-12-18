/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import type { Context } from './context';

import { initTRPC, TRPCError } from '@trpc/server';

const t = initTRPC.context<Context>().create();

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

export const { router } = t;
export const { middleware } = t;

export const isUser = middleware(async (opts) => {
  const { ctx } = opts;

  if (ctx.user == null) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User account required. Register or sign in first.',
    });
  }

  return opts.next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const userProcedure = publicProcedure.use(isUser);
