'use client';

import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import { RiShareCircleLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import { SCROLL_HASH_PROJECTS_IMAGE_COMPARISON } from '~/hooks/useScrollToHash';

import { FormattedMessage, useIntl } from '~/components/intl';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsSkillList from '~/components/projects/skills/metadata/ProjectsSkillList';
import ProjectsSkillRoadmapChips from '~/components/projects/skills/metadata/ProjectsSkillRoadmapChips';
import ProjectsChallengeSubmissionHero from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHero';
import ProjectsChallengeSubmissionAuthorProfile from '~/components/projects/submissions/ProjectsChallengeSubmissionAuthorProfile';
import ProjectsChallengeSubmissionInterested from '~/components/projects/submissions/ProjectsChallengeSubmissionInterested';
import ProjectsChallengeSubmissionComparison from '~/components/projects/submissions/screenshots/ProjectsChallengeSubmissionComparison';
import type { ProjectsChallengeSubmissionAugmented } from '~/components/projects/submissions/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import RichText from '~/components/ui/RichTextEditor/RichText';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderColor,
} from '~/components/ui/theme';

import GithubRepositoryCodeViewer from './code-viewer/GithubRepositoryCodeViewer';
import ProjectsChallengeSubmissionDiscussionsSection from './discussions/ProjectsChallengeSubmissionDiscussionsSection';
import type { ProjectsViewerProjectsProfile } from '../types';

