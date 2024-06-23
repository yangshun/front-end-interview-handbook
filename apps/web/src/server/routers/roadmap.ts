import prisma from '../prisma';
import { publicProcedure, router } from '../trpc';

export const roadmapRouter = router({
  getRoadmapItems: publicProcedure.query(async () => {
    const roadmapItems = await prisma.roadmapItem.findMany({
      orderBy: {
        dueDate: 'asc',
      },
    });

    return roadmapItems;
  }),
});
