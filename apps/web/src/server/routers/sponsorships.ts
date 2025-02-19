import { z } from 'zod';

import type { SponsorsAdPlacementPayload } from '~/components/sponsors/SponsorsTypes';
import { SponsorsPlacementZodEnum } from '~/components/sponsors/SponsorsTypes';

import { publicProcedure, router } from '../trpc';

export const sponsorshipsRouter = router({
  ad: publicProcedure
    .input(
      z.object({
        placement: SponsorsPlacementZodEnum,
      }),
    )
    .query(async ({ input: { placement } }) => {
      const sponsorPlacement: SponsorsAdPlacementPayload = (() => {
        switch (placement) {
          case 'IN_CONTENT': {
            return {
              body: 'Tech Interview Handbook is the best handbook blah blah',
              imageUrl:
                'https://www.techinterviewhandbook.org/social/software-engineering-interview-guide.png',
              placement: 'IN_CONTENT',
              title: 'Tech Interview Handbook',
              url: 'https://www.techinterviewhandbook.org',
            } as const;
          }
          case 'SPOTLIGHT': {
            return {
              imageUrl:
                'https://www.techinterviewhandbook.org/social/software-engineering-interview-guide.png',
              placement: 'SPOTLIGHT',
              text: 'Spotlight Tech Interview Handbook is the best handbook blah blah',
              url: 'https://www.techinterviewhandbook.org',
            } as const;
          }
          case 'GLOBAL_BANNER': {
            return {
              placement: 'GLOBAL_BANNER',
              text: 'Tech Interview Handbook global banner is the best handbook blah blah',
              url: 'https://www.techinterviewhandbook.org',
            } as const;
          }
        }
      })();

      return sponsorPlacement;
    }),
});
