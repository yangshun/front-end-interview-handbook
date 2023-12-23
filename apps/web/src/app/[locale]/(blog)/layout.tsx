import BlogSidebarContainer from '~/components/blog/BlogSidebarContainer';
import GlobalBanner from '~/components/global/banners/GlobalBanner';
import FooterInterviews from '~/components/global/footers/FooterInterviews';
import Navbar from '~/components/global/navbar/NavbarImpl';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function BlogLayout({ children }: Props) {
  return (
    <>
      <GlobalBanner />
      <div className="flex flex-col">
        <Navbar />
        <div className="flex">
          <BlogSidebarContainer />
          <div className="relative w-0 grow pb-8">{children}</div>
        </div>
        <FooterInterviews />
      </div>
    </>
  );
}
