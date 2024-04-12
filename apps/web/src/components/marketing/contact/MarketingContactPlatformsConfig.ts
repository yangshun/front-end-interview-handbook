import { RiMailLine } from 'react-icons/ri';

import { SocialLinks } from '~/data/SocialLinks';

type ContactPlatform = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  name: string;
  userCount: number | null;
}>;

function usePlatforms() {
  const platforms: ReadonlyArray<ContactPlatform> = [
    {
      href: 'mailto:contact@greatfrontend.com',
      icon: RiMailLine,
      key: 'email',
      name: 'Email',
      userCount: null,
    },
    SocialLinks.github,
    SocialLinks.twitter,
    SocialLinks.linkedin,
  ];

  return platforms;
}

export default usePlatforms;
