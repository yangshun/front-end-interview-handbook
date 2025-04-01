'use client';

import { RiStarSmileFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import useProjectsNavItems from '~/components/projects/common/layout/useProjectsNavItems';

import NotFoundPage from '../../global/error/NotFoundPage';

export default function ProjectsNotFoundPage() {
  const intl = useIntl();
  const projectsNavItems = useProjectsNavItems('nav');
  const links = [
    {
      description: intl.formatMessage({
        defaultMessage:
          'Start building any project you can dream of to train your front end.',
        description: 'Projects challenge description',
        id: 'FhsVf8',
      }),
      href: projectsNavItems.challenges.href!,
      icon: projectsNavItems.challenges.icon!,
      title: projectsNavItems.challenges.label,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Browse project solutions from our community.',
        description: 'Projects solutions description',
        id: 'MdIpF6',
      }),
      href: projectsNavItems.submissions.href!,
      icon: projectsNavItems.submissions.icon!,
      title: projectsNavItems.submissions.label,
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Join the Premium club and get access to project challenges Figma designs and guides.',
        description: 'Projects Premium description',
        id: 'hyxFHs',
      }),
      href: projectsNavItems.pricing.href!,
      icon: RiStarSmileFill,
      title: intl.formatMessage({
        defaultMessage: 'Projects Premium',
        description: 'Projects Premium label',
        id: 'e30UXy',
      }),
    },
  ];

  return <NotFoundPage links={links} returnHref="/projects" />;
}
