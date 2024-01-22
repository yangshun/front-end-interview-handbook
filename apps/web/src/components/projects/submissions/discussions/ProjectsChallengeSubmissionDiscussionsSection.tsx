import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import DiscussionsCommentList from '~/components/discussions/DiscussionsCommentList';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeBackgroundEmphasized,
  themeBorderColor,
} from '~/components/ui/theme';

import ProjectsChallengeSubmissionDiscussionsNewComment from './ProjectsChallengeSubmissionDiscussionsNewComment';
import type { ProjectsChallengeSubmissionWithVotesAuthorChallenge } from '../types';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionWithVotesAuthorChallenge;
}>;

export default function ProjectsChallengeSubmissionDiscussionsSection({
  submission,
}: Props) {
  const { profile } = useProfile();

  return (
    <div
      className={clsx(
        'flex flex-col gap-8 p-8 rounded-lg',
        themeBackgroundEmphasized,
        ['border', themeBorderColor],
      )}>
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Discussions"
          description="Challenge submission discussion section title"
          id="fklQmL"
        />
      </Heading>
      <Section>
        {profile && (
          <ProjectsChallengeSubmissionDiscussionsNewComment
            submission={submission}
            viewer={profile}
          />
        )}
        <div className="w-full">
          <DiscussionsCommentList
            domain="PROJECTS_SUBMISSION"
            entityId={submission.id}
            viewer={profile}
          />
        </div>
      </Section>
    </div>
  );
}
