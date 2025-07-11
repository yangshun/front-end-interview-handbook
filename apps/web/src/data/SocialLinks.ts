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
    userCount: 2_204,
  },
  discordPremium: {
    href: 'https://discord.gg/8suTg77xXz',
    icon: RiDiscordFill,
    key: 'discord-premium',
    name: 'Discord (Premium)',
    userCount: 7_677,
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
    userCount: 58_308,
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
    userCount: 7_322,
  },
};
