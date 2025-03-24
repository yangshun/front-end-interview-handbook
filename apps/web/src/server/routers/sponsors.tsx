import { getISOWeek, getYear } from 'date-fns';
import { kebabCase, range, sample } from 'lodash-es';
import url from 'node:url';
import { z } from 'zod';

import { base64toBlob } from '~/lib/imageUtils';

import { ADMIN_EMAILS } from '~/data/AdminConfig';
import {
  SponsorsAdsSpotsProjectsInContent,
  SponsorsAdsSpotsProjectsSpotlight,
} from '~/data/ads/SponsorsAdsSpotsProjects';
import {
  SponsorsAdsSpotsSwagOverflowInContent,
  SponsorsAdsSpotsSwagOverflowInContentComponentLibrary,
  SponsorsAdsSpotsSwagOverflowInContentMobileFearFactor,
  SponsorsAdsSpotsSwagOverflowInContentTsDenial,
  SponsorsAdsSpotsSwagOverflowInContentTsIgnore,
  SponsorsAdsSpotsSwagOverflowInContentUndefinedIsNotAFunction,
  SponsorsAdsSpotsSwagOverflowInContentUseEffect,
  SponsorsAdsSpotsSwagOverflowInContentValueAny,
  SponsorsAdsSpotsSwagOverflowInContentWhoWroteThis,
  SponsorsAdsSpotsSwagOverflowSpotlight,
} from '~/data/ads/SponsorsAdsSpotsSwagOverflow';
import {
  SPONSORS_GREATFRONTEND_ADMIN_EMAIL,
  SPONSORS_SPONSOR_MANAGER_EMAIL,
} from '~/data/SponsorsConfig';

import {
  sponsorsGlobalBannerAdSchemaServer,
  sponsorsInContentAdSchemaServer,
  sponsorsSpotlightAdSchemaServer,
} from '~/components/sponsors/request/ads/SponsorsAdvertiseRequestAdSchema';
import { sponsorsCompanySchemaServer } from '~/components/sponsors/request/company/SponsorsAdvertiseRequestCompanySchema';
import { sponsorsWeekDateRange } from '~/components/sponsors/SponsorsDatesUtils';
import type { SponsorsAdFormatPayload } from '~/components/sponsors/SponsorsTypes';

import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import EmailsButton from '~/emails/components/EmailsButton';
import {
  sendSponsorsAdRequestConfirmationEmail,
  sendSponsorsAdRequestReviewEmail,
} from '~/emails/items/sponsors/EmailsSenderSponsors';
import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetUtils';
import { getSiteOrigin } from '~/seo/siteUrl';
import prisma from '~/server/prisma';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { adminProcedure, publicProcedure, router } from '../trpc';

import { Axiom } from '@axiomhq/js';
import {
  Prisma,
  SponsorsAdFormat,
  SponsorsAdRequestStatus,
} from '@prisma/client';
import { TRPCError } from '@trpc/server';

const availabilityMaxWeeksAhead = 12;

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN!,
});

function incrementISOWeek(week: number, delta = 1) {
  const newWeek = week + delta;

  return newWeek <= 52 ? newWeek : newWeek - 52;
}

