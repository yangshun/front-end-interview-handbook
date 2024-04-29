import clsx from 'clsx';
import type {
  ProjectsChallengeGuide,
  ProjectsCommonGuide,
} from 'contentlayer/generated';
import { useRef, useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ArticlePagination from '~/components/common/ArticlePagination';
import { SidebarLinksList } from '~/components/common/SidebarLinksList';
import ProjectsChallengeMdxContent from '~/components/projects/common/ProjectsChallengeMdxContent';
import Alert from '~/components/ui/Alert';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import SlideOut from '~/components/ui/SlideOut';

import ProjectsChallengeGuidePaywall from '../premium/ProjectsChallengeGuidePaywall';
import type { ProjectsPremiumAccessControlType } from '../premium/ProjectsPremiumAccessControl';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Readonly<{
  challengeGuide: ProjectsChallengeGuide | null;
  commonGuides: ReadonlyArray<ProjectsCommonGuide>;
  relevantGuides: ReadonlyArray<string>;
  slug: string;
  viewerGuidesAccess: ProjectsPremiumAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

const CHALLENGE_GUIDE_SLUG = 'challenge-guide';

export default function ProjectsChallengeGuideSection({
  challengeGuide,
  commonGuides,
  slug,
  relevantGuides,
  viewerGuidesAccess,
  viewerProjectsProfile,
}: Props) {
  const intl = useIntl();
  const guideRef: React.RefObject<HTMLDivElement> = useRef(null);

  const [activeGuideSlug, setActiveGuideSlug] = useState(
    challengeGuide
      ? CHALLENGE_GUIDE_SLUG
      : relevantGuides.length > 0
        ? relevantGuides[0]
        : commonGuides[0].slug,
  );
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  const showPaywall =
    activeGuideSlug === CHALLENGE_GUIDE_SLUG &&
    viewerGuidesAccess !== 'UNLOCKED' &&
    viewerGuidesAccess !== 'ACCESSIBLE_TO_EVERYONE';

  const challengeGuideItems = challengeGuide
    ? [
        {
          slug: CHALLENGE_GUIDE_SLUG,
          title: intl.formatMessage({
            defaultMessage: 'Challenge guide',
            description: 'Project guides category title',
            id: 'VeRWF3',
          }),
          ...challengeGuide,
        },
      ]
    : null;

  const relevantGuideItems = relevantGuides
    .map((guideSlug) =>
      commonGuides.find(
        (commonGuideItem) => commonGuideItem.slug === guideSlug,
      ),
    )
    .flatMap((guide) => (guide != null ? [guide] : []));

  const commonGuidesWithoutRelevantGuides = commonGuides.filter(
    (commonGuideItem) => !relevantGuides.includes(commonGuideItem.slug),
  );
  const allGuides = [
    ...(challengeGuideItems ?? []),
    ...relevantGuideItems,
    ...commonGuidesWithoutRelevantGuides,
  ];
  const projectGuide =
    allGuides.find((guide) => guide.slug === activeGuideSlug) ||
    commonGuides[0];

  const sidebarNavigation = [
    challengeGuideItems != null && challengeGuideItems.length > 0
      ? {
          items: challengeGuideItems,
          title: intl.formatMessage({
            defaultMessage: 'Challenge walkthrough',
            description: 'Project guides category title',
            id: 'aICrh0',
          }),
        }
      : null,
    relevantGuideItems.length > 0
      ? {
          items: relevantGuideItems,
          title: intl.formatMessage({
            defaultMessage: 'Relevant techniques',
            description: 'Project guides category title',
            id: 'IK3TnA',
          }),
        }
      : null,
    {
      items: commonGuidesWithoutRelevantGuides,
      title: intl.formatMessage({
        defaultMessage: 'General guides',
        description: 'Project guides category title',
        id: 'q6xeLh',
      }),
    },
  ].flatMap((category) => (category != null ? [category] : []));

  const onGuideChange = (value: string) => {
    setActiveGuideSlug(value);
    guideRef?.current?.scrollIntoView({
      behavior: 'auto',
    });
    setIsLeftSidebarOpen(false);
  };

  return (
    <div ref={guideRef} className="flex flex-col gap-4 xl:flex-row xl:gap-12">
      <div
        className={clsx(
          'hidden xl:contents',
          'sticky top-[calc(var(--global-sticky-height)_+_200px)]',
        )}>
        <SidebarLinksList
          activeItem={activeGuideSlug}
          className={clsx(
            'sticky',
            // 100px for the sticky challenges steps bar.
            'h-[calc(100vh_-_100px_-_var(--global-sticky-height))]',
            'top-[calc(var(--global-sticky-height)_+_100px)]',
          )}
          navigation={sidebarNavigation}
          onSelect={onGuideChange}
        />
      </div>
      <div className="block xl:hidden">
        <SlideOut
          enterFrom="start"
          isShown={isLeftSidebarOpen}
          size="sm"
          title={intl.formatMessage({
            defaultMessage: 'Guidebook',
            description: 'Project guide menu header title',
            id: 'jSue8y',
          })}
          trigger={
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
          }
          onClose={() => setIsLeftSidebarOpen(false)}>
          <SidebarLinksList
            activeItem={activeGuideSlug}
            navigation={sidebarNavigation}
            onSelect={onGuideChange}
          />
        </SlideOut>
      </div>
      <div className={clsx('flex flex-col gap-6', 'grow xl:w-0', 'pt-4')}>
        {projectGuide != null &&
          'title' in projectGuide &&
          projectGuide?.title && (
            <Heading level="heading4">{projectGuide?.title}</Heading>
          )}
        {projectGuide?.body != null &&
          (showPaywall ? (
            <ProjectsChallengeGuidePaywall
              slug={slug}
              viewerGuideAccess={viewerGuidesAccess}
              viewerProjectsProfile={viewerProjectsProfile}
            />
          ) : (
            <>
              {activeGuideSlug === CHALLENGE_GUIDE_SLUG && (
                <Alert variant="info">
                  These guides help you get started on the trickier portions of
                  the challenge and are not meant to be exhaustive. However, do
                  let us know what other guidance you'd benefit from and we can
                  add it in.
                </Alert>
              )}
              <ProjectsChallengeMdxContent mdxCode={projectGuide.body.code} />
              <Divider />
              <ArticlePagination
                activeItem={activeGuideSlug}
                items={allGuides}
                onSelect={onGuideChange}
              />
            </>
          ))}
      </div>
    </div>
  );
}
