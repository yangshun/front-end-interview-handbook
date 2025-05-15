import { TRPCError } from '@trpc/server';

import fetchProjectsProfileId from '~/components/projects/utils/fetchProjectsProfileId';

import { isUser, middleware, publicProcedure } from '~/server/trpc';

const isProjectsUser = isUser.unstable_pipe(async (opts) => {
  const { ctx } = opts;

  const projectsProfileId = await fetchProjectsProfileId(ctx.viewer);

  if (projectsProfileId == null) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Profile for Projects required. Register or sign in first.',
    });
  }

  return opts.next({
    ctx: {
      projectsProfileId,
    },
  });
});

const isProjectsUserForPublic = middleware(async (opts) => {
  const { ctx } = opts;

  const projectsProfileId = ctx.viewer
    ? await fetchProjectsProfileId(ctx.viewer)
    : null;

  return opts.next({
    ctx: {
      projectsProfileId,
    },
  });
});

/**
 * Possibly non-logged in.
 */
export const publicProjectsProcedure = publicProcedure.use(
  isProjectsUserForPublic,
);

export const projectsUserProcedure = publicProcedure.use(isProjectsUser);
