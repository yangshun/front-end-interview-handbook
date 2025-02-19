import { z } from 'zod';

import type { SponsorPlacementObject } from '~/components/sponsors/SponsorTypes';
import { SponsorPlacementZodEnum } from '~/components/sponsors/SponsorTypes';

import { publicProcedure, router } from '../trpc';

export const sponsorshipsRouter = router({
  sponsor: publicProcedure
    .input(
      z.object({
        placement: SponsorPlacementZodEnum,
      }),
    )
    .query(async ({ input: { placement } }) => {
      const sponsorPlacement: SponsorPlacementObject = (() => {
        switch (placement) {
          case 'IN_CONTENT': {
            return {
              imageUrl:
                'https://www.techinterviewhandbook.org/social/software-engineering-interview-guide.png',
              placement: 'IN_CONTENT',
              text: 'Tech Interview Handbook is the best handbook blah blah',
              url: 'https://www.techinterviewhandbook.org',
            };
          }
          case 'SPOTLIGHT': {
            return {
              imageUrl:
                'https://www.techinterviewhandbook.org/social/software-engineering-interview-guide.png',
              placement: 'IN_CONTENT',
              text: 'Spotlight Tech Interview Handbook is the best handbook blah blah',
              url: 'https://www.techinterviewhandbook.org',
            };
          }
          case 'GLOBAL_BANNER': {
            return {
              placement: 'IN_CONTENT',
              text: 'Tech Interview Handbook global banner is the best handbook blah blah',
              url: 'https://www.techinterviewhandbook.org',
            };
          }
        }
      })();

      return sponsorPlacement;
    }),
});
