import clsx from 'clsx';
import { useId } from 'react';

import BlogMoreTagLabel from '~/components/blog/metadata/BlogMoreTagLabel';
import BlogTagLabel from '~/components/blog/metadata/BlogTagLabel';
import { FormattedMessage } from '~/components/intl';

type Props = Readonly<{
  showAll?: boolean;
  showMultiple?: boolean;
  showTagCount?: number;
  tags: ReadonlyArray<string>;
}>;

export default function BlogTags({
  tags,
  showMultiple = false,
  showAll = false,
  showTagCount = 3,
}: Props) {
  const id = useId();

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Tags"
          description="Screenreader text indicating component for blog tags"
          id="wAZkHT"
        />
      </span>
      <div
        aria-labelledby={id}
        className="inline-flex flex-wrap items-center gap-3">
        {showAll ? (
          tags.map((tag) => <BlogTagLabel key={tag} value={tag} />)
        ) : showMultiple ? (
          <>
            {tags.slice(0, showTagCount).map((tag, index) => (
              <div
                key={tag}
                className={clsx(
                  'inline-flex',
                  index > 0 && 'hidden lg:inline-flex',
                )}>
                <BlogTagLabel value={tag} />
              </div>
            ))}
            {tags.length > showTagCount && (
              <div className="hidden lg:inline-flex">
                <BlogMoreTagLabel
                  count={tags.length - showTagCount}
                  moreTags={tags.slice(showTagCount)}
                />
              </div>
            )}
          </>
        ) : (
          <BlogTagLabel key={tags[0]} value={tags[0]} />
        )}
      </div>
    </div>
  );
}
