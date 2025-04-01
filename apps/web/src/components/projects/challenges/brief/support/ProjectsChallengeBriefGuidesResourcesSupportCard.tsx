'use client';

import { SidebarLinksList_DEPRECATED } from '~/components/global/sidebar/SidebarLinksList_DEPRECATED';
import { useIntl } from '~/components/intl';
import ProjectsChallengeBriefSupportCard from '~/components/projects/challenges/brief/support/ProjectsChallengeBriefSupportCard';

function useLinks() {
  const intl = useIntl();

  return [
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
}

export default function ProjectsChallengeBriefGuidesResourcesSupportCard() {
  const links = useLinks();

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
