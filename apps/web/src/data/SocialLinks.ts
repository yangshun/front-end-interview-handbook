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

export type SocialLinkMetadata = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  name: string;
  userCount: number | null;
}>;

export const SocialLinks: Record<SocialLinkPlatform, SocialLinkMetadata> = {
  discord: {
    href: 'https://discord.gg/NDFx8f6P6B',
    icon: RiDiscordFill,
    key: 'discord',
    name: 'Discord',
    userCount: 1_962,
  },
  discordPremium: {
    href: 'https://discord.gg/8suTg77xXz',
    icon: RiDiscordFill,
    key: 'discord-premium',
    name: 'Discord (Premium)',
    userCount: 6_850,
  },
  github: {
    href: 'https://www.github.com/greatfrontend',
    icon: RiGithubFill,
    key: 'github',
    name: 'GitHub',
    userCount: 6_723,
  },
  linkedin: {
    href: 'https://www.linkedin.com/company/greatfrontend',
    icon: RiLinkedinBoxFill,
    key: 'linkedin',
    name: 'LinkedIn',
    userCount: 49_023,
  },
  reddit: {
    href: 'https://reddit.com/r/greatfrontend',
    icon: RiRedditFill,
    key: 'reddit',
    name: 'Reddit',
    userCount: null,
  },
  x: {
    href: 'https://x.com/greatfrontend',
    icon: RiTwitterXFill,
    key: 'x',
    name: 'Twitter / X',
    userCount: 6_482,
  },
};
