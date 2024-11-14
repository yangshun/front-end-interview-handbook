import {
  CompletedChip,
  NotCompleted,
} from '~/components/interviews/questions/listings/items/QuestionsListItemProgressChip';

type Props = Readonly<{
  className?: string;
  completed: boolean;
  size?: 'md' | 'sm';
}>;

// TODO(interviews): combine with QuestionsListItemProgressChip
export default function InterviewsGuideProgress({
  completed,
  size = 'md',
  className,
}: Props) {
  return (
    <div className={className}>
      {completed ? (
        <CompletedChip showHoverState={false} size={size} />
      ) : (
        <NotCompleted
          number={0}
          showAsNumber={false}
          showHoverState={false}
          size={size}
        />
      )}
    </div>
  );
}
