import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function FooterlessLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <InterviewsNavbar showBottomBorderOnScroll={false} />
      {children}
    </>
  );
}
