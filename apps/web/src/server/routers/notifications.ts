import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

export const notificationsRouter = router({
  getUnreadCount: userProcedure.query(async ({ ctx: { viewer } }) => {
    return await prisma.interviewsActivity.count({
      where: {
        read: false,
        recipientId: viewer.id,
      },
    });
  }),
});
