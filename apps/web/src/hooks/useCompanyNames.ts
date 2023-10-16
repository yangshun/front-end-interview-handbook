import type { SVGProps } from 'react';
import {
  FaAirbnb,
  FaAmazon,
  FaApple,
  FaDropbox,
  FaGoogle,
  FaLinkedin,
  FaLyft,
  FaMicrosoft,
  FaSalesforce,
  FaSnapchat,
  FaStripeS,
  FaTwitter,
  FaUber,
  FaYelp,
} from 'react-icons/fa';
import { SiBytedance, SiPalantir, SiToptal } from 'react-icons/si';
import { TbBrandWalmart } from 'react-icons/tb';
import { useIntl } from 'react-intl';

import type { QuestionCompany } from '~/components/questions/common/QuestionsTypes';

export default function useCompanyNames(): Record<
  QuestionCompany,
  Readonly<{
    label: string;
    logo: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }>
> {
  const intl = useIntl();

  return {
    airbnb: {
      label: intl.formatMessage({
        defaultMessage: 'Airbnb',
        description: 'Company name for Airbnb',
        id: 'M9z02W',
      }),
      logo: FaAirbnb,
    },
    amazon: {
      label: intl.formatMessage({
        defaultMessage: 'Amazon',
        description: 'Company name for Amazon',
        id: 'iLx/BQ',
      }),
      logo: FaAmazon,
    },
    apple: {
      label: intl.formatMessage({
        defaultMessage: 'Apple',
        description: 'Company name for Apple',
        id: 'hNQSH/',
      }),
      logo: FaApple,
    },
    bytedance: {
      label: intl.formatMessage({
        defaultMessage: 'ByteDance',
        description: 'Company name for ByteDance',
        id: 'yeLNWe',
      }),
      logo: SiBytedance,
    },
    dropbox: {
      label: intl.formatMessage({
        defaultMessage: 'Dropbox',
        description: 'Company name for Dropbox',
        id: 'QVh3mt',
      }),
      logo: FaDropbox,
    },
    google: {
      label: intl.formatMessage({
        defaultMessage: 'Google',
        description: 'Company name for Google',
        id: 'fHpn67',
      }),
      logo: FaGoogle,
    },
    linkedin: {
      label: intl.formatMessage({
        defaultMessage: 'LinkedIn',
        description: 'Company name for LinkedIn',
        id: 'g3PJQr',
      }),
      logo: FaLinkedin,
    },
    lyft: {
      label: intl.formatMessage({
        defaultMessage: 'Lyft',
        description: 'Company name for Lyft',
        id: 'TDzLXK',
      }),
      logo: FaLyft,
    },
    microsoft: {
      label: intl.formatMessage({
        defaultMessage: 'Microsoft',
        description: 'Company name for Microsoft',
        id: 'MeV/ww',
      }),
      logo: FaMicrosoft,
    },
    palantir: {
      label: intl.formatMessage({
        defaultMessage: 'Palantir',
        description: 'Company name for Palantir',
        id: 'U022No',
      }),
      logo: SiPalantir,
    },
    salesforce: {
      label: intl.formatMessage({
        defaultMessage: 'Salesforce',
        description: 'Company name for Salesforce',
        id: 'uz7f93',
      }),
      logo: FaSalesforce,
    },
    snap: {
      label: intl.formatMessage({
        defaultMessage: 'Snap',
        description: 'Company name for Snap',
        id: 'RMBCok',
      }),
      logo: FaSnapchat,
    },
    stripe: {
      label: intl.formatMessage({
        defaultMessage: 'Stripe',
        description: 'Company name for Stripe',
        id: 'v7xpbV',
      }),
      logo: FaStripeS,
    },
    toptal: {
      label: intl.formatMessage({
        defaultMessage: 'Toptal',
        description: 'Company name for Toptal',
        id: '3du5bC',
      }),
      logo: SiToptal,
    },
    twitter: {
      label: intl.formatMessage({
        defaultMessage: 'Twitter',
        description: 'Company name for Twitter',
        id: 'bZFghR',
      }),
      logo: FaTwitter,
    },
    uber: {
      label: intl.formatMessage({
        defaultMessage: 'Uber',
        description: 'Company name for Uber',
        id: 'Ku3VdX',
      }),
      logo: FaUber,
    },
    walmart: {
      label: intl.formatMessage({
        defaultMessage: 'Walmart',
        description: 'Company name for Walmart',
        id: '8Nm9WZ',
      }),
      logo: TbBrandWalmart,
    },
    yelp: {
      label: intl.formatMessage({
        defaultMessage: 'Yelp',
        description: 'Company name for Yelp',
        id: 'UBPrBM',
      }),
      logo: FaYelp,
    },
  };
}