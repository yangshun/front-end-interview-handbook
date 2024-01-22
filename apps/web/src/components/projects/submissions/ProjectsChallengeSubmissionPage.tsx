'use client';

import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { RiShareCircleLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsSkillChip from '~/components/projects/skills/ProjectsSkillChip';
import type { ProjectsSkill } from '~/components/projects/skills/types';
import ProjectsChallengeSubmissionHero from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHero';
import ProjectsChallengeSubmissionAuthorProfile from '~/components/projects/submissions/ProjectsChallengeSubmissionAuthorProfile';
import ProjectsChallengeSubmissionComparison from '~/components/projects/submissions/ProjectsChallengeSubmissionComparison';
import ProjectsChallengeSubmissionInterested from '~/components/projects/submissions/ProjectsChallengeSubmissionInterested';
import type { ProjectsChallengeSubmissionWithVotesAuthorChallenge } from '~/components/projects/submissions/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import ProjectsChallengeSubmissionDiscussionsSection from './discussions/ProjectsChallengeSubmissionDiscussionsSection';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  currentUserId: string | undefined;
  submission: ProjectsChallengeSubmissionWithVotesAuthorChallenge;
}>;

export default function ProjectsChallengeSubmissionPage({
  challenge,
  submission,
  currentUserId,
}: Props) {
  const intl = useIntl();
  const parentRef = useRef(null);
  const isParentInView = useInView(parentRef);
  const isViewingOwnProfile =
    currentUserId === submission.projectsProfile?.userProfile?.id;
  const viewSubmissionMutation = trpc.projects.submissions.view.useMutation();
  const submissionId = submission.id;
  const { deploymentUrls, repositoryUrl } = submission;

  const skills = [
    {
      difficulty: 'unknown',
      key: 'js',
      label: 'JS',
      subskills: [
        { difficulty: 'unknown', key: 'dom', label: 'DOM Manipulation' },
        { difficulty: 'unknown', key: 'flex', label: 'Flex' },
      ],
    },
    {
      difficulty: 'unknown',
      key: 'css',
      label: 'CSS',
      subskills: [
        { difficulty: 'unknown', key: 'architecture', label: 'Architecture' },
      ],
    },
    {
      difficulty: 'unknown',
      key: 'airtable',
      label: 'Airtable',
    },
    {
      difficulty: 'unknown',
      key: 'angular',
      label: 'Angular',
    },
    {
      difficulty: 'unknown',
      key: 'cube-css',
      label: 'Cube-css',
    },
  ] as ReadonlyArray<ProjectsSkill & { subskills?: Array<ProjectsSkill> }>;

  useEffect(() => {
    viewSubmissionMutation.mutate({
      submissionId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  const authorSection = (
    <Section>
      <div className="flex md:items-center items-start justify-between md:flex-row flex-col gap-6">
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
    </Section>
  );

  return (
    <div ref={parentRef} className="flex flex-col gap-8 -mt-4 lg:-mt-16">
      <ProjectsChallengeSubmissionHero
        challenge={challenge}
        isParentInView={isParentInView}
        showPin={isViewingOwnProfile}
        submission={submission}
      />
      {!isViewingOwnProfile && authorSection}
      {submission.summary && (
        <Section>
          <div className="md:w-8/12 w-full">
            <Text size="body2">{submission.summary}</Text>
          </div>
        </Section>
      )}
      <ProjectsChallengeSubmissionComparison deploymentUrls={deploymentUrls} />
      <Section>
        <div className="flex md:gap-10 gap-8 md:flex-row flex-col">
          <div className="flex flex-col gap-3 flex-1">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Implementation details"
                description="Section title for implementation detail"
                id="XejHfx"
              />
            </Heading>
            <Prose
              // TODO(projects): sanitize HTML first.
              dangerouslySetInnerHTML={{ __html: submission.implementation }}
              textSize="sm"
            />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Tech stack"
                description="Section title for tech stack"
                id="1/mHuG"
              />
            </Heading>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <ProjectsSkillChip
                  key={skill.key}
                  skill={skill}
                  // TODO(projects): Replace below with actual subSkills
                  subSkills={skill.subskills}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
      {isViewingOwnProfile && authorSection}
      <div className="mt-10">
        <ProjectsChallengeSubmissionDiscussionsSection
          submission={submission}
        />
      </div>
      <div className="mt-10">
        <ProjectsChallengeSubmissionInterested
          challengeSlug={submission.slug}
        />
      </div>
    </div>
  );
}