function parseGithubRepositoryUrl(url: string) {
  const urlObject = new URL(url);

  // Github repo url structure
  // /[repo-owner]/[repo-name]/tree/[branch-name]/[folder-name]*

  // remove leading and trailing slash and split by /
  const pathsArray = urlObject.pathname.replace(/^\/|\/$/g, '').split('/');

  return {
    repoName: pathsArray[1],
    repoOwner: pathsArray[0],
    repoSubdirectoryPath:
      pathsArray.slice(4).length > 0
        ? `${pathsArray.slice(4).join('/')}/`
        : null,
  };
}

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  submission: ProjectsChallengeSubmissionAugmented;
  viewerId: string | null;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeSubmissionPage({
  viewerId,
  challenge,
  submission,
  viewerProjectsProfile,
}: Props) {
  const intl = useIntl();
  const imageComparisonContainerRef: React.RefObject<HTMLDivElement> =
    useRef(null);

  const discussionSectionRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef(null);
  const isParentInView = useInView(parentRef);
  const isViewingOwnSubmission =
    viewerId === submission.projectsProfile?.userProfile?.id;
  const viewSubmissionMutation =
    trpc.projects.submission.incrementView.useMutation();

  const {
    id: submissionId,
    deploymentUrls,
    repositoryUrl,
    roadmapSkills,
    techStackSkills,
    screenshotStatus,
  } = submission;

  useEffect(() => {
    viewSubmissionMutation.mutate({
      submissionId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  const { repoName, repoOwner, repoSubdirectoryPath } = useMemo(
    () => parseGithubRepositoryUrl(repositoryUrl),
    [repositoryUrl],
  );

  return (
    <div ref={parentRef} className={clsx('flex flex-col', '-mt-4 lg:-mt-16')}>
      <ProjectsChallengeSubmissionHero
        challenge={challenge}
        isParentInView={isParentInView}
        isViewerPremium={viewerProjectsProfile?.premium ?? false}
        isViewingOwnSubmission={isViewingOwnSubmission}
        submission={submission}
        onScrollToDiscussionsButtonClick={() => {
          discussionSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <Section>
        <div
          className={clsx(
            'flex flex-col items-start justify-between gap-6 md:flex-row md:items-center',
            'mt-10 lg:mt-16',
          )}>
          {submission.projectsProfile?.userProfile && (
            <ProjectsChallengeSubmissionAuthorProfile
              points={submission.projectsProfile.points}
              premium={submission.projectsProfile.premium}
              userProfile={submission.projectsProfile.userProfile}
            />
          )}
          {(deploymentUrls.length > 0 || repositoryUrl) && (
            <div className="flex w-full gap-4 md:w-auto">
              {deploymentUrls.length > 0 && (
                <Button
                  className="flex-1 md:flex-none"
                  href={deploymentUrls[0].href}
                  icon={RiShareCircleLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Preview solution',
                    description: 'Label for preview solution button',
                    id: 'NL7HsI',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage: 'Go to the live site for this submission',
                    description: 'Tooltip for preview solution button',
                    id: 'EqpH9/',
                  })}
                  variant="primary"
                  warnAboutExternalLink={true}
                />
              )}
              {repositoryUrl && (
                <Button
                  className="flex-1 md:flex-none"
                  href={repositoryUrl}
                  icon={RiShareCircleLine}
                  label={intl.formatMessage({
                    defaultMessage: 'View code',
                    description: 'Label for view code button',
                    id: 'd8RJic',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage: `Go to this submission's GitHub repository`,
                    description: 'Tooltip for view code button',
                    id: 'nodFHk',
                  })}
                  variant="secondary"
                />
              )}
            </div>
          )}
        </div>
        {submission.summary && (
          <Text
            className="mt-10 block max-w-prose overflow-hidden lg:mt-8"
            color="secondary"
            size="body2">
            {submission.summary}
          </Text>
        )}
        <div
          ref={imageComparisonContainerRef}
          className="mt-10 scroll-mt-[calc(var(--global-sticky-height)_+_100px)] lg:mt-12"
          id={SCROLL_HASH_PROJECTS_IMAGE_COMPARISON}>
          <ProjectsChallengeSubmissionComparison
            allowRetakeScreenshot={isViewingOwnSubmission}
            deploymentUrls={deploymentUrls}
            screenshotStatus={screenshotStatus}
            specImagesForVariant={challenge.metadata.specImages.default}
            specLabels={challenge.info.specLabels}
            specShowGridLayoutButton={
              challenge.metadata.specShowGridLayoutButton
            }
            submissionId={submissionId}
          />
        </div>
        <div
          className={clsx(
            'flex flex-col gap-8 gap-x-10 md:flex-row',
            'mt-10 lg:mt-16',
          )}>
          <div className="flex flex-1 flex-col gap-3">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Implementation details"
                description="Section title for implementation detail"
                id="XejHfx"
              />
            </Heading>
            <RichText size="sm" value={submission.implementation} />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Tech stack"
                description="Section title for tech stack"
                id="1/mHuG"
              />
            </Heading>
            <div className="flex flex-wrap items-center gap-2">
              {roadmapSkills.length > 0 && (
                <ProjectsSkillRoadmapChips
                  readonly={true}
                  skills={roadmapSkills}
                />
              )}
              {techStackSkills.length > 0 && (
                <ProjectsSkillList skills={techStackSkills} />
              )}
            </div>
          </div>
        </div>
        <div className={clsx('flex flex-col', 'mt-10 lg:mt-16')}>
          <div className="flex flex-1 flex-col gap-3">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Code"
                description="Section title for code viewer"
                id="T6xgeP"
              />
            </Heading>
            <GithubRepositoryCodeViewer
              className={clsx('h-[500px] rounded-t-lg', [
                'border-x border-t',
                themeBorderColor,
                themeBackgroundCardColor,
              ])}
              repoName={repoName}
              repoOwner={repoOwner}
              repoSubdirectoryPath={repoSubdirectoryPath}
            />
          </div>
          <div
            ref={discussionSectionRef}
            className={clsx('border-t', themeBorderColor)}>
            <ProjectsChallengeSubmissionDiscussionsSection
              submission={submission}
            />
          </div>
        </div>
        <div className="mt-10">
          <ProjectsChallengeSubmissionInterested
            challengeSlug={submission.slug}
          />
        </div>
      </Section>
    </div>
  );
}
