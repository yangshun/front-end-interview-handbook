import type { SponsorsAdFormat } from '@prisma/client';

export type SponsorsAdFormatDataType = Readonly<{
  config: SponsorsAdFormatConfig;
  description: string;
  format: SponsorsAdFormat;
  name: string;
  shortDescription: string;
}>;

export type SponsorsAdFormatConfig = Readonly<{
  impressions: string;
  pages: number;
  placementConstraints: Readonly<{
    body?: {
      length: number;
      links: number;
    };
    image?: {
      height: number;
      width: number;
    };
    text: number;
  }>;
  pricePerWeekUSD: number;
}>;

export type SponsorsAdFormatPayloadInContent = Readonly<{
  adId: string;
  body: string;
  external: boolean;
  format: 'IN_CONTENT';
  imageUrl: string;
  sponsorName: string;
  title: string;
  url: string;
}>;

export type SponsorsAdFormatPayloadSpotlight = Readonly<{
  adId: string;
  external: boolean;
  format: 'SPOTLIGHT';
  imageUrl: string;
  sponsorName: string;
  text: string;
  url: string;
}>;

export type SponsorsAdFormatPayloadGlobalBanner = Readonly<{
  adId: string;
  external: boolean;
  format: 'GLOBAL_BANNER';
  sponsorName: string;
  text: string;
  url: string;
}>;

export type SponsorsAdFormatPayload =
  | SponsorsAdFormatPayloadGlobalBanner
  | SponsorsAdFormatPayloadInContent
  | SponsorsAdFormatPayloadSpotlight;
