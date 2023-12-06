import { publicProcedure, router } from '../trpc';

export const greetingRouter = router({
  helloWorld: publicProcedure.query(async () => {
    return 'Hello world!';
  }),
});
