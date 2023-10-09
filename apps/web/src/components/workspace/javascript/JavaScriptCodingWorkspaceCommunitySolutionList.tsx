import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/Timestamp';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionLanguages from '~/components/questions/metadata/QuestionLanguages';
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

export default function JavaScriptCodingWorkspaceCommunitySolutionList({
  metadata,
}: Props) {
  return (
    <JavaScriptCodingWorkspaceCommunitySolutionListImpl metadata={metadata} />
  );
}

function JavaScriptCodingWorkspaceCommunitySolutionListImpl({
  metadata,
}: Props) {
  const {  openCommunitySolution } = useCodingWorkspaceContext();
  const { data: solutions } =
    trpc.questionCommunitySolution.javaScriptGetAll.useQuery({
      slug: metadata.slug,
    });

  return (
    <div className="w-full">
      {solutions == null || solutions?.length === 0 ? (
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState title="No community solutions" variant="empty" />
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
                {solutions?.map(({ id, createdAt, language, title }) => (
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
                          openCommunitySolution?.(id);
                        }}>
                        <Text
                          className="whitespace-nowrap"
                          size="body3"
                          weight="medium">
                          {title}
                        </Text>
                        <span className="absolute inset-0" />
                      </button>
                    </td>
                    <td className="w-px whitespace-nowrap px-3 py-2">
                      <QuestionLanguages
                        languages={[staticLowerCase(language)]}
                      />
                    </td>
                    <td className="w-px whitespace-nowrap px-3 py-2">
                      <Text color="secondary" size="body3">
                        <Timestamp date={createdAt} />
                      </Text>
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
