import { SidebarLinksList_DEPRECATED } from '~/components/global/sidebar/SidebarLinksList_DEPRECATED';
import ProjectsChallengeBriefSupportCard from '~/components/projects/challenges/brief/support/ProjectsChallengeBriefSupportCard';

export default function ProjectsChallengeBriefGuidesResourcesSupportCard() {
  const links = [
    {
      items: [
        {
          label: 'How to use Figma for development',
          slug: 'figma',
        },
        {
          label: 'How to use DevTools for developments',
          slug: 'github',
        },
        {
          label: 'Connecting to various Cloud services',
          slug: 'cloud',
        },
      ],
      label: 'Official guides',
    },
  ];

  return (
    <ProjectsChallengeBriefSupportCard>
      <SidebarLinksList_DEPRECATED
        activeItem="figma"
        className="md:w-[260px]"
        navigation={links}
      />
    </ProjectsChallengeBriefSupportCard>
  );
}
