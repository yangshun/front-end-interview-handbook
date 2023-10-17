import React from 'react';

import Anchor from '~/components/ui/Anchor';

type Author = Readonly<{
  bio: React.ReactNode;
  companyIconUrl?: string;
  gitHubUrl?: string;
  imageUrl: string;
  linkedInUrl?: string;
  name: string;
  profileUrl: string;
  role: string;
  subtitle?: string;
  twitterUrl?: string;
  websiteUrl?: string;
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
    linkedInUrl: 'https://www.linkedin.com/in/dhillons/',
    name: 'Sunny Dhillon',
    profileUrl: 'https://www.linkedin.com/in/dhillons/',
    role: 'Senior Staff Software Engineer, Google',
    subtitle: 'Senior Staff Engineer, Google',
  },
  'michalgrzegorczyk-dev': {
    bio: (
      <>
        Lead Frontend Software Engineer at Ofair with over 6 years of experience
        in Angular and its ecosystem. Deeply passionate about freelancing and
        actively seeking opportunities for side projects.
      </>
    ),
    imageUrl: '/img/team/michal.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/michalgrzegorczyk-dev/',
    name: 'Michal Grzegorczyk',
    profileUrl: 'https://www.linkedin.com/in/michalgrzegorczyk-dev/',
    role: 'Senior Front End Engineer, Ofair',
    subtitle: 'Senior Front End Engineer, Ofair',
  },
  tanhauhau: {
    bio: <>TODO</>,
    imageUrl: '/img/team/lihau.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/lihautan/',
    name: 'Tan Li Hau',
    profileUrl: 'https://lihautan.com/',
    role: 'Team lead @ Shopee, Svelte core team',
    subtitle: 'Svelte core team',
  },
  'utpal-d4l': {
    bio: <>TODO</>,
    imageUrl: '/img/team/utpal.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/utpalsingh/',
    name: 'Utpal Singh',
    profileUrl: 'https://www.linkedin.com/in/utpalsingh/',
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
    gitHubUrl: 'https://www.github.com/yangshun',
    imageUrl: '/img/team/yangshun.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/yangshun',
    name: 'Yangshun Tay',
    profileUrl: 'https://www.github.com/yangshun',
    role: 'Staff Front End Engineer, ex-Meta',
    subtitle: 'Ex-Meta Staff Engineer',
    twitterUrl: 'https://www.twitter.com/yangshunz',
  },
  zhenghao: {
    bio: (
      <>
        Zhenghao is a Senior Software Engineer at DocuSign and was previously
        from Instacart and Amazon. He has developed multiple modern large-scale
        web apps and writes about software development and web technologies on{' '}
        <Anchor href="https://www.zhenghao.io/">zhenghao.io</Anchor>.
      </>
    ),
    companyIconUrl: '/img/marketing/amazon-icon.svg',
    imageUrl: '/img/team/zhenghao.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/zhenghao-he/',
    name: 'Zhenghao He',
    profileUrl: 'https://www.zhenghao.io',
    role: 'Senior Software Engineer, ex-Amazon, ex-Instacart',
    subtitle: 'Senior Engineer, Ex-Amazon',
    twitterUrl: 'https://twitter.com/he_zhenghao',
  },
};

export default authors;
