import BlogNavbar from '~/components/blog/layout/BlogNavbar';

import type { BlogArticleNavigationType } from '../BlogTypes';

type Props = Readonly<{
  children: React.ReactNode;
  seriesContents?: BlogArticleNavigationType | null;
}>;

export default function BlogMainLayout({ children, seriesContents }: Props) {
  return (
    <div className="flex w-full flex-col">
      <BlogNavbar seriesContents={seriesContents} />
      <div className="py-8 xl:py-12">{children}</div>
    </div>
  );
}
