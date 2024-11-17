import BlogSidebarContainer from '~/components/blog/layout/BlogSidebarContainer';
import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function BlogLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex flex-col">
        <InterviewsNavbar />
        <div className="flex">
          <BlogSidebarContainer />
          <div className="relative w-0 grow pb-8">{children}</div>
        </div>
        <InterviewsFooter />
      </div>
    </>
  );
}
