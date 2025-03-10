import type {
  SponsorsAdFormatPayloadInContent,
  SponsorsAdFormatPayloadSpotlight,
} from '~/components/sponsors/SponsorsTypes';

import { PROMO_PROJECTS_BETA_DISCOUNT_PERCENTAGE } from '../PromotionConfig';

export const SponsorsAdsSpotsProjectsSpotlight: SponsorsAdFormatPayloadSpotlight =
  {
    adId: 'projects-spotlight',
    external: false,
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
                text: 'Join GreatFrontend Projects and challenge yourself with real-world front end projects! Enhance your skills by building pricing sections, info cards, interactive dashboards, and much more. Each challenge is designed with a modular approach, allowing you to create flexible, scalable, and industry-standard UI components.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
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
                            text: 'Get started',
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
                    format: '',
                    indent: 0,
                    rel: null,
                    target: null,
                    title: null,
                    type: 'custom-link',
                    url: 'https:///projects',
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
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Project challenges',
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
                type: 'listitem',
                value: 2,
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
                        text: 'User submissions',
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
                    url: '/projects/submissions',
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
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Learn from ex-FAANG engineers and grow alongside a thriving community of developers! Gain valuable insights, best practices, and industry secrets from experienced professionals who have worked at top tech companies. Collaborate with like-minded peers, improve your coding skills through real-world challenges.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
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
    external: false,
    format: 'IN_CONTENT',
    imageUrl: 'https://www.gfecdn.net/sponsors/ads/projects/in-content.webp',
    sponsorName: 'GreatFrontEnd Projects',
    title: 'The fastest way to learn Front End – by building actual projects',
    url: '/projects',
  };
