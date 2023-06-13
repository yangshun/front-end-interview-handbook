// Import DiscordIcon from '../../icons/DiscordIcon';
import { RiMailLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import GitHubIcon from '../../icons/GitHubIcon';
import RedditIcon from '../../icons/RedditIcon';
// Import TelegramIcon from '../../icons/TelegramIcon';
import TwitterIcon from '../../icons/TwitterIcon';

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
    {
      href: 'https://github.com/greatfrontend/greatfrontend/discussions',
      icon: GitHubIcon,
      key: 'github',
      name: 'GitHub',
    },
    // {
    //   href: '/',
    //   icon: TelegramIcon,
    //   key: 'telegram',
    //   name: intl.formatMessage({
    //     defaultMessage: 'Telegram',
    //     description: 'Telegram label',
    //     id: '+XIDRg',
    //   }),
    // },
    {
      href: 'https://twitter.com/greatfrontend',
      icon: TwitterIcon,
      key: 'twitter',
      name: 'Twitter',
    },
    // {
    //   href: '/',
    //   icon: DiscordIcon,
    //   key: 'discord',
    //   name: intl.formatMessage({
    //     defaultMessage: 'Discord',
    //     description: 'Discord label',
    //     id: 'GBelin',
    //   }),
    // },
    {
      href: 'https://www.reddit.com/r/greatfrontend',
      icon: RedditIcon,
      key: 'reddit',
      name: 'Reddit',
    },
  ];

  return platforms;
}

export default usePlatforms;
