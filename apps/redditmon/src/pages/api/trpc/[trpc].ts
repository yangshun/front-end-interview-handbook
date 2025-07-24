import * as trpcNext from '@trpc/server/adapters/next';
import { ZodError } from 'zod';

import { createContext } from '~/server/context';
import { appRouter } from '~/server/routers/_app';

// Export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  createContext,
  onError: ({ error }) => {
    if (error.cause instanceof ZodError) {
      // Return the first zod error message to client
      error.message = JSON.parse(error.message)[0].message;
    }
  },
  router: appRouter,
});
