import type {
  SponsorsAdFormatPayloadInContent,
  SponsorsAdFormatPayloadSpotlight,
} from '~/components/sponsors/SponsorsTypes';

import {
  PROMO_PROJECTS_BETA_DISCOUNT_CODE,
  PROMO_PROJECTS_BETA_DISCOUNT_PERCENTAGE,
} from '../PromotionConfig';

export const SponsorsAdsSpotsProjectsSpotlight: SponsorsAdFormatPayloadSpotlight =
  {
    adId: 'projects-spotlight',
    format: 'SPOTLIGHT',
    imageUrl: 'https://www.gfecdn.net/sponsors/ads/projects/spotlight.webp',
    sponsorName: 'GreatFrontEnd Projects',
    text: `${PROMO_PROJECTS_BETA_DISCOUNT_PERCENTAGE}% off the fastest way to learn front end skills`,
    url: '/projects',
  };

export const SponsorsAdsSpotsProjectsInContent: SponsorsAdFormatPayloadInContent =
  {
    adId: 'projects-in-content',
    body: JSON.stringify({
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Want to grow in your front end skills? Learn them the right way — build apps step-by-step while referencing best practices from Senior engineers.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: 'start',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: '80+ real world projects',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        rel: null,
                        target: null,
                        title: null,
                        type: 'custom-link',
                        url: '/projects/challenges',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    rel: null,
                    target: null,
                    title: null,
                    type: 'custom-link',
                    url: '/projects',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'listitem',
                value: 1,
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Professional specs and designs by top-tier product managers and designers',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'listitem',
                value: 2,
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Guides and reference solutions from Senior Big Tech engineers',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'listitem',
                value: 3,
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Use a ',
                    type: 'text',
                    version: 1,
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'front end skill roadmap',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    rel: null,
                    target: null,
                    title: null,
                    type: 'custom-link',
                    url: '/projects/skills',
                    version: 1,
                  },
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: ' to build from beginner to pro',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'listitem',
                value: 4,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            listType: 'bullet',
            start: 1,
            tag: 'ul',
            type: 'list',
            version: 1,
          },
          {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: `Get 30% off now with ${PROMO_PROJECTS_BETA_DISCOUNT_CODE} →`,
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                rel: null,
                target: null,
                title: null,
                type: 'custom-link',
                url: '/projects',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: 'start',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    }),
    format: 'IN_CONTENT',
    imageUrl: 'https://www.gfecdn.net/sponsors/ads/projects/in-content.webp',
    sponsorName: 'GreatFrontEnd Projects',
    title: 'The fastest way to learn Front End – by building actual projects',
    url: '/projects',
  };
