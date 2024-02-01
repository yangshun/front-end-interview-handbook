import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeSubmissionList from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionList';
import Dialog from '~/components/ui/Dialog';
import Spinner from '~/components/ui/Spinner';

type Props = Readonly<{
  challengeSlug: string;
  onClose: () => void;
}>;

export default function ProjectsChallengeSubmissionsDialog({
  challengeSlug,
  onClose,
}: Props) {
  const intl = useIntl();
  const { data: submissions, isLoading } =
    trpc.projects.submissions.completed.useQuery({
      challengeSlug,
    });

  return (
    <Dialog
      isShown={true}
      title={intl.formatMessage({
        defaultMessage: 'Previous submissions',
        description: 'Historical project submissions',
        id: '08L9Y1',
      })}
      width="screen-xl"
      onClose={onClose}>
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Spinner
            display="block"
            label={intl.formatMessage({
              defaultMessage: 'Loading submissions',
              description: 'Loading historical project submissions',
              id: '8tTY7b',
            })}
            size="lg"
          />
        </div>
      ) : (
        <ProjectsChallengeSubmissionList submissions={submissions!} />
      )}
    </Dialog>
  );
}
