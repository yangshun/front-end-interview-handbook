import React from 'react';

import Anchor from '~/components/ui/Anchor';

type Author = Readonly<{
  bio: React.ReactNode;
  companyIconUrl?: string;
  imageUrl: string;
  links: {
    github?: string;
    linkedin: string;
    website?: string;
    x?: string;
    youtube?: string;
  };
  name: string;
  role: string;
  subtitle?: string;
}>;

const authors: Record<string, Author> = {
  dhillon: {
    bio: (
      <>
        Sunny is a Senior Staff Software Engineer at Google and has over a
        decade of experience managing teams on Google Search, Gmail, Google
        Chat, Google Maps, and more. He joined Google in 2011 when they acquired
        his startup, TalkBin (YC W11).
      </>
    ),
    companyIconUrl: '/img/marketing/google-g-icon.svg',
    imageUrl: '/img/team/sunny.jpg',
    links: {
      linkedin: 'https://www.linkedin.com/in/dhillons/',
    },
    name: 'Sunny Dhillon',
    role: 'Senior Staff Software Engineer, Google',
    subtitle: 'Senior Staff Engineer, Google',
  },
  'michalgrzegorczyk-dev': {
    bio: (
      <>
        Michal is a lead Frontend Software Engineer at Ofair with over 6 years
        of experience in Angular and its ecosystem. Deeply passionate about
        teaching Angular via code exercises and high quality solutions.
      </>
    ),
    imageUrl: '/img/team/michal.jpg',
    links: {
      github: 'https://www.github.com/michalgrzegorczyk-dev',
      linkedin: 'https://www.linkedin.com/in/michalgrzegorczyk-dev/',
    },
    name: 'Michal Grzegorczyk',
    role: 'Senior Front End Engineer, Ofair',
    subtitle: 'Senior Front End Engineer, Ofair',
  },
  tanhauhau: {
    bio: (
      <>
        Li Hau is a Svelte Core Maintainer and shipped many features for Svelte
        3. At Shopee, he leads the web frontend platform team. He also loves
        sharing and making educational content on his YouTube channel.
      </>
    ),
    companyIconUrl: '/img/company-logos/svelte-logomark.svg',
    imageUrl: '/img/team/lihau.jpg',
    links: {
      github: 'https://github.com/tanhauhau',
      linkedin: 'https://www.linkedin.com/in/lihautan/',
      website: 'https://lihautan.com/',
      x: 'https://x.com/lihautan',
      youtube: 'https://www.youtube.com/@lihautan',
    },
    name: 'Tan Li Hau',
    role: 'Team lead @ Shopee, Svelte core team',
    subtitle: 'Svelte core team',
  },
  'utpal-d4l': {
    bio: (
      <>
        Utpal is well-versed in React and React Native and an experienced
        interviewer.
      </>
    ),
    companyIconUrl: '/img/company-logos/rattle-logo.webp',
    imageUrl: '/img/team/utpal.jpg',
    links: {
      linkedin: 'https://www.linkedin.com/in/utpalsingh/',
    },
    name: 'Utpal Singh',
    role: 'Frontend @ Rattle',
    subtitle: 'Frontend @ Rattle',
  },
  yangshun: {
    bio: (
      <>
        Yangshun is an ex-Meta Staff Front End Engineer and the author of "Blind
        75" and "Front End Interview Handbook". At Meta, he created Docusaurus 2
        and led engineering teams to build www.meta.com and www.oculus.com.
      </>
    ),
    companyIconUrl: '/img/marketing/meta-icon.svg',
    imageUrl: '/img/team/yangshun.jpg',
    links: {
      github: 'https://www.github.com/yangshun',
      linkedin: 'https://www.linkedin.com/in/yangshun',
      website: 'https://yangshuntay.com',
      x: 'https://www.x.com/yangshunz',
    },
    name: 'Yangshun Tay',
    role: 'Staff Front End Engineer, ex-Meta',
    subtitle: 'Ex-Meta Staff Engineer',
  },
  zhenghao: {
    bio: (
      <>
        Zhenghao is an Engineering Manager at Robinhood and was previously from
        Instacart and Amazon. He has developed multiple modern large-scale web
        apps and writes about software development and web technologies on{' '}
        <Anchor href="https://www.zhenghao.io/">zhenghao.io</Anchor>.
      </>
    ),
    companyIconUrl: '/img/marketing/amazon-icon.svg',
    imageUrl: '/img/team/zhenghao.jpg',
    links: {
      linkedin: 'https://www.zhenghao.io/',
      website: 'https://www.zhenghao.io',
      x: 'https://x.com/he_zhenghao',
    },
    name: 'Zhenghao He',
    role: 'Engineering Manager, Robinhood, ex-Amazon',
    subtitle: 'Engineering Manager, Robinhood',
  },
} as const;

export default authors;
