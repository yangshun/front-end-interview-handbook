export const SponsorsPromoCodeConfig: Record<
  string,
  {
    code: string;
    percentOff: number;
  }
> = {
  '10OFF': {
    code: '10OFF',
    percentOff: 10,
  },
  '15OFF': {
    code: '15OFF',
    percentOff: 15,
  },
  '20OFF': {
    code: '20OFF',
    percentOff: 20,
  },
  '25OFF': {
    code: '25OFF',
    percentOff: 25,
  },
  '30OFF': {
    code: '30OFF',
    percentOff: 30,
  },
  '40OFF': {
    code: '40OFF',
    percentOff: 40,
  },
  '50OFF': {
    code: '50OFF',
    percentOff: 50,
  },
} as const;
