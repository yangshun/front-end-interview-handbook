import {
  RiDiscordFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiRedditFill,
  RiTwitterFill,
} from 'react-icons/ri';

type SocialLinkPlatform =
  | 'discord'
  | 'discordPremium'
  | 'github'
  | 'linkedin'
  | 'reddit'
  | 'twitter';

export const SocialLinks: Record<
  SocialLinkPlatform,
  Readonly<{
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    key: string;
    name: string;
    userCount: number | null;
  }>
> = {
  discord: {
    href: 'https://discord.gg/NDFx8f6P6B',
    icon: RiDiscordFill,
    key: 'discord',
    name: 'Discord',
    userCount: 725,
  },
  discordPremium: {
    href: 'https://discord.gg/8suTg77xXz',
    icon: RiDiscordFill,
    key: 'discord-premium',
    name: 'Discord',
    userCount: 3181,
  },
  github: {
    href: 'https://www.github.com/greatfrontend',
    icon: RiGithubFill,
    key: 'github',
    name: 'GitHub',
    userCount: 2101,
  },
  linkedin: {
    href: 'https://www.linkedin.com/company/greatfrontend',
    icon: RiLinkedinBoxFill,
    key: 'linkedin',
    name: 'LinkedIn',
    userCount: 15649,
  },
  reddit: {
    href: 'https://reddit.com/r/greatfrontend',
    icon: RiRedditFill,
    key: 'reddit',
    name: 'Reddit',
    userCount: null,
  },
  twitter: {
    href: 'https://www.twitter.com/greatfrontend',
    icon: RiTwitterFill,
    key: 'twitter',
    name: 'Twitter',
    userCount: 2091,
  },
};
