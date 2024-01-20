import clsx from 'clsx';

import { themeElementBorderColor } from '~/components/ui/theme';

import ProjectsChallengeDiscussionComment from './ProjectsChallengeDiscussionComment';
import { exampleDiscussionComments } from './ProjectsChallengeDiscussionSection';

function useCommentReplies(commentId: string) {
  // TODO(projects): Load replies
  return exampleDiscussionComments;
}

type Props = Readonly<{
  commentId: string;
}>;

export default function ProjectsChallengeDiscussionCommentReplies({
  commentId,
}: Props) {
  const replies = useCommentReplies(commentId);

  return (
    <>
      {replies.map((comment, index) => (
        <div key={comment.id} className="relative flex">
          <div className="relative flex w-14 flex-shrink-0 flex-col items-center">
            {index < replies.length - 1 && (
              <div
                className={clsx(
                  'absolute h-full w-px border-l',
                  themeElementBorderColor,
                )}
              />
            )}
            <div
              className={clsx(
                'absolute end-0 top-0 h-7 w-[calc(50%_+_0.5px)] rounded-es-2xl border-b border-s',
                themeElementBorderColor,
              )}
            />
          </div>
          <ProjectsChallengeDiscussionComment
            className={clsx(index < replies.length - 1 && 'pb-6')}
            comment={comment}
          />
        </div>
      ))}
    </>
  );
}
