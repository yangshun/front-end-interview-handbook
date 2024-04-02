import GlobalBanner from '~/components/global/banners/GlobalBanner';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function FooterlessLayout({ children }: Props) {
  return (
    <>
      <GlobalBanner />
      <InterviewsNavbar />
      {children}
    </>
  );
}
