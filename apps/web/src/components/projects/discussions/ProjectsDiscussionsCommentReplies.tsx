import clsx from 'clsx';

import ProjectsDiscussionsComment from './ProjectsDiscussionsComment';
import ProjectsDiscussionsCommentRepliesThreadLines from './ProjectsDiscussionsCommentRepliesThreadLines';
import type {
  ProjectsDiscussionsCommentItem,
  ProjectsDiscussionsCommentUserProfile,
} from './types';

type Props = Readonly<{
  level: number;
  replies: ReadonlyArray<ProjectsDiscussionsCommentItem>;
  viewer?: ProjectsDiscussionsCommentUserProfile | null;
}>;

export default function ProjectsDiscussionsCommentReplies({
  level,
  replies,
  viewer,
}: Props) {
  return (
    <>
      {replies.map((comment, index) => (
        <div key={comment.id} className="relative flex w-full">
          <ProjectsDiscussionsCommentRepliesThreadLines
            branchHeightClass="h-7"
            drawVerticalLine={index < replies.length - 1}
          />
          <ProjectsDiscussionsComment
            className={clsx(index < replies.length - 1 && 'pb-6')}
            comment={comment}
            level={level}
            viewer={viewer}
          />
        </div>
      ))}
    </>
  );
}
