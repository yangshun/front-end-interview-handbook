import { Axiom } from '@axiomhq/js';
import { subHours } from 'date-fns';

import { publicProcedure, router } from '../trpc';

const TIME_DIFF_IN_HOURS = 2;

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN!,
});

export const marketingRouter = router({
  getOnlineUsers: publicProcedure.query(async () => {
    const aplQuery = "['events'] | summarize dcount(['user.fingerprint'])";

    const res = await axiom.query(aplQuery, {
      endTime: new Date().toISOString(),
      startTime: subHours(new Date(), TIME_DIFF_IN_HOURS).toISOString(),
    });

    const onlineUsers: number =
      res.buckets?.totals?.[0].aggregations?.[0].value;

    return onlineUsers ?? 0;
  }),
});
