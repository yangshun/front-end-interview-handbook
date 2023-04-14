import React from 'react';

import Anchor from '~/components/ui/Anchor';

type Author = Readonly<{
  bio: React.ReactNode;
  imageUrl: string;
  name: string;
  profileUrl: string;
  role: string;
  subtitle?: string;
  twitterUrl?: string;
  websiteUrl?: string;
}>;

const authors: Record<string, Author> = {
  'sunny-dhillon': {
    bio: <>TODO</>,
    imageUrl: '/img/team/sunny.jpg',
    name: 'Sunny Dhillon',
    profileUrl: 'https://www.linkedin.com/in/dhillons/',
    role: 'Senior Staff Software Engineer, Google',
    subtitle: 'Senior Staff Engineer, Google',
  },
  yangshun: {
    bio: (
      <>
        Yangshun was previously a Staff Front End Engineer at Meta. He also
        created Blind 75, Tech Interview Handbook, and Docusaurus 2. He hangs
        out mostly on{' '}
        <Anchor href="https://www.github.com/yangshun">GitHub</Anchor>.
      </>
    ),
    imageUrl: 'https://github.com/yangshun.png',
    name: 'Yangshun Tay',
    profileUrl: 'https://www.github.com/yangshun',
    role: 'Staff Software Engineer, ex-Meta, Grab',
    subtitle: 'Ex-Meta Staff Engineer',
  },
  zhenghao: {
    bio: (
      <>
        Zhenghao has a track record of being able to develop large-scale web
        apps with modern web tech stack. He writes about software development
        and web technologies on{' '}
        <Anchor href="https://www.zhenghao.io/">zhenghao.io</Anchor>.
      </>
    ),
    imageUrl: '/img/team/zhenghao.jpg',
    name: 'Zhenghao He',
    profileUrl: 'https://www.zhenghao.io',
    role: 'Senior Software Engineer, ex-Amazon, ex-Instacart',
    subtitle: 'Senior Engineer, Ex-Amazon',
  },
};

export default authors;
