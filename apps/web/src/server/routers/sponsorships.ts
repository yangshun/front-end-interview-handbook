import {
  addWeeks,
  endOfWeek,
  format as formatDate,
  getISOWeek,
  getYear,
  startOfWeek,
} from 'date-fns';
import { range } from 'lodash-es';
import { z } from 'zod';

import type { SponsorsAdFormatPayload } from '~/components/sponsors/SponsorsTypes';
import { SponsorsAdFormatZodEnum } from '~/components/sponsors/SponsorsTypes';

import prisma from '~/server/prisma';

import { publicProcedure, router } from '../trpc';

const availabilityMaxWeeksAhead = 12;

function getWeekDateRange(
  year: number,
  weekNumber: number,
): { end: string; start: string } {
  const firstDayOfYear = new Date(year, 0, 1); // Jan 1st
  const firstMonday = startOfWeek(firstDayOfYear, { weekStartsOn: 1 }); // Adjust to first Monday

  const startDate = addWeeks(firstMonday, weekNumber - 1); // Get Monday of the target week
  const endDate = endOfWeek(startDate, { weekStartsOn: 1 }); // Get Sunday of that week

  return {
    end: formatDate(endDate, 'yyyy-MM-dd'),
    start: formatDate(startDate, 'yyyy-MM-dd'),
  };
}

function incrementISOWeek(week: number, delta = 1) {
  const newWeek = week + delta;

  return newWeek <= 52 ? newWeek : newWeek - 52;
}

export const sponsorshipsRouter = router({
  ad: publicProcedure
    .input(
      z.object({
        format: SponsorsAdFormatZodEnum,
      }),
    )
    .query(async ({ input: { format } }) => {
      const date = new Date();
      const year = getYear(date);
      const week = getISOWeek(date);

      const adPayload: SponsorsAdFormatPayload = await (async () => {
        const ads = await prisma.sponsorsAd.findMany({
          select: {
            body: true,
            format: true,
            id: true,
            imageUrl: true,
            request: true,
            title: true,
            url: true,
          },
          where: {
            format,
            request: {
              status: 'APPROVED',
            },
            slots: {
              some: {
                week,
                year,
              },
            },
          },
        });

        switch (format) {
          case 'IN_CONTENT': {
            if (ads.length > 0) {
              const ad = ads[0];

              return {
                body: ad.body!,
                external: true,
                format: 'IN_CONTENT',
                id: ad.id,
                imageUrl: ad.imageUrl!,
                sponsorName: ad.request.legalName,
                title: ad.title,
                url: ad.url,
              } as const;
            }

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
            if (ads.length > 0) {
              const ad = ads[0];

              return {
                external: true,
                format: 'SPOTLIGHT',
                id: ad.id,
                imageUrl: ad.imageUrl!,
                sponsorName: ad.request.legalName,
                text: ad.title,
                url: ad.url,
              } as const;
            }

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
            if (ads.length > 0) {
              const ad = ads[0];

              return {
                external: true,
                format: 'GLOBAL_BANNER',
                id: ad.id,
                sponsorName: ad.request.legalName,
                text: ad.title,
                url: ad.url,
              } as const;
            }

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

      return adPayload;
    }),
  availability: publicProcedure
    .input(
      z.object({
        format: SponsorsAdFormatZodEnum,
      }),
    )
    .query(async ({ input: { format } }) => {
      const date = new Date();
      const currentYear = getYear(date);
      const currentWeek = getISOWeek(date);

      const availabilityStartWeek = incrementISOWeek(currentWeek);
      const availabilityEndWeek = incrementISOWeek(
        availabilityStartWeek,
        availabilityMaxWeeksAhead,
      );

      const approvedAdFilter = {
        ad: {
          format,
          request: {
            status: 'APPROVED',
          },
        },
      } as const;

      const slots = await prisma.sponsorsAdSlot.findMany({
        where:
          availabilityStartWeek < availabilityEndWeek
            ? {
                ...approvedAdFilter,
                week: {
                  gte: availabilityStartWeek,
                  lte: availabilityEndWeek,
                },
                year: currentYear,
              }
            : {
                // Goes into next year
                OR: [
                  {
                    ...approvedAdFilter,
                    week: {
                      gte: availabilityStartWeek,
                      lte: 52,
                    },
                    year: currentYear,
                  },
                  {
                    ...approvedAdFilter,
                    week: {
                      lte: availabilityEndWeek,
                    },
                    year: currentYear + 1,
                  },
                ],
              },
      });

      return range(1, availabilityMaxWeeksAhead + 1).map((weekDelta) => {
        const week = incrementISOWeek(currentWeek, weekDelta);
        const year = currentWeek < week ? currentYear : currentYear + 1;
        const hasMatchingSlot = slots.find(
          (slot) => slot.year === year && slot.week === week,
        );

        return {
          ...getWeekDateRange(year, week),
          available: !hasMatchingSlot,
          week,
          year,
        };
      });
    }),
});
