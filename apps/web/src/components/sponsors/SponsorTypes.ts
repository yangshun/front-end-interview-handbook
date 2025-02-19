import { z } from 'zod';

export const SponsorPlacementZodEnum = z.enum([
  'GLOBAL_BANNER',
  'IN_CONTENT',
  'SPOTLIGHT',
]);

export type SponsorPlacement = z.infer<typeof SponsorPlacementZodEnum>;

export type SponsorPlacementDataType = Readonly<{
  config: SponsorPlacementConfig;
  description: string;
  name: string;
  placement: SponsorPlacement;
}>;

export type SponsorPlacementConfig = Readonly<{
  impressions: string;
  pages: number;
  pricePerWeekUSD: number;
}>;

export type SponsorPlacementAd =
  | Readonly<{
      imageUrl?: string;
      placement: 'IN_CONTENT';
      text: string;
      url: string;
    }>
  | Readonly<{
      imageUrl?: string;
      placement: 'SPOTLIGHT';
      text: string;
      url: string;
    }>
  | Readonly<{
      placement: 'GLOBAL_BANNER';
      text: string;
      url: string;
    }>;
