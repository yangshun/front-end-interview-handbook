import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import SponsorsFooter from '~/components/sponsors/advertise-with-us/SponsorsFooter';
import SponsorsNavbar from '~/components/sponsors/advertise-with-us/SponsorsNavbar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsMarketingLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex min-h-[calc(100vh_-_var(--banner-height))] flex-col">
        <SponsorsNavbar />
        <div className="grow">{children}</div>
        <SponsorsFooter />
      </div>
    </>
  );
}
