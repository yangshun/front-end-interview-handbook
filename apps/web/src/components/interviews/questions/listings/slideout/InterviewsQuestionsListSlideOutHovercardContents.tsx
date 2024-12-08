import clsx from 'clsx';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/questionHref';
import { questionHrefFrameworkSpecificAndListType } from '~/components/interviews/questions/common/questionHref';
import QuestionAuthor from '~/components/interviews/questions/metadata/QuestionAuthor';
import QuestionDifficultyLabel from '~/components/interviews/questions/metadata/QuestionDifficultyLabel';
import QuestionDurationLabel from '~/components/interviews/questions/metadata/QuestionDurationLabel';
import Anchor from '~/components/ui/Anchor';
import type { TextSize } from '~/components/ui/Text';
import Text, { textVariants } from '~/components/ui/Text';

import type {
  QuestionFramework,
  QuestionMetadata,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  framework?: QuestionFramework;
  listType?: QuestionListTypeData | null;
  question: QuestionMetadata;
  size?: TextSize;
}>;

export default function InterviewsQuestionsListSlideOutHovercardContents({
  framework,
  listType,
  question,
  size = 'body3',
}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        'overflow-clip rounded-lg',
        'h-full w-[350px] sm:w-[380px]',
      )}>
      <div className="flex grow flex-col gap-2">
        <Anchor
          className={textVariants({
            className: 'z-[1]',
            size: 'body1',
            weight: 'bold',
          })}
          href={questionHrefFrameworkSpecificAndListType(
            question,
            listType,
            framework,
          )}
          variant="flat">
          {question.title}
        </Anchor>
        <Text className="text-pretty grow" color="secondary" size="body2">
          {question.excerpt}
        </Text>
      </div>
      {question.author && (
        <QuestionAuthor author={question.author} size="body3" />
      )}
      <div className="flex-start flex gap-3">
        {question.difficulty && (
          <QuestionDifficultyLabel
            showIcon={true}
            size={size}
            value={question.difficulty}
          />
        )}
        {question.duration && (
          <QuestionDurationLabel
            mins={question.duration}
            showIcon={true}
            size={size}
          />
        )}
      </div>
    </div>
  );
}
