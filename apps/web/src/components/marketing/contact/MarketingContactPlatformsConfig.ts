// Import DiscordIcon from '../../icons/DiscordIcon';
import GitHubIcon from '../../icons/GitHubIcon';
import RedditIcon from '../../icons/RedditIcon';
// Import TelegramIcon from '../../icons/TelegramIcon';
import TwitterIcon from '../../icons/TwitterIcon';

import { EnvelopeIcon } from '@heroicons/react/24/solid';

type ContactPlatform = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  name: string;
}>;

const platforms: ReadonlyArray<ContactPlatform> = [
  {
    href: 'mailto:contact@greatfrontend.com',
    icon: EnvelopeIcon,
    key: 'email',
    name: 'Email',
  },
  {
    href: 'https://github.com/greatfrontend/greatfrontend/discussions',
    icon: GitHubIcon,
    key: 'github',
    name: 'GitHub',
  },
  //   {
  //     href: '/',
  //     icon: TelegramIcon,
  //     key: 'telegram',
  //     name: 'Telegram',
  //   },
  {
    href: 'https://twitter.com/greatfrontend',
    icon: TwitterIcon,
    key: 'twitter',
    name: 'Twitter',
  },
  //   {
  //     href: '/',
  //     icon: DiscordIcon,
  //     key: 'discord',
  //     name: 'Discord',
  //   },
  {
    href: 'https://www.reddit.com/r/greatfrontend',
    icon: RedditIcon,
    key: 'reddit',
    name: 'Reddit',
  },
];

export default platforms;
