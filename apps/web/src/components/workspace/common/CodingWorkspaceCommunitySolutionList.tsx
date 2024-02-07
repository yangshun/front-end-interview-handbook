import clsx from 'clsx';

import Timestamp from '~/components/common/Timestamp';
import QuestionFrameworkIcon from '~/components/interviews/questions/metadata/QuestionFrameworkIcon';
import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import { useCodingWorkspaceContext } from './CodingWorkspaceContext';

import type {
  QuestionJavaScriptCommunitySolution,
  QuestionUserInterfaceCommunitySolution,
} from '@prisma/client';

type Props =
  | {
      questionType: 'javascript';
      solutions: Array<QuestionJavaScriptCommunitySolution> | undefined;
    }
  | {
      questionType: 'ui';
      solutions: Array<QuestionUserInterfaceCommunitySolution> | undefined;
    };

export default function CodingWorkspaceCommunitySolutionList({
  questionType,
  solutions,
}: Props) {
  const { openCommunitySolution } = useCodingWorkspaceContext();

  const isJavascript = (
    _:
      | QuestionJavaScriptCommunitySolution
      | QuestionUserInterfaceCommunitySolution,
  ): _ is QuestionJavaScriptCommunitySolution => {
    return questionType === 'javascript';
  };

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
              ['border', themeBorderColor],
              ['divide-y', themeDivideColor],
            )}>
            <table className="w-full">
              <tbody className={clsx(['divide-y', themeDivideColor])}>
                {solutions?.map((solution) => {
                  const { id, createdAt, title } = solution;

                  return (
                    <tr
                      key={id}
                      className={clsx(
                        // Safari has a problem with position: relative on <tr>
                        // Use a CSS transform hack to work around it.
                        // https://github.com/greatfrontend/greatfrontend/issues/92
                        'relative scale-100',
                        themeBackgroundEmphasized_Hover,
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
                        {isJavascript(solution) ? (
                          <QuestionLanguages
                            languages={[staticLowerCase(solution.language)]}
                          />
                        ) : (
                          <QuestionFrameworkIcon
                            framework={staticLowerCase(solution.framework)}
                          />
                        )}
                      </td>
                      <td className="w-px whitespace-nowrap px-3 py-2">
                        <Text color="secondary" size="body3">
                          <Timestamp date={createdAt} />
                        </Text>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
