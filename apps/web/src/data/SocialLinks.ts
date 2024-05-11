import {
  RiDiscordFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiRedditFill,
  RiTwitterXFill,
} from 'react-icons/ri';

type SocialLinkPlatform =
  | 'discord'
  | 'discordPremium'
  | 'github'
  | 'linkedin'
  | 'reddit'
  | 'x';

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
    userCount: 737,
  },
  discordPremium: {
    href: 'https://discord.gg/8suTg77xXz',
    icon: RiDiscordFill,
    key: 'discord-premium',
    name: 'Discord',
    userCount: 3_259,
  },
  github: {
    href: 'https://www.github.com/greatfrontend',
    icon: RiGithubFill,
    key: 'github',
    name: 'GitHub',
    userCount: 2201,
  },
  linkedin: {
    href: 'https://www.linkedin.com/company/greatfrontend',
    icon: RiLinkedinBoxFill,
    key: 'linkedin',
    name: 'LinkedIn',
    userCount: 16_021,
  },
  reddit: {
    href: 'https://reddit.com/r/greatfrontend',
    icon: RiRedditFill,
    key: 'reddit',
    name: 'Reddit',
    userCount: null,
  },
  x: {
    href: 'https://www.twitter.com/greatfrontend',
    icon: RiTwitterXFill,
    key: 'x',
    name: 'X',
    userCount: 2_175,
  },
};
