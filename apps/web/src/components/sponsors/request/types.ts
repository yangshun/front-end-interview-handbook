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
      text: string;
      url: string;
      weeks: Set<string>;
    }>
  | Readonly<{
      format: 'SPOTLIGHT';
      id: string;
      text: string;
      url: string;
      weeks: Set<string>;
    }>;
