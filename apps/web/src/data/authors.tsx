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
  'sunny-dhillon': {
    bio: (
      <>
        Sunny is a Senior Staff Software Engineer at Google and has over a
        decade of experience managing teams on Google Search, Gmail, Google
        Chat, Google Maps, and more. He joined Google in 2011 when his startup
        TalkBin (YC W11), was acquired.
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
    imageUrl: 'https://github.com/yangshun.png',
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
        from Instacart and Amazon. He has a track record of being developing
        multiple modern large-scale web apps and writes about software
        development and web technologies on{' '}
        <Anchor href="https://www.zhenghao.io/">zhenghao.io</Anchor>.
      </>
    ),
    companyIconUrl: '/img/marketing/amazon-icon.svg',
    imageUrl: '/img/team/zhenghao.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/zhenghao-he-720510117/',
    name: 'Zhenghao He',
    profileUrl: 'https://www.zhenghao.io',
    role: 'Senior Software Engineer, ex-Amazon, ex-Instacart',
    subtitle: 'Senior Engineer, Ex-Amazon',
    twitterUrl: 'https://twitter.com/he_zhenghao',
  },
};

export default authors;
