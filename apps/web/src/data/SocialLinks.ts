import {
  RiDiscordFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiRedditFill,
  RiTwitterFill,
} from 'react-icons/ri';

type SocialLinkPlatform =
  | 'discord'
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
  }>
> = {
  discord: {
    href: 'https://discord.gg/NDFx8f6P6B',
    icon: RiDiscordFill,
    key: 'discord',
    name: 'Discord',
  },
  github: {
    href: 'https://www.github.com/greatfrontend',
    icon: RiGithubFill,
    key: 'github',
    name: 'GitHub',
  },
  linkedin: {
    href: 'https://www.linkedin.com/company/greatfrontend',
    icon: RiLinkedinBoxFill,
    key: 'linkedin',
    name: 'LinkedIn',
  },
  reddit: {
    href: 'https://reddit.com/r/greatfrontend',
    icon: RiRedditFill,
    key: 'reddit',
    name: 'Reddit',
  },
  twitter: {
    href: 'https://www.twitter.com/greatfrontend',
    icon: RiTwitterFill,
    key: 'twitter',
    name: 'Twitter',
  },
};
