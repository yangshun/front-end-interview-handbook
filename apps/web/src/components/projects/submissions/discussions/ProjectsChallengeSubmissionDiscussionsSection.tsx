import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import ProjectsDiscussionsCommentList from '~/components/projects/discussions/ProjectsDiscussionsCommentList';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderColor,
} from '~/components/ui/theme';

import useUserProfileWithProjectsProfile from '../../common/useUserProfileWithProjectsProfile';
import ProjectsDiscussionsCommentCompleteProfileButton from '../../discussions/ProjectsDiscussionsCommentCompleteProfileButton';
import type { ProjectsChallengeSubmissionAugmented } from '../types';
import ProjectsChallengeSubmissionDiscussionsNewComment from './ProjectsChallengeSubmissionDiscussionsNewComment';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionAugmented;
}>;

const scrollHash = 'projects-challenge-submission-comment';

export default function ProjectsChallengeSubmissionDiscussionsSection({
  submission,
}: Props) {
  const { userProfile } = useUserProfileWithProjectsProfile();
  const viewer = userProfile?.projectsProfile?.completed
    ? {
        points: userProfile.projectsProfile.points,
        userProfile,
      }
    : null;

  return (
    <div
      className={clsx(
        'flex flex-col gap-8 rounded-b-lg px-4 py-8 md:px-8',
        ['border-x border-b', themeBorderColor],
        themeBackgroundCardColor,
      )}
      id={scrollHash}>
      <Text size="body1" weight="bold">
        <FormattedMessage
          defaultMessage="Discussions"
          description="Challenge submission discussion section title"
          id="fklQmL"
        />
      </Text>
      <Section>
        {viewer ? (
          <ProjectsChallengeSubmissionDiscussionsNewComment
            submission={submission}
            viewer={viewer}
          />
        ) : (
          <div>
            <ProjectsDiscussionsCommentCompleteProfileButton
              scrollHash={scrollHash}
            />
          </div>
        )}
        <div className="w-full">
          <ProjectsDiscussionsCommentList
            domain="PROJECTS_SUBMISSION"
            entityId={submission.id}
            viewer={viewer}
          />
        </div>
      </Section>
    </div>
  );
}
