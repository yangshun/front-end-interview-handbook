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
    pricePerWeekUSD: 1200,
  },
  IN_CONTENT: {
    impressions: '110,700',
    pages: 400,
    pricePerWeekUSD: 1328,
  },
  SPOTLIGHT: {
    impressions: '96,500',
    pages: 50,
    pricePerWeekUSD: 1250,
  },
};

export function useSponsorPlacementData(): Record<
  SponsorsAdFormat,
  SponsorsAdFormatDataType
> {
  const intl = useIntl();

  return {
    GLOBAL_BANNER: {
      config: SponsorAdFormatConfigs.GLOBAL_BANNER,
      description: intl.formatMessage({
        defaultMessage:
          'Showcase your brand or offer in a pinned top banner that appears across our entire site',
        description: 'Ad placement description',
        id: '5wXtT4',
      }),
      format: 'GLOBAL_BANNER',
      name: intl.formatMessage({
        defaultMessage: 'Global banner',
        description: 'Ad placement',
        id: '/01zKd',
      }),
    },
    IN_CONTENT: {
      config: SponsorAdFormatConfigs.IN_CONTENT,
      description: intl.formatMessage(
        {
          defaultMessage:
            'Showcase your brand or offer with a premium ad unit seamlessly integrated into all {questionCount}+ of our questions and guides, reaching deeply immersed users',
          description: 'Ad placement description',
          id: 'x6UznE',
        },
        {
          questionCount: QuestionCountTotal,
        },
      ),
      format: 'IN_CONTENT',
      name: intl.formatMessage({
        defaultMessage: 'In-content display ad',
        description: 'Ad placement',
        id: 'nwNS1U',
      }),
    },
    SPOTLIGHT: {
      config: SponsorAdFormatConfigs.SPOTLIGHT,
      description: intl.formatMessage({
        defaultMessage:
          'Showcase your brand or offer with a high visibility ad pinned on the application sidebar and pages',
        description: 'Ad placement description',
        id: '5x8bSw',
      }),
      format: 'SPOTLIGHT',
      name: intl.formatMessage({
        defaultMessage: 'Spotlight ad',
        description: 'Ad placement',
        id: 'vq81Mh',
      }),
    },
  };
}
