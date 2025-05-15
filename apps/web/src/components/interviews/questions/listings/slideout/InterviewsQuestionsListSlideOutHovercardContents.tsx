import clsx from 'clsx';

import { questionHrefFrameworkSpecificAndListType } from '~/components/interviews/questions/common/QuestionHrefUtils';
import QuestionAuthor from '~/components/interviews/questions/metadata/QuestionAuthor';
import QuestionDifficultyLabel from '~/components/interviews/questions/metadata/QuestionDifficultyLabel';
import QuestionDurationLabel from '~/components/interviews/questions/metadata/QuestionDurationLabel';
import Anchor from '~/components/ui/Anchor';
import type { TextSize } from '~/components/ui/Text';
import Text, { textVariants } from '~/components/ui/Text';

import type {
  InterviewsQuestionItemMinimal,
  QuestionFramework,
  QuestionListTypeData,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  framework?: QuestionFramework;
  listType?: QuestionListTypeData | null;
  question: InterviewsQuestionItemMinimal;
  size?: TextSize;
}>;

export default function InterviewsQuestionsListSlideOutHovercardContents({
  framework,
  listType,
  question,
  size = 'body3',
}: Props) {
  const { info, metadata } = question;

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
            metadata,
            listType,
            framework,
          )}
          variant="flat">
          {info.title}
        </Anchor>
        <Text className="grow text-pretty" color="secondary" size="body2">
          {info.excerpt}
        </Text>
      </div>
      {metadata.author && (
        <QuestionAuthor author={metadata.author} size="body3" />
      )}
      <div className="flex-start flex gap-3">
        {metadata.difficulty && (
          <QuestionDifficultyLabel
            showIcon={true}
            size={size}
            value={metadata.difficulty}
          />
        )}
        {metadata.duration && (
          <QuestionDurationLabel
            mins={metadata.duration}
            showIcon={true}
            size={size}
          />
        )}
      </div>
    </div>
  );
}
