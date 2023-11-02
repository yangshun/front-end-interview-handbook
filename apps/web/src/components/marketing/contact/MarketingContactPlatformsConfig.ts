import { RiMailLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { SocialLinks } from '~/data/SocialLinks';

type ContactPlatform = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  name: string;
}>;

function usePlatforms() {
  const intl = useIntl();
  const platforms: ReadonlyArray<ContactPlatform> = [
    {
      href: 'mailto:contact@greatfrontend.com',
      icon: RiMailLine,
      key: 'email',
      name: intl.formatMessage({
        defaultMessage: 'Email',
        description: 'Email',
        id: 'y8zzVx',
      }),
    },
    SocialLinks.github,
    SocialLinks.twitter,
    SocialLinks.linkedin,
  ];

  return platforms;
}

export default usePlatforms;
