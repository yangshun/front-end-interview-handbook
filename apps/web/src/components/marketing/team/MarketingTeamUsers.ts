export type TeamCategory = 'alumni' | 'community' | 'expert' | 'team';
export type TeamUser = Readonly<{
  category: TeamCategory;
  companyLogos: ReadonlyArray<string>;
  description: string;
  href: string;
  image: string;
  name: string;
  roundedCompanyLogo?: boolean;
  title: string;
}>;

export const teamUsers: ReadonlyArray<TeamUser> = [
  {
    category: 'team',
    companyLogos: ['/img/company-logos/meta-logomark.png'],
    description:
      'Yangshun is the author of "Blind 75" and "Front End Interview Handbook". At Meta, he created Docusaurus 2 and led engineering teams to build www.meta.com and www.oculus.com.',
    href: 'https://www.linkedin.com/in/yangshun',
    image: '/img/team/yangshun-team.jpg',
    name: 'Yangshun Tay',
    title: 'Ex-Meta Staff Engineer. Creator of Blind 75',
  },
  {
    category: 'team',
    companyLogos: [
      '/img/company-logos/svelte-logomark.svg',
      '/img/company-logos/shopee-logo.svg',
    ],
    description:
      'Li Hau is a Svelte Core Maintainer and shipped many features for Svelte 3. At Shopee, he leads the web frontend platform team. He also loves sharing and making educational content on his YouTube channel.',
    href: 'https://www.youtube.com/c/lihautan',
    image: '/img/team/lihau-team.jpg',
    name: 'Tan Li Hau',
    title: 'Svelte Core Maintainer. Team Lead @ Shopee',
  },
  {
    category: 'team',
    companyLogos: [],
    description:
      'Michal is a Lead Frontend Software Engineer at Ofair with over 6 years of experience in Angular and its ecosystem. Experienced freelancer with a passion for teaching programming.',
    href: 'https://www.linkedin.com/in/michalgrzegorczyk-dev/',
    image: '/img/team/michal.jpg',
    name: 'Michal Grzegorczyk',
    title: 'Senior Front End Engineer @ Ofair',
  },
  {
    category: 'expert',
    companyLogos: ['/img/company-logos/google-logomark.svg'],
    description:
      'Sunny is a Senior Staff Software Engineer at Google with over a decade of experience managing teams on Google Search, Gmail, Google Chat, Google Maps, and more. He joined Google in 2011 when they acquired his startup, TalkBin (YC W11).',
    href: 'https://www.linkedin.com/in/dhillons/',
    image: '/img/team/sunny-team.jpg',
    name: 'Sunny Dhillon',
    title: 'Senior Staff Software Engineer @ Google',
  },
  {
    category: 'team',
    companyLogos: [
      '/img/company-logos/robinhood-logomark.svg',
      '/img/company-logos/amazon-logomark.svg',
    ],
    description:
      'Zhenghao is an Engineering Manager at Robinhood who was previously from Docusign, Instacart, and Amazon. He has developed multiple modern large-scale web apps and writes about software development and web technologies on zhenghao.io',
    href: 'https://www.zhenghao.io/',
    image: '/img/team/zhenghao.jpg',
    name: 'Zhenghao He',
    title: 'Engineering Manager @ Robinhood. Ex-Amazon',
  },
  {
    category: 'team',
    companyLogos: [
      '/img/company-logos/shopify-logomark.svg',
      '/img/company-logos/axon-logomark.jpg',
    ],
    description:
      'Nam is a Senior Software Engineer at Shopify, making commerce better for everyone. Previously, he was part of Axon\'s "Write Code. Save Lives" mission to build large-scale products that improve law enforcement globally.',
    href: 'https://namnguyen.design/about',
    image: '/img/team/nam.jpg',
    name: 'Nam Nguyen',
    title: 'Senior Software Engineer @ Shopify',
  },
  {
    category: 'expert',
    companyLogos: [
      '/img/company-logos/supabase-logomark.png',
      '/img/company-logos/google-logomark.svg',
    ],
    description:
      'Beng is a software engineer who is well-versed in databases and distributed systems. Previously Ad Speed tech lead at Google.',
    href: 'https://www.linkedin.com/in/thebengeu/',
    image: '/img/team/beng.jpg',
    name: 'Beng Eu',
    title: 'Software Engineer @ Supabase. Ex-Google',
  },
  {
    category: 'expert',
    companyLogos: ['/img/company-logos/docusaurus-logo.svg'],
    description:
      'Sébastien is a React early adopter, creator of the This Week In React newsletter, and maintains the Docusaurus project for Meta.',
    href: 'https://thisweekinreact.com/?utm_source=greatfrontend',
    image: '/img/team/sebastien-lorber.jpg',
    name: 'Sébastien Lorber',
    title: 'Creator of This Week In React, Docusaurus maintainer',
  },
  {
    category: 'expert',
    companyLogos: [
      '/img/company-logos/snap-logomark.svg',
      '/img/company-logos/apple-logomark.svg',
    ],
    description:
      'Quan Yang is an Application Security Tech Lead at Snap with over 6 years of experience in application security, with extra passion for vulnerability scanning, vulnerability management and web security.',
    href: 'https://www.linkedin.com/in/quanyang/',
    image: '/img/team/quanyang.jpg',
    name: 'Quan Yang Yeo',
    title: 'AppSec Tech Lead @ Snap. Ex-Apple',
  },
  {
    category: 'expert',
    companyLogos: ['/img/company-logos/flexport-logomark.png'],
    description:
      'Kevin is a software engineer who enjoys the front end ecosystem. At Flexport, he led several big refactors to modernize the front end tech stack.',
    href: 'https://www.linkedin.com/in/gonzalezkev/',
    image: '/img/team/kevin-gonzalez.jpg',
    name: 'Kevin Gonzalez',
    title: 'Software Engineer @ Flexport',
  },
  {
    category: 'expert',
    companyLogos: ['/img/company-logos/rattle-logo.webp'],
    description:
      'Utpal is well-versed in React and React Native and an experienced interviewer.',
    href: 'https://www.linkedin.com/in/utpalsingh/',
    image: '/img/team/utpal.jpg',
    name: 'Utpal Singh',
    roundedCompanyLogo: true,
    title: 'Front End Engineer @ Rattle',
  },
  {
    category: 'community',
    companyLogos: [],
    description:
      "Luke's tenure as a software engineer narrates a tale of technical expertise intertwined with a keen enjoyment of sharing knowledge. Transitioning through various roles and projects, the space for sharing technical wisdom always finds a place.",
    href: 'https://www.linkedin.com/in/lukefiji/',
    image: '/img/team/luke-fiji.jpg',
    name: 'Luke Fiji',
    title: 'Front End Software Engineer, ex-Dapper Labs',
  },
  {
    category: 'team',
    companyLogos: ['/img/company-logos/tiktok-logomark.svg'],
    description:
      'Jeff is passionate about creating delightful user experiences and well-engineered software primarily using React and Flutter. He showcases his projects and other creations at jeffsieu.com',
    href: 'https://jeffsieu.com',
    image: '/img/team/jeff-sieu-yong.jpg',
    name: 'Jeff Sieu',
    title: 'Front End Engineering Intern @ TikTok',
  },
  {
    category: 'alumni',
    companyLogos: ['/img/company-logos/palantir-logomark.svg'],
    description:
      'Ai Ling is a full stack software engineer who is passionate about solving tough engineering challenges. Built the Tech Offers Repo',
    href: 'https://www.linkedin.com/in/ai-ling-hong/',
    image: '/img/team/hong-ai-ling.jpg',
    name: 'Hong Ai Ling',
    title: 'Software Engineering Intern @ Palantir',
  },
  {
    category: 'alumni',
    companyLogos: ['/img/company-logos/tiktok-logomark.svg'],
    description:
      'Ziqing is a software engineer who loves hackathons and supports diversity in tech industries. She received the prestigious Generation Google Scholar Award in 2022.',
    href: 'https://www.linkedin.com/in/ziqingzhang26/',
    image: '/img/team/zhang-ziqing.jpg',
    name: 'Zhang Ziqing',
    title: 'Front End Engineering Intern @ TikTok',
  },
  {
    category: 'team',
    companyLogos: [],
    description:
      'Feilin is a software engineering intern who is into competitive programming and promoting tech education & literacy amongst youths. She is also a Google Cloud Certified Professional ML Engineer.',
    href: 'https://www.linkedin.com/in/feilin-liangga-putri/',
    image: '/img/team/feilin.jpg',
    name: 'Feilin Liangga Putri',
    title: 'Software Engineering Intern',
  },
];
