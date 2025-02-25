import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import SponsorsNavbar from '~/components/sponsors/advertise-with-us/SponsorsNavbar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsMarketingLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex min-h-screen flex-col">
        <SponsorsNavbar />
        <div className="grow">{children}</div>
      </div>
    </>
  );
}
