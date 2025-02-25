import { SocialLinks } from '~/data/SocialLinks';

import { useIntl } from '~/components/intl';

export default function useCommonFooterLinks() {
  const intl = useIntl();

  return {
    legal: [
      {
        href: '/legal/privacy-policy',
        key: 'privacy',
        name: intl.formatMessage({
          defaultMessage: 'Privacy Policy',
          description: 'Link to privacy policy page',
          id: 'ITq0p4',
        }),
      },
      {
        href: '/legal/terms',
        key: 'tos',
        name: intl.formatMessage({
          defaultMessage: 'Terms of Service',
          description: 'Link to terms of service page',
          id: 'zIQsmk',
        }),
      },
    ],
    social: [
      SocialLinks.linkedin,
      SocialLinks.discord,
      SocialLinks.github,
      SocialLinks.x,
    ],
  };
}
