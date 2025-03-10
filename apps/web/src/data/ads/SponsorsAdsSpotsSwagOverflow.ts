import type {
  SponsorsAdFormatPayloadInContent,
  SponsorsAdFormatPayloadSpotlight,
} from '~/components/sponsors/SponsorsTypes';

export const SponsorsAdsSpotsSwagOverflowSpotlight: SponsorsAdFormatPayloadSpotlight =
  {
    adId: 'swag-overflow-spotlight',
    external: false,
    format: 'SPOTLIGHT',
    imageUrl:
      'https://www.gfecdn.net/sponsors/ads/swag-overflow/spotlight.webp',
    sponsorName: 'SwagOverflow',
    text: 'Ultimate swag store for the modern front end dev',
    url: 'https://www.swagoverflow.store/',
  };

export const SponsorsAdsSpotsSwagOverflowInContentUndefinedIsNotAFunction: SponsorsAdFormatPayloadInContent =
  {
    adId: 'swag-overflow-in-content',
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
                text: 'A front end rite of passage — staring at this error in despair. Now, wear it with pride. This crisp white tee features the infamous JavaScript headache in bold, minimalist typography, making it the perfect uniform for late-night debugging sessions. A must-have for any front-end engineer who’s been personally victimized by ',
                type: 'text',
                version: 1,
              },
              {
                detail: 0,
                format: 16,
                mode: 'normal',
                style: '',
                text: 'undefined',
                type: 'text',
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '. ',
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
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Get yours now ->',
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
                url: 'https://www.swagoverflow.store/products/undefined-is-not-a-function-tee-unisex',
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
    imageUrl:
      'https://www.gfecdn.net/sponsors/ads/swag-overflow/undefined-is-not-a-function.webp',
    sponsorName: 'SwagOverflow',
    title: 'The `undefined` is not a function Tee – A debugging classic',
    url: 'https://www.swagoverflow.store/products/undefined-is-not-a-function-tee-unisex',
  };
