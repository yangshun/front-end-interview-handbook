import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionLanguages from '~/components/questions/metadata/QuestionLanguages';
import Badge from '~/components/ui/Badge';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeDivideColor,
  themeLineColor,
} from '~/components/ui/theme';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

const dateFormatter = new Intl.DateTimeFormat('en-SG', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function JavaScriptCodingWorkspaceSubmissionList({
  metadata,
}: Props) {
  const { userProfile } = useUserProfile();

  if (userProfile == null) {
    return (
      <div className="w-full">
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState
              title="You must be signed in to view your submissions"
              variant="empty"
            />
          </div>
        </div>
      </div>
    );
  }

  return <JavaScriptCodingWorkspaceSubmissionListImpl metadata={metadata} />;
}

function JavaScriptCodingWorkspaceSubmissionListImpl({ metadata }: Props) {
  const { openSubmission } = useCodingWorkspaceContext();
  const { data: submissions } =
    trpc.questionSubmission.javaScriptGetAll.useQuery({
      slug: metadata.slug,
    });

  return (
    <div className="w-full">
      {submissions == null || submissions?.length === 0 ? (
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState title="No submissions" variant="empty" />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div
            className={clsx(
              'overflow-auto',
              'rounded-md',
              ['border', themeLineColor],
              ['divide-y', themeDivideColor],
            )}>
            <table className="w-full">
              <tbody className={clsx(['divide-y', themeDivideColor])}>
                {submissions?.map(({ id, createdAt, language, result }) => (
                  <tr
                    key={id}
                    className={clsx(
                      'relative',
                      themeBackgroundEmphasizedHover,
                    )}>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          openSubmission?.(id);
                        }}>
                        <Text
                          className="whitespace-nowrap"
                          size="body3"
                          weight="medium">
                          {dateFormatter.format(new Date(createdAt))}
                        </Text>
                        <span className="absolute inset-0" />
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <QuestionLanguages
                        languages={[staticLowerCase(language)]}
                      />
                    </td>
                    <td className="px-3 py-2 text-right">
                      {result === 'CORRECT' && (
                        <Badge label="Correct" size="sm" variant="success" />
                      )}
                      {result === 'WRONG' && (
                        <Badge label="Wrong" size="sm" variant="danger" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
