import { getISOWeek, getYear } from 'date-fns';
import { range, shuffle } from 'lodash-es';
import { z } from 'zod';

import { base64toBlob } from '~/lib/imageUtils';

import {
  SponsorsAdsSpotsProjectsInContent,
  SponsorsAdsSpotsProjectsSpotlight,
} from '~/data/ads/SponsorsAdsSpotsProjects';
import {
  SponsorsAdsSpotsSwagOverflowInContentUndefinedIsNotAFunction,
  SponsorsAdsSpotsSwagOverflowSpotlight,
} from '~/data/ads/SponsorsAdsSpotsSwagOverflow';

import {
  sponsorsGlobalBannerAdSchemaServer,
  sponsorsInContentAdSchemaServer,
  sponsorsSpotlightAdSchemaServer,
} from '~/components/sponsors/request/ads/SponsorsAdvertiseRequestAdSchema';
import { sponsorsCompanySchemaServer } from '~/components/sponsors/request/company/SponsorsAdvertiseRequestCompanySchema';
import { sponsorsWeekDateRange } from '~/components/sponsors/SponsorsDatesUtils';
import type { SponsorsAdFormatPayload } from '~/components/sponsors/SponsorsTypes';
import { SponsorsAdFormatZodEnum } from '~/components/sponsors/SponsorsTypes';

import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import prisma from '~/server/prisma';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { publicProcedure, router } from '../trpc';

