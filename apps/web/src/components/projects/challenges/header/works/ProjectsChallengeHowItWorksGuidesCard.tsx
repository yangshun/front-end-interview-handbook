import { SidebarLinksList } from '~/components/common/SidebarLinksList';
import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';

export default function ProjectsChallengeHowItWorksGuidesCard() {
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
    <ProjectsChallengeHowItWorksCard>
      <div
        style={{
          transform: 'scale(0.8) translate(-35px, -90px)',
        }}>
        <SidebarLinksList
          activeItem="figma"
          className="!w-[260px]"
          navigation={links}
        />
      </div>
    </ProjectsChallengeHowItWorksCard>
  );
}
