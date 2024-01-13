import clsx from 'clsx';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeSubmissionFilters from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilters';
import { useProjectsChallengeSubmissionFilterContext } from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionFilterContext';
import ProjectsChallengeSubmissionList from '~/components/projects/submissions/ProjectsChallengeSubmissionList';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

export default function ProjectsChallengeSubmissionListWithFilters() {
  const { data: submissions, isLoading } =
    trpc.projects.submissions.list.useQuery();
  const { filters } = useProjectsChallengeSubmissionFilterContext();

  return (
    <div className="flex flex-col gap-6">
      <ProjectsChallengeSubmissionFilters
        filters={filters}
        query=""
        setQuery={() => {}}
      />
      <div className="flex flex-col gap-y-4">
        <div
          className={clsx('flex items-center gap-2', themeTextSecondaryColor)}>
          <RiCodeSSlashLine className="h-4 w-4" />
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="{submissionsCount} submissions"
              description="Label for total number of submissions in all submissions page"
              id="JSTYYJ"
              values={{
                submissionsCount: isLoading ? '-' : submissions?.length,
              }}
            />
          </Text>
        </div>
        {isLoading ? (
          <Spinner display="block" size="lg" />
        ) : (
          <ProjectsChallengeSubmissionList submissions={submissions ?? []} />
        )}
      </div>
    </div>
  );
}
