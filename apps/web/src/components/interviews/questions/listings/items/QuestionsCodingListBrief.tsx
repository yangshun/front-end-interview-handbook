import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeBorderEmphasizeColor,
  themeDivideEmphasizeColor,
} from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import type { QuestionListTypeData } from '../../common/questionHref';
import { questionHrefWithListType } from '../../common/questionHref';
import type { QuestionMetadata } from '../../common/QuestionsTypes';
import QuestionDifficultyLabel from '../../metadata/QuestionDifficultyLabel';

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion?: (question: Q) => boolean;
  listType?: QuestionListTypeData;
  questions: ReadonlyArray<Q>;
}>;

export default function QuestionsCodingListBrief<Q extends QuestionMetadata>({
  checkIfCompletedQuestion,
  listType,
  questions,
}: Props<Q>) {
  const intl = useIntl();

  if (questions.length === 0) {
    return (
      <div className={clsx('border p-10', themeBorderColor)}>
        <EmptyState
          subtitle={intl.formatMessage({
            defaultMessage: 'Try changing your search terms or filters',
            description:
              'Subtitle for empty state when no questions are returned from application of filters on quiz questions list',
            id: '62sNHV',
          })}
          title={intl.formatMessage({
            defaultMessage: 'No questions',
            description:
              'Title for empty state when application of filters return no results',
            id: 'AmBMf9',
          })}
          variant="empty"
        />
      </div>
    );
  }

  return (
    <ul
      className={clsx(
        'isolate rounded-md sm:grid',
        ['border', themeBorderEmphasizeColor],
        ['divide-y', themeDivideEmphasizeColor],
        'overflow-hidden',
      )}>
      {questions.map((questionMetadata) => {
        const hasCompletedQuestion =
          checkIfCompletedQuestion?.(questionMetadata);

        return (
          <li
            key={hashQuestion(questionMetadata)}
            className={clsx(
              'group relative flex gap-x-6 p-3',
              themeBackgroundCardWhiteOnLightColor,
              themeBackgroundEmphasized_Hover,
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
            )}>
            <div className="flex grow items-center justify-between">
              <div className="flex items-center gap-x-4">
                {checkIfCompletedQuestion != null && (
                  <span
                    className={clsx(
                      'flex items-center justify-center',
                      'shrink-0',
                      'size-6 rounded-full',
                      'border-2',
                      hasCompletedQuestion
                        ? 'border-success bg-success text-white'
                        : themeBorderColor,
                    )}>
                    {hasCompletedQuestion && (
                      <FaCheck aria-hidden="true" className="size-4 shrink-0" />
                    )}
                  </span>
                )}
                <Text
                  className="flex items-center gap-x-2"
                  size="body3"
                  weight="medium">
                  <Anchor
                    className="focus:outline-none"
                    href={questionHrefWithListType(
                      questionMetadata.href,
                      listType,
                    )}
                    variant="unstyled">
                    {/* Extend touch target to entire panel */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {questionMetadata.title}
                  </Anchor>
                </Text>
              </div>
              <div className="flex items-center space-x-6">
                <QuestionDifficultyLabel value={questionMetadata.difficulty} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
