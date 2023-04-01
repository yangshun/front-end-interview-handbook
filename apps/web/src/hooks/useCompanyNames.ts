import { useIntl } from 'react-intl';

import type { QuestionCompany } from '~/components/questions/common/QuestionsTypes';

export default function useCompanyNames(): Record<
  QuestionCompany,
  Readonly<{ label: string; logoUrl: string }>
> {
  const intl = useIntl();

  return {
    airbnb: {
      label: intl.formatMessage({
        defaultMessage: 'Airbnb',
        description: 'Company name for Airbnb',
        id: 'M9z02W',
      }),
      logoUrl: 'https://logo.clearbit.com/airbnb.com',
    },
    amazon: {
      label: intl.formatMessage({
        defaultMessage: 'Amazon',
        description: 'Company name for Amazon',
        id: 'iLx/BQ',
      }),
      logoUrl: '/img/companies/amazon-logo.jpg',
    },
    apple: {
      label: intl.formatMessage({
        defaultMessage: 'Apple',
        description: 'Company name for Apple',
        id: 'hNQSH/',
      }),
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    },
    bytedance: {
      label: intl.formatMessage({
        defaultMessage: 'ByteDance',
        description: 'Company name for ByteDance',
        id: 'yeLNWe',
      }),
      logoUrl: 'https://logo.clearbit.com/bytedance.com',
    },
    dropbox: {
      label: intl.formatMessage({
        defaultMessage: 'Dropbox',
        description: 'Company name for Dropbox',
        id: 'QVh3mt',
      }),
      logoUrl: 'https://logo.clearbit.com/dropbox.com',
    },
    google: {
      label: intl.formatMessage({
        defaultMessage: 'Google',
        description: 'Company name for Google',
        id: 'fHpn67',
      }),
      logoUrl: '/img/companies/google-logo.svg',
    },
    linkedin: {
      label: intl.formatMessage({
        defaultMessage: 'LinkedIn',
        description: 'Company name for LinkedIn',
        id: 'g3PJQr',
      }),
      logoUrl: 'https://logo.clearbit.com/linkedin.com',
    },
    lyft: {
      label: intl.formatMessage({
        defaultMessage: 'Lyft',
        description: 'Company name for Lyft',
        id: 'TDzLXK',
      }),
      logoUrl: 'https://logo.clearbit.com/lyft.com',
    },
    microsoft: {
      label: intl.formatMessage({
        defaultMessage: 'Microsoft',
        description: 'Company name for Microsoft',
        id: 'MeV/ww',
      }),
      logoUrl: 'https://logo.clearbit.com/microsoft.com',
    },
    palantir: {
      label: intl.formatMessage({
        defaultMessage: 'Palantir',
        description: 'Company name for Palantir',
        id: 'U022No',
      }),
      logoUrl: 'https://logo.clearbit.com/palantir.com',
    },
    salesforce: {
      label: intl.formatMessage({
        defaultMessage: 'Salesforce',
        description: 'Company name for Salesforce',
        id: 'uz7f93',
      }),
      logoUrl: 'https://logo.clearbit.com/salesforce.com',
    },
    snap: {
      label: intl.formatMessage({
        defaultMessage: 'Snap',
        description: 'Company name for Snap',
        id: 'RMBCok',
      }),
      logoUrl: 'https://logo.clearbit.com/snap.com',
    },
    stripe: {
      label: intl.formatMessage({
        defaultMessage: 'Stripe',
        description: 'Company name for Stripe',
        id: 'v7xpbV',
      }),
      logoUrl: 'https://logo.clearbit.com/stripe.com',
    },
    toptal: {
      label: intl.formatMessage({
        defaultMessage: 'Toptal',
        description: 'Company name for Toptal',
        id: '3du5bC',
      }),
      logoUrl: 'https://logo.clearbit.com/toptal.com',
    },
    twitter: {
      label: intl.formatMessage({
        defaultMessage: 'Twitter',
        description: 'Company name for Twitter',
        id: 'bZFghR',
      }),
      logoUrl: 'https://logo.clearbit.com/twitter.com',
    },
    uber: {
      label: intl.formatMessage({
        defaultMessage: 'Uber',
        description: 'Company name for Uber',
        id: 'Ku3VdX',
      }),
      logoUrl: 'https://logo.clearbit.com/uber.com',
    },
    walmart: {
      label: intl.formatMessage({
        defaultMessage: 'Walmart',
        description: 'Company name for Walmart',
        id: '8Nm9WZ',
      }),
      logoUrl: 'https://logo.clearbit.com/walmart.com',
    },
    yelp: {
      label: intl.formatMessage({
        defaultMessage: 'Yelp',
        description: 'Company name for Yelp',
        id: 'UBPrBM',
      }),
      logoUrl: 'https://logo.clearbit.com/yelp.com',
    },
  };
}
