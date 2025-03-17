export type SponsorsAdminFilter<T extends string> = Readonly<{
  id: string;
  name: string;
  onChange: (value: T) => void;
  onClear: () => void;
  options: ReadonlyArray<{
    label: string;
    value: T;
  }>;
}>;

export type AdminSponsorsAdRequestSortField = 'createdAt' | 'signatoryName';
export type AdminSponsorsFeedbackSortField = 'createdAt' | 'email';
export type FEEDBACK_STATUS = 'RESOLVED' | 'UNRESOLVED';