export const sponsorsRouter = router({
  ad: publicProcedure
    .input(
      z.object({
        format: z.nativeEnum(SponsorsAdFormat),
      }),
    )
    .query(async ({ input: { format } }) => {
      const date = new Date();
      const year = getYear(date);
      const week = getISOWeek(date);

      const adPayload: SponsorsAdFormatPayload | null = await (async () => {
        const publishedAds = await prisma.sponsorsAd.findMany({
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
              status: 'PUBLISHED',
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
            if (publishedAds.length > 0) {
              const ad = publishedAds[0];

              return {
                adId: ad.id,
                body: ad.body!,
                format: 'IN_CONTENT',
                imageUrl: ad.imageUrl!,
                sponsorName: ad.sponsorName,
                title: ad.title,
                url: ad.url,
              } as const;
            }

            const swagOverflowAd = sample([
              SponsorsAdsSpotsSwagOverflowInContent,
              SponsorsAdsSpotsSwagOverflowInContentUndefinedIsNotAFunction,
              SponsorsAdsSpotsSwagOverflowInContentTsIgnore,
              SponsorsAdsSpotsSwagOverflowInContentTsDenial,
              SponsorsAdsSpotsSwagOverflowInContentValueAny,
              SponsorsAdsSpotsSwagOverflowInContentComponentLibrary,
              SponsorsAdsSpotsSwagOverflowInContentUseEffect,
              SponsorsAdsSpotsSwagOverflowInContentWhoWroteThis,
              SponsorsAdsSpotsSwagOverflowInContentMobileFearFactor,
            ]);

            return sample([SponsorsAdsSpotsProjectsInContent, swagOverflowAd]);
          }
          case 'SPOTLIGHT': {
            if (publishedAds.length > 0) {
              const ad = publishedAds[0];

              return {
                adId: ad.id,
                format: 'SPOTLIGHT',
                imageUrl: ad.imageUrl!,
                sponsorName: ad.sponsorName!,
                text: ad.title,
                url: ad.url,
              } as const;
            }

            return sample([
              SponsorsAdsSpotsProjectsSpotlight,
              SponsorsAdsSpotsSwagOverflowSpotlight,
            ]);
          }
          case 'GLOBAL_BANNER': {
            if (publishedAds.length === 0) {
              return null;
            }

            const ad = publishedAds[0];

            return {
              adId: ad.id,
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
  adAssetRemove: publicProcedure
    .input(
      z.object({
        imageUrls: z.array(z.string()),
      }),
    )
    .mutation(async ({ input: { imageUrls } }) => {
      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
      const filePaths = imageUrls.map((imageUrl) =>
        imageUrl.split('/').slice(-2).join('/'),
      ); // Get :sessionId/:fileName file path

      const { error } = await supabaseAdmin.storage
        .from('ads')
        .remove(filePaths);

      if (error) {
        throw error;
      }
    }),
  adAssetUpload: publicProcedure
    .input(
      z.object({
        format: z.nativeEnum(SponsorsAdFormat),
        imageFile: z.string(),
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input: { imageFile, sessionId, format } }) => {
      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

      const blob = base64toBlob(imageFile);

      const fileName = kebabCase(format);
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
  adRequest: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input: { id } }) => {
      return await prisma.sponsorsAdRequest.findUnique({
        include: {
          ads: {
            include: {
              slots: true,
            },
          },
          review: {
            select: {
              comments: true,
              createdAt: true,
              profile: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                },
              },
            },
          },
        },
        where: {
          id,
        },
      });
    }),
  adRequestApprove: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input: { id }, ctx: { viewer } }) => {
      return await prisma.$transaction(async (tx) => {
        await Promise.all([
          tx.sponsorsAdRequest.update({
            data: {
              status: 'APPROVED',
            },
            where: { id },
          }),
          tx.sponsorsAdRequestReview.create({
            data: {
              requestId: id,
              userId: viewer.id,
            },
          }),
        ]);
      });
    }),
  adRequestCreate: publicProcedure
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
        emails: z.array(z.string().email()),
      }),
    )
    .mutation(async ({ input: { ads, company, emails, agreement } }) => {
      const { legalName, taxNumber, address, signatoryName, signatoryTitle } =
        company;

      const adRequest = await prisma.sponsorsAdRequest.create({
        data: {
          address,
          ads: {
            create: ads.map((ad) => {
              const adData = (() => {
                switch (ad.format) {
                  case 'GLOBAL_BANNER':
                    return {};
                  case 'IN_CONTENT':
                    return {
                      body: ad.body,
                      imageUrl: ad.imageUrl,
                    };
                  case 'SPOTLIGHT':
                    return {
                      imageUrl: ad.imageUrl,
                    };
                  default:
                    throw new Error('Invalid ad format');
                }
              })();

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

      // Send email to advertiser and sponsor manager
      await Promise.all([
        sendSponsorsAdRequestConfirmationEmail({
          adRequestId: adRequest.id,
          email: emails[0],
          signatoryName,
        }),
        sendSponsorsAdRequestReviewEmail({
          adRequestId: adRequest.id,
          ads: ads.map((ad) => ({
            ...ad,
            id: new Date().toISOString(),
          })),
          legalName,
          signatoryName,
          signatoryTitle,
        }),
      ]);
    }),
  adRequestInquiries: adminProcedure.query(async () => {
    const aplQuery = `
    ['events']
    | where ['event.name'] == 'sponsorships.inquiry'
    | order by ['_time'] desc
    | project emails=['event.payload.emails'], time=['_time']
    `;

    const response = await axiom.query(aplQuery);

    // // Extract only email and timestamp
    const logs = response.matches?.map((log) => ({
      emails: log.data.emails,
      time: new Date(log.data.time),
    }));

    return logs;
  }),
  adRequestInquiry: publicProcedure
    .input(
      z.object({
        emails: z.array(z.string().email()),
      }),
    )
    .mutation(async ({ input: { emails } }) => {
      await sendReactEmail({
        cc: [{ email: SPONSORS_GREATFRONTEND_ADMIN_EMAIL }],
        emailElement: (
          <div>
            <p>Someone started inquiring about ads sponsorships:</p>
            <ul>
              {emails.map((email) => (
                <li key={email}>{email}</li>
              ))}
            </ul>
            <p>
              <EmailsButton
                href={url.format({
                  host: getSiteOrigin(),
                  pathname: `/admin/sponsorships/inquiries`,
                })}
                variant="primary">
                See all inquiries
              </EmailsButton>
            </p>
          </div>
        ),
        from: {
          email: 'contact@greatfrontend.com',
          name: 'GreatFrontEnd Sponsorships',
        },
        subject: `Advertising inquiry started – ${emails[0]}`,
        to: {
          email: SPONSORS_SPONSOR_MANAGER_EMAIL,
          name: null,
        },
      });
    }),
  adRequestReject: adminProcedure
    .input(
      z.object({
        comments: z.string(),
        id: z.string(),
      }),
    )
    .mutation(async ({ input: { id, comments }, ctx: { viewer } }) => {
      return await prisma.$transaction(async (tx) => {
        await Promise.all([
          tx.sponsorsAdRequest.update({
            data: {
              status: 'REJECTED',
            },
            where: { id },
          }),
          tx.sponsorsAdRequestReview.create({
            data: {
              comments,
              requestId: id,
              userId: viewer.id,
            },
          }),
        ]);
      });
    }),
  adRequestUpdate: publicProcedure
    .input(
      z.object({
        ads: z.array(
          z.union([
            sponsorsGlobalBannerAdSchemaServer,
            sponsorsSpotlightAdSchemaServer,
            sponsorsInContentAdSchemaServer,
          ]),
        ),
        advertiserEmail: z.string().email().optional(),
        agreement: z.string(),
        company: sponsorsCompanySchemaServer,
        emails: z.array(z.string()),
        id: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { id, ads, company, emails, agreement, advertiserEmail },
        ctx: { viewer },
      }) => {
        // If not admin, check if the user is authorized to update the request
        if (!(viewer && ADMIN_EMAILS.includes(viewer.email))) {
          const adRequest = await prisma.sponsorsAdRequest.findUnique({
            select: {
              emails: true,
            },
            where: { id },
          });

          if (!adRequest?.emails.includes(advertiserEmail ?? '')) {
            throw new TRPCError({
              code: 'UNAUTHORIZED',
              message: 'You are not authorized!',
            });
          }
        }

        const { legalName, taxNumber, address, signatoryName, signatoryTitle } =
          company;

        return await prisma.$transaction(async (tx) => {
          await Promise.all([
            tx.sponsorsAdRequest.update({
              data: {
                address,
                agreement,
                emails,
                legalName,
                signatoryName,
                signatoryTitle,
                taxNumber,
              },
              where: { id },
            }),
            // Delete earlier sponsor ads
            tx.sponsorsAd.deleteMany({
              where: { requestId: id },
            }),
          ]);
          await Promise.all(
            ads.map((ad) =>
              tx.sponsorsAd.create({
                data: {
                  format: ad.format,
                  requestId: id,
                  sponsorName: ad.sponsorName,
                  title: ad.text,
                  url: ad.url,
                  ...('body' in ad ? { body: ad.body } : {}),
                  ...('imageUrl' in ad ? { imageUrl: ad.imageUrl } : {}),
                  slots: {
                    create: Array.from(ad.weeks).map((slot) => {
                      const [year, week] = slot
                        .split('/')
                        .map((part) => Number(part));

                      return { week, year };
                    }),
                  },
                },
              }),
            ),
          );
        });
      },
    ),
  adRequests: adminProcedure
    .input(
      z.object({
        filter: z.object({
          query: z.string().nullable(),
          status: z.array(z.nativeEnum(SponsorsAdRequestStatus)),
        }),
        pagination: z.object({
          limit: z
            .number()
            .int()
            .positive()
            .transform((val) => Math.min(30, val)),
          page: z.number().int().positive(),
        }),
        sort: z.object({
          field: z.enum([
            Prisma.SponsorsAdRequestScalarFieldEnum.createdAt,
            Prisma.SponsorsAdRequestScalarFieldEnum.signatoryName,
          ]),
          isAscendingOrder: z.boolean(),
        }),
      }),
    )
    .query(async ({ input: { pagination, filter, sort } }) => {
      const { limit, page } = pagination;
      const { query, status } = filter;

      const orderBy = {
        [sort.field]: sort.isAscendingOrder ? 'asc' : 'desc',
      } as const;

      const where: Prisma.SponsorsAdRequestWhereInput = {
        OR: [
          {
            signatoryName: {
              contains: query ?? '',
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            legalName: {
              contains: query ?? '',
              mode: 'insensitive',
            },
          },
        ],
        ...(status.length > 0 ? { status: { in: status } } : {}),
      };

      const [totalCount, requests] = await Promise.all([
        prisma.sponsorsAdRequest.count({ where }),
        prisma.sponsorsAdRequest.findMany({
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
          where,
        }),
      ]);

      return {
        requests,
        totalCount,
      };
    }),
  availability: publicProcedure
    .input(
      z.object({
        format: z.nativeEnum(SponsorsAdFormat),
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

      const publishedAdsQuery = {
        ad: {
          format,
          request: {
            status: 'PUBLISHED',
          },
        },
      } as const;

      const slots = await prisma.sponsorsAdSlot.findMany({
        where:
          availabilityStartWeek < availabilityEndWeek
            ? {
                ...publishedAdsQuery,
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
                    ...publishedAdsQuery,
                    week: {
                      gte: availabilityStartWeek,
                      lte: 52,
                    },
                    year: currentYear,
                  },
                  {
                    ...publishedAdsQuery,
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
  contact: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input: { email, message }, ctx: { req } }) => {
      await sendReactEmail({
        cc: [{ email: SPONSORS_GREATFRONTEND_ADMIN_EMAIL }],
        emailElement: (
          <div>
            <p>
              A submission on the sponsorship contact form has been received
              with the following details:
            </p>
            <p>
              <strong>Sender</strong>: {email}
            </p>
            <p>
              <strong>Message</strong>: {message}
            </p>
            <p>
              <strong>Country</strong>: {req.cookies.country}
            </p>
            <p>
              <EmailsButton
                href={url.format({
                  host: getSiteOrigin(),
                  pathname: `/admin/sponsorships/messages`,
                })}
                variant="primary">
                View other submissions
              </EmailsButton>
            </p>
          </div>
        ),
        from: {
          email: 'contact@greatfrontend.com',
          name: 'GreatFrontEnd Sponsorships',
        },
        subject: `Sponsorship contact form submitted by ${email}`,
        to: {
          email: SPONSORS_SPONSOR_MANAGER_EMAIL,
          name: null,
        },
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

    const publishedAdFilter = {
      ad: {
        request: {
          status: 'PUBLISHED',
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
              ...publishedAdFilter,
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
                  ...publishedAdFilter,
                  week: {
                    gte: availabilityStartWeek,
                    lte: 52,
                  },
                  year: currentYear,
                },
                {
                  ...publishedAdFilter,
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
});
