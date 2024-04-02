import BlogSidebarContainer from '~/components/blog/layout/BlogSidebarContainer';
import GlobalBanner from '~/components/global/banners/GlobalBanner';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function BlogLayout({ children }: Props) {
  return (
    <>
      <GlobalBanner />
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
