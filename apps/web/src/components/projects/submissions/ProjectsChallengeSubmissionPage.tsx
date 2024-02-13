'use client';

import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import { RiShareCircleLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsSkillList from '~/components/projects/skills/metadata/ProjectsSkillList';
import ProjectsSkillRoadmapChips from '~/components/projects/skills/metadata/ProjectsSkillRoadmapChips';
import ProjectsChallengeSubmissionHero from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHero';
import ProjectsChallengeSubmissionAuthorProfile from '~/components/projects/submissions/ProjectsChallengeSubmissionAuthorProfile';
import ProjectsChallengeSubmissionComparison from '~/components/projects/submissions/ProjectsChallengeSubmissionComparison';
import ProjectsChallengeSubmissionInterested from '~/components/projects/submissions/ProjectsChallengeSubmissionInterested';
import type { ProjectsChallengeSubmissionAugmented } from '~/components/projects/submissions/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import RichText from '~/components/ui/RichTextEditor/RichText';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import GithubRepositoryCodeViewer from './code-viewer/GithubRepositoryCodeViewer';
import ProjectsChallengeSubmissionDiscussionsSection from './discussions/ProjectsChallengeSubmissionDiscussionsSection';

function parseGithubRepositoryUrl(url: string) {
  const urlObject = new URL(url);
  const [repoOwner, repoName] = urlObject.pathname.split('/').slice(-2);

  return { branchName: 'main', repoName, repoOwner };
}

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  currentUserId: string | undefined;
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionPage({
  challenge,
  submission,
  currentUserId,
}: Props) {
  const intl = useIntl();
  const discussionSectionRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef(null);
  const isParentInView = useInView(parentRef);
  const isViewingOwnSubmission =
    currentUserId === submission.projectsProfile?.userProfile?.id;
  const viewSubmissionMutation =
    trpc.projects.submission.incrementView.useMutation();
  const submissionId = submission.id;
  const { deploymentUrls, repositoryUrl, roadmapSkills, techStackSkills } =
    submission;

  useEffect(() => {
    viewSubmissionMutation.mutate({
      submissionId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  const { branchName, repoName, repoOwner } = useMemo(
    () => parseGithubRepositoryUrl(repositoryUrl),
    [repositoryUrl],
  );

  return (
    <div ref={parentRef} className="flex flex-col -mt-4 lg:-mt-16">
      <ProjectsChallengeSubmissionHero
        challenge={challenge}
        isParentInView={isParentInView}
        isViewingOwnSubmission={isViewingOwnSubmission}
        submission={submission}
        onScrollToDiscussionsButtonClick={() => {
          discussionSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <Section>
        <div className="flex md:items-center items-start justify-between md:flex-row flex-col gap-6 mt-10 lg:mt-16">
          {submission.projectsProfile?.userProfile && (
            <ProjectsChallengeSubmissionAuthorProfile
              author={submission.projectsProfile?.userProfile}
            />
          )}
          {(deploymentUrls.length > 0 || repositoryUrl) && (
            <div className="flex gap-4">
              {deploymentUrls.length > 0 && (
                <Button
                  href={deploymentUrls[0].href}
                  icon={RiShareCircleLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Preview solution',
                    description: 'Label for preview solution button',
                    id: 'NL7HsI',
                  })}
                  variant="primary"
                />
              )}
              {repositoryUrl && (
                <Button
                  href={repositoryUrl}
                  icon={RiShareCircleLine}
                  label={intl.formatMessage({
                    defaultMessage: 'View code',
                    description: 'Label for view code button',
                    id: 'd8RJic',
                  })}
                  variant="secondary"
                />
              )}
            </div>
          )}
        </div>
        {submission.summary && (
          <Text className="max-w-prose my-8" display="block" size="body2">
            {submission.summary}
          </Text>
        )}
        <div className="mt-10 lg:mt-12">
          <ProjectsChallengeSubmissionComparison
            deploymentUrls={deploymentUrls}
            submissionId={submissionId}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-x-10 gap-8 mt-10 lg:mt-16">
          <div className="flex flex-col gap-3 flex-1">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Implementation details"
                description="Section title for implementation detail"
                id="XejHfx"
              />
            </Heading>
            <RichText textSize="sm" value={submission.implementation} />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Tech stack"
                description="Section title for tech stack"
                id="1/mHuG"
              />
            </Heading>
            {roadmapSkills.length > 0 && (
              <ProjectsSkillRoadmapChips
                readonly={true}
                skills={roadmapSkills}
              />
            )}
            {techStackSkills.length > 0 && (
              <ProjectsSkillList
                isLabelHidden={true}
                label={intl.formatMessage({
                  defaultMessage: 'Tech stack used',
                  description: 'Label for tech stack skills section',
                  id: 'xMmBc1',
                })}
                skills={techStackSkills}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col mt-10 lg:mt-16">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col gap-3 flex-1">
              <Heading level="heading6">
                <FormattedMessage
                  defaultMessage="Code"
                  description="Section title for code viewer"
                  id="T6xgeP"
                />
              </Heading>
              <GithubRepositoryCodeViewer
                branchName={branchName}
                className={clsx('rounded-t-lg h-[500px]', [
                  'border-t border-x',
                  themeBorderColor,
                ])}
                repoName={repoName}
                repoOwner={repoOwner}
              />
            </div>
          </div>
          <div ref={discussionSectionRef}>
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
