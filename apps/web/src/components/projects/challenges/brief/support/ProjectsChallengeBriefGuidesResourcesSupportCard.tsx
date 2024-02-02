import { SidebarLinksList } from '~/components/common/SidebarLinksList';
import ProjectsChallengeBriefSupportCard from '~/components/projects/challenges/brief/support/ProjectsChallengeBriefSupportCard';

export default function ProjectsChallengeBriefGuidesResourcesSupportCard() {
  const links = [
    {
      items: [
        {
          slug: 'figma',
          title: 'How to use Figma for development',
        },
        {
          slug: 'github',
          title: 'How to use DevTools for developments',
        },
        {
          slug: 'cloud',
          title: 'Connecting to various Cloud services',
        },
      ],
      title: 'Official guides',
    },
  ];

  return (
    <ProjectsChallengeBriefSupportCard>
      <SidebarLinksList
        activeItem="figma"
        className="!w-[260px]"
        navigation={links}
      />
    </ProjectsChallengeBriefSupportCard>
  );
}
