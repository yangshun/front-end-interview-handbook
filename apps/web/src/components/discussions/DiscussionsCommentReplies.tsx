import clsx from 'clsx';

import { themeElementBorderColor } from '~/components/ui/theme';

import DiscussionsComment from './DiscussionsComment';
import type { DiscussionsCommentItem } from './types';

type Props = Readonly<{
  replies: ReadonlyArray<DiscussionsCommentItem>;
}>;

export default function DiscussionsCommentReplies({ replies }: Props) {
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
          <DiscussionsComment
            className={clsx(index < replies.length - 1 && 'pb-6')}
            comment={comment}
          />
        </div>
      ))}
    </>
  );
}
