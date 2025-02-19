import { z } from 'zod';

export const SponsorsPlacementZodEnum = z.enum([
  'GLOBAL_BANNER',
  'IN_CONTENT',
  'SPOTLIGHT',
]);

export type SponsorsPlacement = z.infer<typeof SponsorsPlacementZodEnum>;

export type SponsorsPlacementDataType = Readonly<{
  config: SponsorsPlacementConfig;
  description: string;
  name: string;
  placement: SponsorsPlacement;
}>;

export type SponsorsPlacementConfig = Readonly<{
  impressions: string;
  pages: number;
  pricePerWeekUSD: number;
}>;

export type SponsorsAdPlacementPayloadInContent = Readonly<{
  body: string;
  imageUrl?: string;
  placement: 'IN_CONTENT';
  title: string;
  url: string;
}>;

export type SponsorsAdPlacementPayloadSpotlight = Readonly<{
  imageUrl?: string;
  placement: 'SPOTLIGHT';
  text: string;
  url: string;
}>;

export type SponsorsAdPlacementPayloadGlobalBanner = Readonly<{
  placement: 'GLOBAL_BANNER';
  text: string;
  url: string;
}>;

export type SponsorsAdPlacementPayload =
  | SponsorsAdPlacementPayloadGlobalBanner
  | SponsorsAdPlacementPayloadInContent
  | SponsorsAdPlacementPayloadSpotlight;
