export type SponsorsAdFormatFormItem =
  | Readonly<{
      format: 'GLOBAL_BANNER';
      id: string;
      text: string;
      url: string;
      weeks: Set<string>;
    }>
  | Readonly<{
      format: 'IN_CONTENT';
      id: string;
      imageUrl: string;
      text: string;
      url: string;
      weeks: Set<string>;
    }>
  | Readonly<{
      format: 'SPOTLIGHT';
      id: string;
      imageUrl: string;
      text: string;
      url: string;
      weeks: Set<string>;
    }>;

export type SponsorsCompanyDetails = Readonly<{
  address: Readonly<{
    city: string;
    country: string;
    line1: string;
    line2?: string;
    postalCode: string;
    state: string;
  }>;
  legalName: string;
  signatoryName: string;
  signatoryTitle: string;
  sponsorName: string;
  taxNumber?: string;
}>;
