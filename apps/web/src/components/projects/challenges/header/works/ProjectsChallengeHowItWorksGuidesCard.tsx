'use client';

import { SidebarLinksList_DEPRECATED } from '~/components/global/sidebar/SidebarLinksList_DEPRECATED';
import { useIntl } from '~/components/intl';
import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';

export default function ProjectsChallengeHowItWorksGuidesCard() {
  const intl = useIntl();
  const links = [
    {
      items: [
        {
          label: intl.formatMessage({
            defaultMessage: 'How to use Figma for development',
            description: 'Figma guide link',
            id: 'XCmhpD',
          }),
          slug: 'figma',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'How to use DevTools for developments',
            description: 'DevTools guide link',
            id: 'gDATT/',
          }),
          slug: 'github',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Connecting to various Cloud services',
            description: 'Cloud services guide link',
            id: 'n4RUhu',
          }),
          slug: 'cloud',
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Official guides',
        description: 'Official guides label',
        id: 'hV0vxY',
      }),
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
