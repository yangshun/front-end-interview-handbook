import { useIntl } from '~/components/intl';

export default function useProjectsDeploymentInfo() {
  const intl = useIntl();

  const title = intl.formatMessage({
    defaultMessage: 'Deploying your project',
    description: 'Title for Deployment Info in Projects',
    id: '//v4RL',
  });

  const preRecommendedHostsText = intl.formatMessage({
    defaultMessage:
      'As mentioned above, there are many ways to host your project for free. Our recommend hosts are:',
    description: 'Text for Deployment Info in Projects',
    id: 'YBlo/J',
  });

  const postRecommendedHostsText = intl.formatMessage({
    defaultMessage:
      'You can host your site using one of these solutions or any of our other trusted providers. Read more about our recommended and trusted hosts',
    description: 'Text for Deployment Info in Projects',
    id: '/ALUvk',
  });

  const recommendedHosts = [
    {
      content: intl.formatMessage({
        defaultMessage: 'GitHub Pages',
        description: 'Label for "GitHub Pages" option in Deployment Info',
        id: 'qBIBPw',
      }),
      href: 'https://pages.github.com/',
      id: 'github-pages',
    },
    {
      content: intl.formatMessage({
        defaultMessage: 'Vercel',
        description: 'Label for "Vercel" option in Deployment Info',
        id: '1q1I7J',
      }),
      href: 'https://vercel.com/',
      id: 'vercel',
    },
    {
      content: intl.formatMessage({
        defaultMessage: 'Netlify',
        description: 'Label for "Netlify" option in Deployment Info',
        id: '73S/pd',
      }),
      href: 'https://www.netlify.com/',
      id: 'netlify',
    },
  ];

  return {
    postRecommendedHostsText,
    preRecommendedHostsText,
    recommendedHosts,
    title,
  };
}
