export type SponsorsAdFormatGlobalBannerItem = Readonly<{
  format: 'GLOBAL_BANNER';
  id: string;
  sponsorName: string;
  text: string;
  url: string;
  weeks: Array<string>;
}>;

export type SponsorsAdFormatSpotlightItem = Readonly<{
  format: 'SPOTLIGHT';
  id: string;
  imageUrl: string;
  sponsorName: string;
  text: string;
  url: string;
  weeks: Array<string>;
}>;

export type SponsorsAdFormatInContentItem = Readonly<{
  body: string;
  format: 'IN_CONTENT';
  id: string;
  imageUrl: string;
  sponsorName: string;
  text: string;
  url: string;
  weeks: Array<string>;
}>;

export type SponsorsAdFormatFormItem =
  | SponsorsAdFormatGlobalBannerItem
  | SponsorsAdFormatInContentItem
  | SponsorsAdFormatSpotlightItem;

export type SponsorsCompanyDetails = Readonly<{
  address: Readonly<{
    city?: string;
    country: string;
    line1: string;
    line2?: string;
    postalCode: string;
    state?: string;
  }>;
  legalName: string;
  signatoryName: string;
  signatoryTitle: string;
  sponsorName: string;
  taxNumber?: string;
}>;
