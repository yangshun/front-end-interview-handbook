import type { ProjectsChallengeGuide } from 'contentlayer/generated';
import { useRef, useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ArticlePagination from '~/components/common/ArticlePagination';
import { SidebarLinksList } from '~/components/common/SidebarLinksList';
import ProjectsChallengeMdxContent from '~/components/projects/common/ProjectsChallengeMdxContent';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import SlideOut from '~/components/ui/SlideOut';

type Props = Readonly<{
  projectGuides: Array<ProjectsChallengeGuide>;
}>;

export default function ProjectsChallengeGuideSection({
  projectGuides,
}: Props) {
  const intl = useIntl();
  const guideRef: React.RefObject<HTMLDivElement> = useRef(null);

  const [activeGuideSlug, setActiveGuideSlug] = useState(projectGuides[0].slug);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const projectGuide =
    projectGuides.find((guide) => guide.slug === activeGuideSlug) ||
    projectGuides[0];

  // TODO(projects):  Remove hardcoded resources links
  const sidebarNavigation = [
    {
      items: projectGuides,
      title: intl.formatMessage({
        defaultMessage: 'Official guides',
        description: 'Project official guide title',
        id: 'rgAZc7',
      }),
    },
    {
      items: [
        {
          href: 'https://greatfrontend.com',
          title: 'How to use Figma for development',
        },
        {
          href: 'https://greatfrontend.com',
          title: 'How to use DevTools for development',
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Curated resources',
        description: 'Project curated resources title',
        id: 'Reu6X0',
      }),
    },
  ];

  const onGuideChange = (value: string) => {
    setActiveGuideSlug(value);
    guideRef?.current?.scrollIntoView({
      behavior: 'auto',
    });
    setIsLeftSidebarOpen(false);
  };

  return (
    <div ref={guideRef} className="flex xl:gap-6 gap-4 xl:flex-row flex-col">
      <div
        className="sticky hidden xl:contents"
        style={{ top: 'var(--nav-top-offset)' }}>
        <SidebarLinksList
          activeItem={activeGuideSlug}
          navigation={sidebarNavigation}
          onSelect={onGuideChange}
        />
      </div>
      <div className="xl:hidden block">
        <Button
          addonPosition="start"
          icon={RiMenu2Line}
          label={intl.formatMessage({
            defaultMessage: 'Menu',
            description: 'Project guide navigation menu button label',
            id: 'AzJz7v',
          })}
          size="xs"
          variant="secondary"
          onClick={() => {
            setIsLeftSidebarOpen(true);
          }}
        />
        <SlideOut
          enterFrom="start"
          isShown={isLeftSidebarOpen}
          size="sm"
          title={intl.formatMessage({
            defaultMessage: 'Guidebook',
            description: 'Project guide menu header title',
            id: 'jSue8y',
          })}
          onClose={() => setIsLeftSidebarOpen(false)}>
          <SidebarLinksList
            activeItem={activeGuideSlug}
            navigation={sidebarNavigation}
            onSelect={onGuideChange}
          />
        </SlideOut>
      </div>

      <div className="flex flex-col md:gap-12 gap-6">
        <Heading level="heading4">{projectGuide.title}</Heading>
        {projectGuide != null && (
          <div className="pt-2">
            <ProjectsChallengeMdxContent mdxCode={projectGuide.body.code} />
          </div>
        )}
        <ArticlePagination
          activeItem={activeGuideSlug}
          items={projectGuides}
          onSelect={onGuideChange}
        />
      </div>
    </div>
  );
}
