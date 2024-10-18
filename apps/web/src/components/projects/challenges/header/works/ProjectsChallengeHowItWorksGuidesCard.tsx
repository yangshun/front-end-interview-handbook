import { SidebarLinksList_DEPRECATED } from '~/components/global/sidebar/SidebarLinksList_DEPRECATED';
import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';

export default function ProjectsChallengeHowItWorksGuidesCard() {
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
    <ProjectsChallengeHowItWorksCard>
      <div
        style={{
          transform: 'scale(0.8) translate(-35px, -90px)',
        }}>
        <SidebarLinksList_DEPRECATED
          activeItem="figma"
          className="!w-[260px]"
          navigation={links}
        />
      </div>
    </ProjectsChallengeHowItWorksCard>
  );
}
