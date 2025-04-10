import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function StandardLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex flex-col">
        <InterviewsNavbar bgClassName="bg-transparent" bottomBorder={false} />
        <div className="flex grow items-center">{children}</div>
      </div>
    </>
  );
}
