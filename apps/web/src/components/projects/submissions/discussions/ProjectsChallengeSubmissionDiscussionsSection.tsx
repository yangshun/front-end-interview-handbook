import clsx from 'clsx';
import { RiAddLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import ProjectsDiscussionsCommentList from '~/components/projects/discussions/ProjectsDiscussionsCommentList';
import Button from '~/components/ui/Button';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderColor,
} from '~/components/ui/theme';

import ProjectsChallengeSubmissionDiscussionsNewComment from './ProjectsChallengeSubmissionDiscussionsNewComment';
import type { ProjectsChallengeSubmissionAugmented } from '../types';
import useUserProfileWithProjectsProfile from '../../common/useUserProfileWithProjectsProfile';
import { useProjectsOnboardingContext } from '../../onboarding/ProjectsOnboardingContext';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionDiscussionsSection({
  submission,
}: Props) {
  const { userProfile } = useUserProfileWithProjectsProfile();
  const { handleActionRequiringProjectsProfile } =
    useProjectsOnboardingContext();
  const viewer = userProfile?.projectsProfile
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
      )}>
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
            <Button
              addonPosition="start"
              icon={RiAddLine}
              label="Add a comment"
              size="lg"
              variant="secondary"
              onClick={() => handleActionRequiringProjectsProfile()}
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
