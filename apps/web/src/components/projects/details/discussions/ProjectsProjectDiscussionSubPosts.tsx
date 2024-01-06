import clsx from 'clsx';

import { themeElementBorderColor } from '~/components/ui/theme';

import ProjectsProjectDiscussionPost from './ProjectsProjectDiscussionPost';
import { exampleDiscussionPosts } from './ProjectsProjectDiscussionSection';

function useSubPosts(postId: string) {
  // TODO(projects): Load subposts
  return exampleDiscussionPosts;
}

type Props = Readonly<{
  postId: string;
}>;

export default function ProjectsProjectDiscussionSubposts({ postId }: Props) {
  const subPosts = useSubPosts(postId);

  return (
    <>
      {subPosts.map((post, index) => (
        <div key={post.id} className="relative flex">
          <div className="relative flex w-14 flex-shrink-0 flex-col items-center">
            {index < subPosts.length - 1 && (
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
          <ProjectsProjectDiscussionPost
            className={clsx(index < subPosts.length - 1 && 'pb-6')}
            post={post}
          />
        </div>
      ))}
    </>
  );
}
