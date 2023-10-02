import clsx from 'clsx';

import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionLanguages from '~/components/questions/metadata/QuestionLanguages';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeDivideColor,
  themeLineColor,
} from '~/components/ui/theme';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

type Submission = Readonly<{
  code: string;
  createdAt: number;
  id: string;
  language: 'js' | 'ts';
  result: 'correct' | 'wrong';
}>;

const dateFormatter = new Intl.DateTimeFormat('en-SG', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function JavaScriptCodingWorkspaceSubmissionList({
  metadata,
}: Props) {
  const { openSubmission } = useCodingWorkspaceContext();
  const submissions: Array<Submission> = [
    {
      code: 'hello',
      createdAt: Date.now(),
      id: '1',
      language: 'js',
      result: 'correct',
    },
    {
      code: 'hello ts',
      createdAt: Date.now(),
      id: '2',
      language: 'ts',
      result: 'wrong',
    },
  ];

  return (
    <div className="w-full">
      {submissions.length === 0 ? (
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
                {submissions.map(({ id, createdAt, language, result }) => (
                  <tr key={id} className={clsx(themeBackgroundEmphasizedHover)}>
                    <td className="px-3 py-2">
                      <Text
                        className="whitespace-nowrap"
                        size="body3"
                        weight="medium">
                        {dateFormatter.format(new Date(createdAt))}
                      </Text>
                    </td>
                    <td className="px-3 py-2">
                      <QuestionLanguages languages={[language]} />
                    </td>
                    <td className="px-3 py-2">
                      {result === 'correct' && (
                        <Badge label="Correct" size="sm" variant="success" />
                      )}
                      {result === 'wrong' && (
                        <Badge label="Wrong" size="sm" variant="danger" />
                      )}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Button
                        label="View"
                        size="xs"
                        variant="secondary"
                        onClick={() => {
                          openSubmission?.(id);
                        }}
                      />
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
