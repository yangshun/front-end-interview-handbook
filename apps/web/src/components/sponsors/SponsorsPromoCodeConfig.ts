export const SponsorsPromoCodeConfig: Record<
  string,
  {
    code: string;
    percentOff: number;
  }
> = {
  TRIAL25: {
    code: 'TRIAL25',
    percentOff: 25,
  },
} as const;
