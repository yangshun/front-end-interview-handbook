import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import type {
  SponsorsAdFormatFormItem,
  SponsorsCompanyDetails,
  SponsorsPromoCode,
} from './types';

export type AdvertiseRequestFormValues = Readonly<{
  ads: Array<SponsorsAdFormatFormItem>;
  company: SponsorsCompanyDetails | null;
  emails: Array<string>;
  promoCode: SponsorsPromoCode;
  sessionId: string;
}>;

export default function useSponsorsAdvertiseRequestFormData(
  mode: 'create' | 'edit' | 'readonly' = 'create',
  defaultValues?: Omit<AdvertiseRequestFormValues, 'sessionId'>,
): [
  AdvertiseRequestFormValues,
  Dispatch<SetStateAction<Readonly<AdvertiseRequestFormValues>>>,
  () => void,
] {
  const [storageValue, setStorageValue, removeStorageValue] =
    useGreatStorageLocal<AdvertiseRequestFormValues>(
      'sponsorships:advertise-request',
      () => ({
        ads: [],
        company: null,
        emails: [],
        promoCode: null,
        sessionId: uuidv4(),
      }),
      { ttl: 7 * 24 * 60 * 60 },
    );
  const [value, setValue] = useState<AdvertiseRequestFormValues>(
    defaultValues
      ? { ...defaultValues, sessionId: uuidv4() }
      : {
          ads: [],
          company: null,
          emails: [],
          promoCode: null,
          sessionId: uuidv4(),
        },
  );

  function removeValue() {
    setValue((prev) => ({
      ...prev,
      ads: [],
      company: null,
      emails: [],
    }));
  }

  return mode === 'create'
    ? [storageValue, setStorageValue, removeStorageValue]
    : [value, setValue, removeValue];
}
