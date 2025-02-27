import { z } from 'zod';

import { useIntl } from '~/components/intl';

function sponsorNameSchema(options?: { minMessage: string }) {
  const { minMessage = 'Sponsor name is required' } = options ?? {};

  return z.string().min(1, minMessage);
}

function legalNameSchema(options?: { minMessage: string }) {
  const { minMessage = 'Legal name is required' } = options ?? {};

  return z.string().min(1, minMessage);
}

function taxNumberSchema() {
  return z.string().optional();
}

function addressSchema(options?: {
  cityRequiredMessage: string;
  countryRequiredMessage: string;
  line1RequiredMessage: string;
  postalCodeRequiredMessage: string;
  stateRequiredMessage: string;
}) {
  const {
    countryRequiredMessage = 'Country is required',
    cityRequiredMessage = 'City is required',
    postalCodeRequiredMessage = 'Postal code is required',
    stateRequiredMessage = 'State is required',
    line1RequiredMessage = 'Street is required',
  } = options ?? {};

  return z.object({
    city: z.string().min(1, cityRequiredMessage),
    country: z.string().min(1, countryRequiredMessage),
    line1: z.string().min(1, line1RequiredMessage),
    line2: z.string().optional(),
    postalCode: z.string().min(1, postalCodeRequiredMessage),
    state: z.string().min(1, stateRequiredMessage),
  });
}

function signatoryNameSchema(options?: { minMessage: string }) {
  const { minMessage = 'Signatory name is required' } = options ?? {};

  return z.string().min(1, minMessage);
}

function signatoryTitleSchema(options?: { minMessage: string }) {
  const { minMessage = 'Signatory title is required' } = options ?? {};

  return z.string().min(1, minMessage);
}

export function useSponsorsCompanySchema() {
  const intl = useIntl();

  return z.object({
    address: addressSchema({
      cityRequiredMessage: intl.formatMessage({
        defaultMessage: 'City is required',
        description: 'Error message for city',
        id: 'gmgOLc',
      }),
      countryRequiredMessage: intl.formatMessage({
        defaultMessage: 'Country is required',
        description: 'Error message for country',
        id: '3/KJgr',
      }),
      line1RequiredMessage: intl.formatMessage({
        defaultMessage: 'Street is required',
        description: 'Error message for street',
        id: 'D2WaF7',
      }),
      postalCodeRequiredMessage: intl.formatMessage({
        defaultMessage: 'Postal code is required',
        description: 'Error message for postal code',
        id: 'Qd4bl9',
      }),
      stateRequiredMessage: intl.formatMessage({
        defaultMessage: 'State is required',
        description: 'Error message for state',
        id: 'LQwMJq',
      }),
    }),
    legalName: legalNameSchema({
      minMessage: intl.formatMessage({
        defaultMessage: 'Legal name is required',
        description: 'Error message for legal name',
        id: 'mIhFbl',
      }),
    }),
    signatoryName: signatoryNameSchema({
      minMessage: intl.formatMessage({
        defaultMessage: 'Signatory name is required',
        description: 'Error message for signatory name',
        id: 'z4Pmzh',
      }),
    }),
    signatoryTitle: signatoryTitleSchema({
      minMessage: intl.formatMessage({
        defaultMessage: 'Signatory title is required',
        description: 'Error message for signatory title',
        id: 'H34NwF',
      }),
    }),
    sponsorName: sponsorNameSchema({
      minMessage: intl.formatMessage({
        defaultMessage: 'Sponsor name is required',
        description: 'Error message for sponsor name',
        id: 'mWSkkL',
      }),
    }),
    taxNumber: taxNumberSchema(),
  });
}

export const sponsorsCompanySchemaServer = z.object({
  address: addressSchema({
    cityRequiredMessage: 'City is required',
    countryRequiredMessage: 'Country is required',
    line1RequiredMessage: 'Street is required',
    postalCodeRequiredMessage: 'Postal code is required',
    stateRequiredMessage: 'State is required',
  }),
  legalName: legalNameSchema({
    minMessage: 'Legal name is required',
  }),
  signatoryName: signatoryNameSchema({
    minMessage: 'Signatory name is required',
  }),
  signatoryTitle: signatoryTitleSchema({
    minMessage: 'Signatory title is required',
  }),
  sponsorName: sponsorNameSchema({
    minMessage: 'Sponsor name is required',
  }),
  taxNumber: taxNumberSchema(),
});
