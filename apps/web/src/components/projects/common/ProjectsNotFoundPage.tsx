'use client';

import { RiStarSmileFill } from 'react-icons/ri';

import useProjectsNavItems from '~/components/projects/common/layout/useProjectsNavItems';

import NotFoundPage from '../../global/error/NotFoundPage';

export default function ProjectsNotFoundPage() {
  const projectsNavItems = useProjectsNavItems('nav');
  const links = [
    {
      description:
        'Start building any project you can dream of to train your front end.',
      href: projectsNavItems.challenges.href!,
      icon: projectsNavItems.challenges.icon!,
      title: projectsNavItems.challenges.label,
    },
    {
      description: 'Browse project solutions from our community.',
      href: projectsNavItems.submissions.href!,
      icon: projectsNavItems.submissions.icon!,
      title: projectsNavItems.submissions.label,
    },
    {
      description:
        'Join the Premium club and get access to project challenges Figma designs and guides.',
      href: projectsNavItems.pricing.href!,
      icon: RiStarSmileFill,
      title: 'Projects Premium',
    },
  ];

  return <NotFoundPage links={links} returnHref="/projects" />;
}
