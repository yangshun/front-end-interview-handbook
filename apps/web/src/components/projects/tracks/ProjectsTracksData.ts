type ProjectsTrackProject = Readonly<{
  href: string;
  slug: string;
  title: string;
}>;

export type ProjectsTrack = Readonly<{
  completedProjectCount: number;
  description: string;
  href: string;
  isPremium: boolean;
  projects: ReadonlyArray<ProjectsTrackProject>;
  repCount: number;
  slug: string;
  title: string;
  totalProjectCount: number;
}>;

export const projectTracks: Array<ProjectsTrack> = [
  {
    completedProjectCount: 3,
    description: 'Learn how to build a whole design system from scratch',
    href: '/projects/tracks/design-system',
    isPremium: false,
    projects: [
      {
        href: '/projects/p/button',
        slug: 'button',
        title: 'Button',
      },
      {
        href: '/projects/p/text-input',
        slug: 'text-input',
        title: 'Text Input',
      },
      {
        href: '/projects/p/alert',
        slug: 'alert',
        title: 'Alert',
      },
    ],
    repCount: 1000,
    slug: 'design-system',
    title: 'Design system track',
    totalProjectCount: 11,
  },
  {
    completedProjectCount: 3,
    description: 'Learn how to build a portfolio to showcase yourself',
    href: '/projects/tracks/portfolio',
    isPremium: true,
    projects: [
      {
        href: '/projects/p/homepage',
        slug: 'homepage',
        title: 'Homepage',
      },
      {
        href: '/projects/p/blog-section',
        slug: 'blog-section',
        title: 'Blog section',
      },
      {
        href: '/projects/p/article-section',
        slug: 'article-section',
        title: 'Article section',
      },
    ],
    repCount: 1000,
    slug: 'portfolio',
    title: 'Portfolio track',
    totalProjectCount: 11,
  },
  {
    completedProjectCount: 3,
    description: 'Learn how to build marketing pages',
    href: '/projects/tracks/marketing',
    isPremium: true,
    projects: [
      {
        href: '/projects/p/newsletter-section',
        slug: 'newsletter-section',
        title: 'Newsletter section',
      },
      {
        href: '/projects/p/contact-section',
        slug: 'contact-section',
        title: 'Contact section',
      },
      {
        href: '/projects/p/feedback-section',
        slug: 'feedback-section',
        title: 'Feedback section',
      },
    ],
    repCount: 1000,
    slug: 'marketing',
    title: 'Marketing track',
    totalProjectCount: 11,
  },
  {
    completedProjectCount: 3,
    description: 'Learn how to build e-commerce pages',
    href: '/projects/tracks/e-commerce',
    isPremium: true,
    projects: [
      {
        href: '/projects/p/pricing-section',
        slug: 'pricing-section',
        title: 'Pricing section',
      },
      {
        href: '/projects/p/cart-section',
        slug: 'cart-section',
        title: 'Cart section',
      },
      {
        href: '/projects/p/checkout-section',
        slug: 'checkout-section',
        title: 'Checkout section',
      },
    ],
    repCount: 1000,
    slug: 'e-commerce',
    title: 'E-commerce track',
    totalProjectCount: 11,
  },
];

// TODO(projects): Remove when launch.
export const hiddenTracks: Array<ProjectsTrack> = [
  {
    completedProjectCount: 3,
    description: 'Learn how to build a whole design system from scratch',
    href: '/projects/tracks/design-system',
    isPremium: false,
    projects: [
      {
        href: '/projects/p/button',
        slug: 'button',
        title: 'Button',
      },
      {
        href: '/projects/p/text-input',
        slug: 'text-input',
        title: 'Button',
      },
      {
        href: '/projects/p/alert',
        slug: 'alert',
        title: 'Alert',
      },
    ],
    repCount: 1000,
    slug: 'design-system',
    title: 'Design system track',
    totalProjectCount: 11,
  },
];
