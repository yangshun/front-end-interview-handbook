import { z } from 'zod';

export const SponsorsAdFormatZodEnum = z.enum([
  'GLOBAL_BANNER',
  'IN_CONTENT',
  'SPOTLIGHT',
]);

export type SponsorsAdFormat = z.infer<typeof SponsorsAdFormatZodEnum>;

export type SponsorsAdFormatDataType = Readonly<{
  config: SponsorsAdFormatConfig;
  description: string;
  format: SponsorsAdFormat;
  name: string;
}>;

export type SponsorsAdFormatConfig = Readonly<{
  impressions: string;
  pages: number;
  pricePerWeekUSD: number;
}>;

export type SponsorsAdFormatPayloadInContent = Readonly<{
  body: string;
  external: boolean;
  format: 'IN_CONTENT';
  id: string;
  imageUrl: string;
  sponsorName: string;
  title: string;
  url: string;
}>;

export type SponsorsAdFormatPayloadSpotlight = Readonly<{
  external: boolean;
  format: 'SPOTLIGHT';
  id: string;
  imageUrl?: string;
  sponsorName: string;
  text: string;
  url: string;
}>;

export type SponsorsAdFormatPayloadGlobalBanner = Readonly<{
  external: boolean;
  format: 'GLOBAL_BANNER';
  id: string;
  sponsorName: string;
  text: string;
  url: string;
}>;

export type SponsorsAdFormatPayload =
  | SponsorsAdFormatPayloadGlobalBanner
  | SponsorsAdFormatPayloadInContent
  | SponsorsAdFormatPayloadSpotlight;
