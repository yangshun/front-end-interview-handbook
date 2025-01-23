import { RiThumbUpFill } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';
import FilterButton from '~/components/ui/FilterButton/FilterButton';

import { useI18nRouter } from '~/next-i18nostic/src';

import { useProjectsOnboardingContext } from '../../onboarding/ProjectsOnboardingContext';

type Props = Readonly<{
  submissionId: string;
  votes: number;
}>;

export default function ProjectsChallengeSubmissionHeroVoteButton({
  votes,
  submissionId,
}: Props) {
  const { showToast } = useToast();
  const intl = useIntl();
  const router = useI18nRouter();
  const trpcUtils = trpc.useUtils();
  const { handleActionRequiringProjectsProfile } =
    useProjectsOnboardingContext();

  const { data: viewerVote, isLoading } =
    trpc.projects.submission.hasVoted.useQuery({
      submissionId,
    });

  const vote = trpc.projects.submission.vote.useMutation({
    onSuccess: () => {
      // Refresh number of votes by refetching from the server.
      router.refresh();
      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Upvoted successfully!',
          description: 'Successful upvote toaster',
          id: 'mGYl8O',
        }),
        variant: 'success',
      });

      trpcUtils.projects.submission.hasVoted.invalidate();
    },
  });
  const unvote = trpc.projects.submission.unvote.useMutation({
    onSuccess: () => {
      // Refresh number of votes by refetching from the server.
      router.refresh();

      trpcUtils.projects.submission.hasVoted.invalidate();
    },
  });

  const viewerUpvoted = viewerVote != null;

  return (
    <FilterButton
      className="flex-1 md:flex-none"
      icon={RiThumbUpFill}
      isDisabled={isLoading || vote.isLoading || unvote.isLoading}
      label={String(votes)}
      selected={viewerUpvoted}
      tooltip={
        viewerUpvoted
          ? intl.formatMessage({
              defaultMessage: 'You upvoted this',
              description: 'Tooltip for upvoted submission button',
              id: 'soQjY2',
            })
          : intl.formatMessage({
              defaultMessage: 'Upvote this submission',
              description: 'Tooltip for Upvote submission button',
              id: '3cNSBC',
            })
      }
      onClick={() => {
        handleActionRequiringProjectsProfile(() => {
          viewerUpvoted
            ? unvote.mutate({ submissionId })
            : vote.mutate({ submissionId });
        });
      }}
    />
  );
}