const availabilityMaxWeeksAhead = 12;

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

      const adPayload: SponsorsAdFormatPayload | null = await (async () => {
        const ads = await prisma.sponsorsAd.findMany({
          select: {
            body: true,
            format: true,
            id: true,
            imageUrl: true,
            request: true,
            sponsorName: true,
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
                adId: ad.id,
                body: ad.body!,
                external: true,
                format: 'IN_CONTENT',
                imageUrl: ad.imageUrl!,
                sponsorName: ad.sponsorName,
                title: ad.title,
                url: ad.url,
              } as const;
            }

            const ownAds = [
              SponsorsAdsSpotsProjectsInContent,
              SponsorsAdsSpotsSwagOverflowInContentUndefinedIsNotAFunction,
            ];

            return shuffle(ownAds)[0];
          }
          case 'SPOTLIGHT': {
            if (ads.length > 0) {
              const ad = ads[0];

              return {
                adId: ad.id,
                external: true,
                format: 'SPOTLIGHT',
                imageUrl: ad.imageUrl!,
                sponsorName: ad.sponsorName!,
                text: ad.title,
                url: ad.url,
              } as const;
            }

            const ownAds = [
              SponsorsAdsSpotsProjectsSpotlight,
              SponsorsAdsSpotsSwagOverflowSpotlight,
            ];

            return shuffle(ownAds)[0];
          }
          case 'GLOBAL_BANNER': {
            if (ads.length === 0) {
              return null;
            }

            const ad = ads[0];

            return {
              adId: ad.id,
              external: true,
              format: 'GLOBAL_BANNER',
              sponsorName: ad.sponsorName,
              text: ad.title,
              url: ad.url,
            } as const;
          }
        }
      })();

      return adPayload;
    }),
  adRequest: publicProcedure
    .input(
      z.object({
        ads: z.array(
          z.union([
            sponsorsGlobalBannerAdSchemaServer,
            sponsorsSpotlightAdSchemaServer,
            sponsorsInContentAdSchemaServer,
          ]),
        ),
        agreement: z.string(),
        company: sponsorsCompanySchemaServer,
        emails: z.array(z.string()),
      }),
    )
    .mutation(async ({ input: { ads, company, emails, agreement } }) => {
      const { legalName, taxNumber, address, signatoryName, signatoryTitle } =
        company;

      return await prisma.sponsorsAdRequest.create({
        data: {
          address,
          ads: {
            create: ads.map((ad) => {
              const adData =
                ad.format === 'GLOBAL_BANNER'
                  ? {}
                  : ad.format === 'IN_CONTENT'
                    ? {
                        body: ad.body,
                        imageUrl: ad.imageUrl,
                      }
                    : {
                        imageUrl: ad.imageUrl,
                      };

              return {
                format: ad.format,
                sponsorName: ad.sponsorName,
                title: ad.text,
                url: ad.url,
                ...adData,
                slots: {
                  create: Array.from(ad.weeks).map((slot) => {
                    const [year, week] = slot
                      .split('/')
                      .map((part) => Number(part));

                    return {
                      week,
                      year,
                    };
                  }),
                },
              };
            }),
          },
          agreement,
          emails,
          legalName,
          signatoryName,
          signatoryTitle,
          taxNumber,
        },
      });
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
          ...sponsorsWeekDateRange(year, week),
          available: !hasMatchingSlot,
          week,
          year,
        };
      });
    }),
  firstAvailabilityAcrossFormats: publicProcedure.query(async () => {
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
        request: {
          status: 'APPROVED',
        },
      },
    } as const;

    const allSlots = await prisma.sponsorsAdSlot.findMany({
      include: {
        ad: {
          select: {
            format: true,
          },
        },
      },
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

    const NO_OF_FORMATS = 3;
    const bookedSlots = new Map<string, Set<string>>();

    for (const { year, week, ad } of allSlots) {
      const key = `${year}-${week}`;

      if (!bookedSlots.has(key)) {
        bookedSlots.set(key, new Set());
      }
      bookedSlots.get(key)!.add(ad.format);
    }

    let earliestAvailability: { week: number; year: number } | null = null as {
      week: number;
      year: number;
    } | null;

    for (
      let weekDelta = 1;
      weekDelta <= availabilityMaxWeeksAhead;
      weekDelta++
    ) {
      const week = incrementISOWeek(currentWeek, weekDelta);
      const year = currentWeek < week ? currentYear : currentYear + 1;

      const key = `${year}-${week}`;
      const bookedFormats = bookedSlots.get(key) || new Set();

      // If at least one format is available, mark this as the earliest available slot
      if (bookedFormats.size < NO_OF_FORMATS) {
        earliestAvailability = { week, year };
        break;
      }
    }

    return earliestAvailability
      ? {
          ...sponsorsWeekDateRange(
            earliestAvailability.year,
            earliestAvailability.week,
          ),
          available: true,
          week: earliestAvailability.week,
          year: earliestAvailability.year,
        }
      : null;
  }),
  removeAdAsset: publicProcedure
    .input(
      z.object({
        imageUrl: z.string(),
      }),
    )
    .mutation(async ({ input: { imageUrl } }) => {
      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
      const filePath = imageUrl.split('/').slice(-2).join('/'); // Get :sessionId/:fileName file path

      const { error } = await supabaseAdmin.storage
        .from('ads')
        .remove([filePath]);

      if (error) {
        throw error;
      }
    }),
  spotlightPlacements: publicProcedure.query(async () => {
    const [focusAreas, companies, studyPlans] = await Promise.all([
      fetchInterviewsStudyLists('focus-area'),
      fetchInterviewsStudyLists('company'),
      fetchInterviewsStudyLists('study-plan'),
    ]);

    return [...focusAreas, ...companies, ...studyPlans].map((item) => ({
      href: item.href,
      key: item.name,
      name: item.longName,
    }));
  }),
  uploadAdAsset: publicProcedure
    .input(
      z.object({
        format: SponsorsAdFormatZodEnum,
        imageFile: z.string(),
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input: { imageFile, sessionId, format } }) => {
      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

      const blob = base64toBlob(imageFile);

      const fileName =
        format === 'SPOTLIGHT'
          ? 'spotlight'
          : format === 'IN_CONTENT'
            ? 'in-content'
            : 'global-banner';
      const storagePath =
        sessionId +
        '/' +
        fileName +
        '-' +
        String(new Date().getTime()) +
        '.jpg';
      const { error } = await supabaseAdmin.storage
        .from('ads')
        .upload(storagePath, blob, {
          upsert: true,
        });

      if (error) {
        throw error;
      }

      const { data: imageUrl } = supabaseAdmin.storage
        .from('ads')
        .getPublicUrl(storagePath);

      return imageUrl.publicUrl;
    }),
});
