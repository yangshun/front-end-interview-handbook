import { isUser, publicProcedure } from '~/server/trpc';
import getProjectsProfileId from '~/utils/projects/getProjectsProfileId';

import { TRPCError } from '@trpc/server';

const isProjectsUser = isUser.unstable_pipe(async (opts) => {
  const { ctx } = opts;

  const profileId = await getProjectsProfileId(ctx.user);

  if (profileId == null) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User account for Projects required. Register or sign in first.',
    });
  }

  return opts.next({
    ctx: {
      profileId,
    },
  });
});

export const projectsUserProcedure = publicProcedure.use(isProjectsUser);
