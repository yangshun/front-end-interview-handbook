import { z } from 'zod';

import type { SponsorsAdFormatPayload } from '~/components/sponsors/SponsorsTypes';
import { SponsorsAdFormatZodEnum } from '~/components/sponsors/SponsorsTypes';

import { publicProcedure, router } from '../trpc';

export const sponsorshipsRouter = router({
  ad: publicProcedure
    .input(
      z.object({
        placement: SponsorsAdFormatZodEnum,
      }),
    )
    .query(async ({ input: { placement } }) => {
      const sponsorPlacement: SponsorsAdFormatPayload = (() => {
        switch (placement) {
          case 'IN_CONTENT': {
            return {
              body: `Level up your coding style with SwagOverflow—the ultimate destination for front-end developer gear. Our high-quality merchandise lets you wear your passion on your sleeve, literally. Check out some of the highlights:
	•	Eye-Catching Designs: Show off your front-end pride with sleek, creative prints that celebrate coding culture.
	•	Premium Materials: Enjoy durable, comfortable apparel that can handle everyday wear as easily as you handle bug fixes.
	•	Developer-Approved: Curated by coders, for coders—everything we offer is built with your front-end focus in mind.
	•	Unique Accessories: From mugs to tote bags, deck out your workspace and wardrobe with must-have items you won’t find anywhere else.

Elevate your style, inspire your creativity, and represent your coding chops with every piece from SwagOverflow. Grab yours now and stand out in any crowd—on or off the keyboard!`,
              external: true,
              format: 'IN_CONTENT',
              id: 'tih',
              imageUrl:
                'https://www.techinterviewhandbook.org/social/software-engineering-interview-guide.png',
              sponsorName: 'Tech Interview Handbook',
              title: 'Ace your technical interviews',
              url: 'https://www.techinterviewhandbook.org',
            } as const;
          }
          case 'SPOTLIGHT': {
            return {
              external: true,
              format: 'SPOTLIGHT',
              id: 'tih',
              imageUrl:
                'https://www.techinterviewhandbook.org/social/software-engineering-interview-guide.png',
              sponsorName: 'Tech Interview Handbook',
              text: 'Tech Interview Handbook is the best handbook blah blah',
              url: 'https://www.techinterviewhandbook.org',
            } as const;
          }
          case 'GLOBAL_BANNER': {
            return {
              external: true,
              format: 'GLOBAL_BANNER',
              id: 'tih',
              sponsorName: 'Tech Interview Handbook',
              text: 'Tech Interview Handbook global banner is the best handbook blah blah',
              url: 'https://www.techinterviewhandbook.org',
            } as const;
          }
        }
      })();

      return sponsorPlacement;
    }),
});
