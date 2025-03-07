import { v4 as uuidv4 } from 'uuid';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import type { SponsorsAdFormatFormItem, SponsorsCompanyDetails } from './types';

type AdvertiseRequestFormValues = Readonly<{
  ads: Array<SponsorsAdFormatFormItem>;
  company: SponsorsCompanyDetails | null;
  emails: Array<string>;
  sessionId: string;
}>;

export default function useSponsorsAdvertiseRequestFormData() {
  return useGreatStorageLocal<AdvertiseRequestFormValues>(
    'sponsorships:advertise-request',
    () => ({
      ads: [],
      company: null,
      emails: [],
      sessionId: uuidv4(),
    }),
    { ttl: 7 * 24 * 60 * 60 },
  );
}
