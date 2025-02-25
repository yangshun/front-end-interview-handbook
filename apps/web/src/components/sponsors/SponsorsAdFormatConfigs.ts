import { useIntl } from '~/components/intl';

import type {
  SponsorsAdFormat,
  SponsorsAdFormatConfig,
  SponsorsAdFormatDataType,
} from './SponsorsTypes';
import { QuestionCountTotal } from '../interviews/questions/listings/stats/QuestionCount';

export const SponsorAdFormatConfigs: Record<
  SponsorsAdFormat,
  SponsorsAdFormatConfig
> = {
  GLOBAL_BANNER: {
    impressions: '100,000',
    pages: 500,
    placementConstraints: {
      text: 55,
    },
    pricePerWeekUSD: 1200,
  },
  IN_CONTENT: {
    impressions: '110,700',
    pages: 400,
    placementConstraints: {
      body: {
        length: 800,
        links: 3,
      },
      image: {
        height: 380,
        width: 760,
      },
      text: 55,
    },
    pricePerWeekUSD: 1328,
  },
  SPOTLIGHT: {
    impressions: '96,500',
    pages: 50,
    placementConstraints: {
      image: {
        height: 48,
        width: 96,
      },
      text: 40,
    },
    pricePerWeekUSD: 1250,
  },
};

export function useSponsorsAdFormatData(): Record<
  SponsorsAdFormat,
  SponsorsAdFormatDataType
> {
  const intl = useIntl();

  return {
    GLOBAL_BANNER: {
      config: SponsorAdFormatConfigs.GLOBAL_BANNER,
      description: intl.formatMessage({
        defaultMessage:
          'Showcase your brand or offer in a pinned top banner that appears across the entire site',
        description: 'Ad format description',
        id: 'm1O0/b',
      }),
      format: 'GLOBAL_BANNER',
      name: intl.formatMessage({
        defaultMessage: 'Global banner',
        description: 'Ad format',
        id: 'YhjdIq',
      }),
      shortDescription: intl.formatMessage({
        defaultMessage: 'Pinned top banner that appears across the entire site',
        description: 'Ad format description',
        id: 'HUASHd',
      }),
    },
    IN_CONTENT: {
      config: SponsorAdFormatConfigs.IN_CONTENT,
      description: intl.formatMessage(
        {
          defaultMessage:
            'Showcase your brand or offer with a premium ad unit seamlessly integrated into all {questionCount}+ of our questions and guides, reaching deeply immersed users',
          description: 'Ad format description',
          id: '8TRyuI',
        },
        {
          questionCount: QuestionCountTotal,
        },
      ),
      format: 'IN_CONTENT',
      name: intl.formatMessage({
        defaultMessage: 'In-content display ad',
        description: 'Ad format',
        id: 'yb8Eaa',
      }),
      shortDescription: intl.formatMessage(
        {
          defaultMessage:
            'Seamlessly integrated into all {questionCount}+ questions and guide pages',
          description: 'Ad format description',
          id: 'x5QZI9',
        },
        {
          questionCount: QuestionCountTotal,
        },
      ),
    },
    SPOTLIGHT: {
      config: SponsorAdFormatConfigs.SPOTLIGHT,
      description: intl.formatMessage({
        defaultMessage:
          'Showcase your brand or offer with a high visibility ad pinned on the application sidebar and pages',
        description: 'Ad format description',
        id: 'WJitRq',
      }),
      format: 'SPOTLIGHT',
      name: intl.formatMessage({
        defaultMessage: 'Spotlight ad',
        description: 'Ad format',
        id: '95KhOK',
      }),
      shortDescription: intl.formatMessage({
        defaultMessage: 'High visibility ad pinned on sidebars and pages',
        description: 'Ad format description',
        id: 'oW70kj',
      }),
    },
  };
}
