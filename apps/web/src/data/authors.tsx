import React from 'react';

import Anchor from '~/components/ui/Anchor';

type Author = Readonly<{
  bio: React.ReactNode;
  imageUrl: string;
  name: string;
  role: string;
  twitterUrl?: string;
  websiteUrl?: string;
}>;

const authors: Record<string, Author> = {
  brianlee: {
    bio: (
      <>
        Experienced engineer with a passion for building great products. Writes
        code to paint rectangles on your screen. Was terrible at CSS, now decent
        with it, but still thinks CSS is a horribly-designed language.
      </>
    ),
    imageUrl: '/img/team/brian.jpg',
    name: 'Brian Lee',
    role: 'Senior Front End Engineer, ex-Google',
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
    role: 'Senior Software Engineer at Instacart, ex-Amazon',
  },
};

export default authors;
