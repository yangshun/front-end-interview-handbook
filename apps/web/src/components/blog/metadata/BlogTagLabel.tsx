import clsx from 'clsx';

import { getBlogTags } from '~/data/blog/Tag';

import type { BlogTagType } from '~/components/blog/BlogTypes';
import Anchor from '~/components/ui/Anchor';

type LabelSize = 'md' | 'sm';

type Props = Readonly<{
  size?: LabelSize;
  value: BlogTagType;
}>;

const sizeClasses: Record<LabelSize, string> = {
  md: 'px-3 text-sm gap-1.5',
  sm: 'px-2 text-xs gap-1',
};

export default function BlogTagLabel({ value, size = 'sm' }: Props) {
  const blogTags = getBlogTags();
  const blogTag = blogTags[value];
  const { backgroundClass, borderClass, textClass } = blogTag.style;

  return (
    <Anchor href={blogTag.href} variant="unstyled">
      <span
        className={clsx(
          'relative inline-flex items-center whitespace-nowrap rounded-full py-px font-medium',
          sizeClasses[size],
          backgroundClass,
          borderClass,
        )}>
        <span className={textClass}>{blogTag.name}</span>
      </span>
    </Anchor>
  );
}
