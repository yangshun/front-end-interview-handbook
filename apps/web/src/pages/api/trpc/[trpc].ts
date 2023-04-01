import { appRouter } from '~/server/routers/_app';

import * as trpcNext from '@trpc/server/adapters/next';

// Export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  createContext: () => ({}),
  router: appRouter,
});
