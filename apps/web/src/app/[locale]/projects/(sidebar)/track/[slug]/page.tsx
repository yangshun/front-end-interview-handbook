import type { ProjectsTrack } from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordionItem';

import ProjectsTrackPage from './ProjectsTrackPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

const exampleTrack: ProjectsTrack = {
  completedProjectCount: 3,
  description: 'Learn how to build a whole design system from scratch',
  isPremium: false,
  key: 'design-system',
  projects: [
    {
      key: 'button',
      title: 'Button',
    },
    {
      key: 'text-input',
      title: 'Text Input',
    },
    {
      key: 'alert',
      title: 'Alert',
    },
  ],
  repCount: 1000,
  title: 'Design system track',
  totalProjectCount: 11,
};

export default function Page({ params }: Props) {
  const { slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');

  // TODO(projects): Get track information from backend

  return <ProjectsTrackPage track={exampleTrack} />;
}
