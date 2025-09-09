'use client';

import type {
  QuestionJavaScriptCommunitySolution,
  QuestionUserInterfaceCommunitySolution,
} from '@prisma/client';
import clsx from 'clsx';

import Timestamp from '~/components/common/datetime/Timestamp';
import QuestionFrameworkIcon from '~/components/interviews/questions/metadata/QuestionFrameworkIcon';
import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderEmphasizeColor,
  themeDivideEmphasizeColor,
} from '~/components/ui/theme';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

type Props = Readonly<{
  openCommunitySolution: (solutionId: string) => void;
}> &
  (
    | {
        questionType: 'javascript';
        solutions: Array<QuestionJavaScriptCommunitySolution> | undefined;
      }
    | {
        questionType: 'ui';
        solutions: Array<QuestionUserInterfaceCommunitySolution> | undefined;
      }
  );

export default function CodingWorkspaceCommunitySolutionList({
  openCommunitySolution,
  questionType,
  solutions,
}: Props) {
  const intl = useIntl();

  const isJavaScript = (
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
            <EmptyState
              title={intl.formatMessage({
                defaultMessage: 'No community solutions',
                description: 'No community solutions in coding workspace',
                id: 'Aphr+S',
              })}
              variant="empty"
            />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div
            className={clsx(
              'flex flex-col rounded-md',
              ['border', themeBorderEmphasizeColor],
              ['divide-y', themeDivideEmphasizeColor],
              'overflow-hidden',
            )}>
            {solutions?.map((solution) => {
              const { createdAt, id, title } = solution;

              return (
                <div
                  key={id}
                  className={clsx(
                    'relative isolate',
                    'flex items-center justify-between gap-x-2',
                    themeBackgroundElementEmphasizedStateColor_Hover,
                    'p-3',
                  )}>
                  <div className="flex gap-x-2">
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
                    {isJavaScript(solution) ? (
                      <QuestionLanguages
                        languages={[staticLowerCase(solution.language)]}
                      />
                    ) : (
                      <QuestionFrameworkIcon
                        framework={staticLowerCase(solution.framework)}
                      />
                    )}
                  </div>
                  <div>
                    <Text color="secondary" size="body3">
                      <Timestamp date={createdAt} />
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
