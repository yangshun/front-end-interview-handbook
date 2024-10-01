'use client';

import clsx from 'clsx';
import type {
  ProjectsChallengeAPIWriteup,
  ProjectsChallengeAppendix,
  ProjectsChallengeStyleGuide,
} from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiBookOpenLine,
  RiCheckboxCircleFill,
  RiCodeSSlashLine,
  RiPaletteLine,
  RiPencilRuler2Line,
} from 'react-icons/ri';

import BlurOverlay from '~/components/common/BlurOverlay';
import { FormattedMessage, useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBorderColor,
  themeTextColor,
} from '~/components/ui/theme';

import ProjectsChallengeAssetsResponsiveBreakpointsTab from './ProjectsChallengeAssetsResponsiveBreakpointsTab';
import ProjectsChallengeDownloadStarterFilesButton from './ProjectsChallengeDownloadStarterFilesButton';
import useProjectsChallengeProvidedResourcesOptions from './useProjectsChallengeProvidedResourcesOptions';
import ProjectsChallengeContentPaywall from '../premium/ProjectsChallengeContentPaywall';
import ProjectsChallengeFigmaDesignPaywall from '../premium/ProjectsChallengeFigmaDesignPaywall';
import type { ProjectsPremiumAccessControlFields } from '../premium/ProjectsPremiumAccessControl';
import ProjectsStartButton from '../../common/ProjectsStartButton';
import type { ProjectsViewerProjectsProfile } from '../../types';

type OnlineAssetsTabType = 'api' | 'appendix' | 'designs' | 'style-guide';

function useOnlineAssetsTabs(
  hasStyleGuide: boolean,
  hasAPIWriteup: boolean,
  hasAppendix: boolean,
) {
  const intl = useIntl();

  const tabs: Array<TabItem<OnlineAssetsTabType>> = [
    {
      icon: RiPencilRuler2Line,
      label: intl.formatMessage({
        defaultMessage: 'Designs',
        description: 'Project assets category label',
        id: 'b28Bb0',
      }),
      value: 'designs',
    },
  ];

  if (hasStyleGuide) {
    tabs.push({
      icon: RiPaletteLine,
      label: intl.formatMessage({
        defaultMessage: 'Style guide',
        description: 'Project assets category label',
        id: 'H1aK4/',
      }),
      value: 'style-guide',
    });
  }

  if (hasAPIWriteup) {
    tabs.push({
      icon: RiCodeSSlashLine,
      label: intl.formatMessage({
        defaultMessage: 'API',
        description: 'Project assets category label',
        id: 'NkqgLg',
      }),
      value: 'api',
    });
  }

  if (hasAppendix) {
    tabs.push({
      icon: RiBookOpenLine,
      label: intl.formatMessage({
        defaultMessage: 'Appendix',
        description: 'Project assets category label',
        id: 'jV6cb9',
      }),
      value: 'appendix',
    });
  }

  return tabs;
}

