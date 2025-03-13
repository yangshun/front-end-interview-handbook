import { v4 as uuidv4 } from 'uuid';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import type { SponsorsAdFormatFormItem, SponsorsCompanyDetails } from './types';

export type AdvertiseRequestFormValues = Readonly<{
  ads: Array<SponsorsAdFormatFormItem>;
  company: SponsorsCompanyDetails | null;
  emails: Array<string>;
  sessionId: string;
}>;

export default function useSponsorsAdvertiseRequestFormData(
  defaultValues?: Omit<AdvertiseRequestFormValues, 'sessionId'>,
) {
  return useGreatStorageLocal<AdvertiseRequestFormValues>(
    'sponsorships:advertise-request',
    () =>
      defaultValues
        ? { ...defaultValues, sessionId: uuidv4() }
        : {
            ads: [],
            company: null,
            emails: [],
            sessionId: uuidv4(),
          },
    { ttl: 7 * 24 * 60 * 60 },
  );
}