type Props = Readonly<{
  apiWriteup?: ProjectsChallengeAPIWriteup;
  appendix?: ProjectsChallengeAppendix;
  challenge: ProjectsChallengeItem;
  styleGuide?: ProjectsChallengeStyleGuide;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeAssetsPage({
  apiWriteup,
  appendix,
  challenge,
  styleGuide,
  viewerAccess,
  viewerProjectsProfile,
}: Props) {
  const intl = useIntl();
  const { metadata } = challenge;

  const { accessAllSteps, fetchingCanAccessAllSteps } =
    useProjectsChallengeSessionContext();
  const resourceOptions = useProjectsChallengeProvidedResourcesOptions();
  const onlineAssetsTabs = useOnlineAssetsTabs(
    styleGuide != null,
    apiWriteup != null,
    appendix != null,
  );
  const [onlineAssetsTab, setOnlineAssetsTab] =
    useState<OnlineAssetsTabType>('designs');

  const showPaywall =
    viewerAccess.viewChallenge !== 'UNLOCKED' &&
    viewerAccess.viewChallenge !== 'ACCESSIBLE_TO_EVERYONE';
  const overlay = showPaywall ? (
    <ProjectsChallengeContentPaywall
      slug={metadata.slug}
      viewerContentAccess={viewerAccess.viewChallenge}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  ) : (
    <div
      className={clsx(
        'flex flex-col items-center gap-y-6',
        'mx-auto max-w-lg',
        'text-center',
      )}>
      {fetchingCanAccessAllSteps ? (
        <div className="py-10">
          <Spinner display="block" />
        </div>
      ) : (
        <>
          <Heading className="text-center drop-shadow" level="heading5">
            <FormattedMessage
              defaultMessage="You can download assets after starting the project"
              description="Title for project overlay on projects details page"
              id="all5El"
            />
          </Heading>
          <div
            className={clsx(
              'flex flex-col rounded-lg p-4',
              themeBackgroundEmphasized,
            )}>
            <Text className="text-left" size="body0" weight="bold">
              <FormattedMessage
                defaultMessage="Assets provided"
                description="Label for Assets Provided card on start project overlay on Projects project assets page"
                id="gRN6GJ"
              />
            </Text>
            <ul className="mt-4">
              {metadata.resources
                .map((resource) => resourceOptions[resource])
                .map(({ id, label }) => (
                  <li key={id} className="flex gap-2.5">
                    <RiCheckboxCircleFill
                      aria-hidden={true}
                      className={clsx('mt-1 h-3 w-3 shrink-0', themeTextColor)}
                    />
                    <Text size="body2">{label}</Text>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <ProjectsStartButton
              slug={challenge.metadata.slug}
              viewerContentAccess={viewerAccess.viewChallenge}
              viewerProjectsProfile={viewerProjectsProfile}
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <BlurOverlay
      align="center"
      overlay={overlay}
      showOverlay={showPaywall || !accessAllSteps}>
      <div className="flex flex-col items-stretch">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-4">
          <div
            className={clsx('flex flex-col gap-6 lg:pr-6', [
              'lg:border-r',
              themeBorderColor,
            ])}>
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="To download"
                description="Title for To Download section on Projects project assets page"
                id="Ju61WC"
              />
            </Heading>
            <Section>
              <div className="flex flex-col gap-4">
                {challenge.metadata.hasStarterAndDesignFiles ? (
                  <>
                    <ProjectsChallengeDownloadStarterFilesButton
                      size="lg"
                      slug={metadata.slug}
                    />
                    <ProjectsChallengeFigmaDesignPaywall
                      challengeMetadata={metadata}
                      placement="ASSETS_PAGE"
                      viewerFigmaAccess={viewerAccess.downloadFigma}
                      viewerProjectsProfile={viewerProjectsProfile}
                    />
                  </>
                ) : (
                  <Text color="secondary" size="body3">
                    <FormattedMessage
                      defaultMessage="No starter files and design files required because it is an integration of other challenges."
                      description="Information for challenges that do not have any provided files."
                      id="kpdNBu"
                    />
                  </Text>
                )}
              </div>
            </Section>
          </div>
          <div className="flex flex-1 flex-col gap-6 lg:col-span-3">
            <Heading className="lg:sr-only" level="heading6">
              <FormattedMessage
                defaultMessage="Online assets"
                description="Title for Online Assets section on Projects project assets page"
                id="2gImEH"
              />
            </Heading>
            <Section>
              <Tabs
                label={intl.formatMessage({
                  defaultMessage: 'Select online asset type',
                  description: 'Label for tabs to select online asset type',
                  id: 'ZsOMcv',
                })}
                size="sm"
                tabs={onlineAssetsTabs}
                value={onlineAssetsTab}
                onSelect={setOnlineAssetsTab}
              />
              {onlineAssetsTab === 'designs' && (
                <ProjectsChallengeAssetsResponsiveBreakpointsTab
                  challenge={challenge}
                />
              )}
              {onlineAssetsTab === 'style-guide' && styleGuide != null && (
                <div className="pt-2">
                  <MDXContent mdxCode={styleGuide.body.code} />
                </div>
              )}
              {onlineAssetsTab === 'api' && apiWriteup != null && (
                <div className="pt-2">
                  <MDXContent mdxCode={apiWriteup.body.code} />
                </div>
              )}
              {onlineAssetsTab === 'appendix' && appendix != null && (
                <div className="pt-2">
                  <MDXContent mdxCode={appendix.body.code} />
                </div>
              )}
            </Section>
          </div>
        </div>
      </div>
    </BlurOverlay>
  );
}
